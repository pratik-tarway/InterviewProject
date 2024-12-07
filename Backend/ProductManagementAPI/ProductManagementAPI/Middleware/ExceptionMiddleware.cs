using Newtonsoft.Json;
using ProductManagementAPI.Exceptions;

namespace ProductManagementAPI.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext); // Pass control to the next middleware
            }
            catch (ProductException ex)
            {
                var statusCode = ex switch
                {
                    ProductNotFoundException => 404,
                    ProductValidationException => 400,
                    _ => 400  // Default for other product exceptions
                };
                await HandleExceptionAsync(httpContext, ex, statusCode);
            }
            catch (UserException ex)
            {
                var statusCode = ex switch
                {
                    UserAlreadyExistsException => 409,
                    InvalidCredentialsException => 401,
                    Exceptions.UnauthorizedAccessException => 403,
                    _ => 400
                };
                await HandleExceptionAsync(httpContext, ex, statusCode);
            }
            catch (DatabaseException ex)
            {
                await HandleExceptionAsync(httpContext, ex, 500);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex, 500); // Fallback for unexpected exceptions
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception, int statusCode)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;

            var response = new
            {
                message = exception.Message,
                type = exception.GetType().Name
            };

            var jsonResponse = JsonConvert.SerializeObject(response); // Serialize error details
            return context.Response.WriteAsync(jsonResponse);
        }
    }
}
