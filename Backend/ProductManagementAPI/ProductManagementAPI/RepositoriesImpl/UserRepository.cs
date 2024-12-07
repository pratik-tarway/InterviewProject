using Dapper;
using ProductManagementAPI.Models;
using ProductManagementAPI.Repositories;
using System.Data;

namespace ProductManagementAPI.RepositoriesImpl
{
    public class UserRepository : IUserRepository
    {
        private readonly IDbConnection _connection;

        public UserRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            var query = "SELECT * FROM Users WHERE Username = @Username LIMIT 1";
            return await _connection.QueryFirstOrDefaultAsync<User>(query, new { Username = username });
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            var query = "SELECT * FROM Users WHERE Email = @Email LIMIT 1";
            return await _connection.QueryFirstOrDefaultAsync<User>(query, new { Email = email });
        }

        public async Task AddUserAsync(User user)
        {
            var query = "INSERT INTO Users (Username, Email, Password, Role) VALUES (@Username, @Email, @Password, @Role)";
            await _connection.ExecuteAsync(query, user);
        }
    }
}
