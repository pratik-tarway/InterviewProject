using ProductManagementAPI.Dto;
using ProductManagementAPI.Exceptions;
using ProductManagementAPI.Helpers;
using ProductManagementAPI.Models;
using ProductManagementAPI.Repositories;
using System.Security.Cryptography;
using System.Text;

namespace ProductManagementAPI.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtHelper _jwtHelper;

        public UserService(IUserRepository userRepository, string jwtSecret)
        {
            _userRepository = userRepository;
            _jwtHelper = new JwtHelper(jwtSecret); 
        }

        public async Task<string> SignupAsync(UserDto userDto)
        {
            if (userDto == null)
            {
                throw new UserValidationException("User data cannot be null.");
            }

            var existingUserByUsername = await _userRepository.GetUserByUsernameAsync(userDto.Username);
            if (existingUserByUsername != null)
            {
                throw new UserAlreadyExistsException($"Username '{userDto.Username}' is already taken.");
            }

            var existingUserByEmail = await _userRepository.GetUserByEmailAsync(userDto.Email);
            if (existingUserByEmail != null)
            {
                throw new UserAlreadyExistsException($"Email '{userDto.Email}' is already registered.");
            }

            try
            {
                var hashedPassword = HashPassword(userDto.Password);

                var newUser = new User
                {
                    Username = userDto.Username,
                    Email = userDto.Email,
                    Password = hashedPassword,
                    Role = "user" // Default to 'user'
                };

                await _userRepository.AddUserAsync(newUser);

                return "User registered successfully.";
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while registering the user.", ex);
            }
        }

        public async Task<string> SignInAsync(LoginRequestDto userDto)
        {
            if (userDto == null)
            {
                throw new UserValidationException("User data cannot be null.");
            }

            try
            {
                var user = await _userRepository.GetUserByUsernameAsync(userDto.Username);
                if (user == null || !VerifyPassword(userDto.Password, user.Password))
                {
                    throw new InvalidCredentialsException("Invalid username or password.");
                }

                return _jwtHelper.GenerateJwtToken(user); // Generate JWT token for the user
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while signing in the user.", ex);
            }
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(bytes);
            }
        }

        private bool VerifyPassword(string enteredPassword, string storedHashedPassword)
        {
            var hashedEnteredPassword = HashPassword(enteredPassword);
            return hashedEnteredPassword == storedHashedPassword;
        }
    }
}
