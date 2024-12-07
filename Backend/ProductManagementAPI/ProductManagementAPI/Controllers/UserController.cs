using Microsoft.AspNetCore.Mvc;
using ProductManagementAPI.Dto;
using ProductManagementAPI.Services;

namespace ProductManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] UserDto userDto)
        {
            var result = await _userService.SignupAsync(userDto);
            return Ok(result);
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] LoginRequestDto loginRequestDto)
        {
            var token = await _userService.SignInAsync(loginRequestDto);
            return Ok(new { token });
        }
    }
}
