using ProductManagementAPI.Middleware;
using ProductManagementAPI.Repositories;
using ProductManagementAPI.RepositoriesImpl;
using ProductManagementAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ProductManagementAPI.Helpers;
using Microsoft.Data.Sqlite;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

// Add controllers to the service container.
builder.Services.AddControllers();

// Adds services for API documentation (Swagger) generation.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registers SQLite database connection with the connection string from configuration.
builder.Services.AddScoped<IDbConnection>(provider =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    return new SqliteConnection(connectionString);
});

// Retrieves the JWT secret key from configuration and checks for its presence.
var jwtSecret = builder.Configuration["JwtSettings:SecretKey"];
if (string.IsNullOrEmpty(jwtSecret))
{
    throw new Exception("JWT secret key is missing in the configuration.");
}

builder.Services.AddScoped<JwtHelper>(provider => new JwtHelper(jwtSecret));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<UserService>(provider => new UserService(provider.GetRequiredService<IUserRepository>(), jwtSecret));

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ProductService>();

// Configures JWT authentication options and token validation parameters.
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; // Allows HTTP for metadata in development
    options.SaveToken = true; // Saves the token in the request.
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = "ProductManagementAPI",
        ValidAudience = "ProductManagementClient",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)) // Specifies the key to validate the token's signature.
    };
});

// Add CORS services to the container
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Allow this origin
            .AllowAnyHeader() // Allow all headers
            .AllowAnyMethod() // Allow all methods (GET, POST, PUT, DELETE, OPTIONS, etc.)
            .AllowCredentials(); // Allow credentials (cookies, authorization headers, etc.)
    });
});

var app = builder.Build();

// Enable CORS first (important for handling cross-origin requests).
app.UseCors("AllowSpecificOrigin");
// Handle preflight OPTIONS requests
app.Use(async (context, next) =>
{
    // Handle OPTIONS method explicitly (preflight requests)
    if (context.Request.Method == "OPTIONS")
    {
        context.Response.StatusCode = 204; // No content for OPTIONS
        await context.Response.CompleteAsync();
    }
    else
    {
        await next();
    }
});

// Authentication comes next to identify the user.
app.UseAuthentication();

// Authorization should come after authentication.
app.UseAuthorization();

// Custom middleware to handle exceptions globally.
app.UseMiddleware<ExceptionMiddleware>();

// Use HTTPS redirection after exception handling.
//app.UseHttpsRedirection();

// Enable Swagger UI and API documentation only in development environment.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Map controllers to handle requests.
app.MapControllers();

// Start the application.
app.Run();
