using ProductManagementAPI.Models;

namespace ProductManagementAPI.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetUserByUsernameAsync(string username);
        Task<User?> GetUserByEmailAsync(string email);
        Task AddUserAsync(User user);
    }
}
