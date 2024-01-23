using Microsoft.AspNetCore.Mvc;
using Server.Services;
using Server.ViewModel;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetUsers();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userService.GetUserById(id);

            if (user == null)
            {
                return NotFound($"User with id {id} not found");
            }

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserModel request)
        {
            try
            {
                var user = await _userService.CreateUser(request.FirstName, request.LastName, request.DateOfBirth,
                    request.Gender,
                    request.Username, request.Email, request.Password);
                return Ok(new { status = 200 , message = "User was successfully added", data = user });
            }
            catch (Exception ex)
            {
                return Ok(new {status = 400, message = $"Failed to add user: {ex.Message}"});
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserModel request)
        {
            var user = await _userService.UpdateUser(id, request.FirstName, request.LastName, request.DateOfBirth, request.Gender,
                                                     request.Username, request.Email, request.Password);

            if (user == null)
            {
                return NotFound($"User with id {id} not found");
            }

            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var deletedUser = await _userService.DeleteUser(id);

            if (deletedUser == null)
            {
                return NotFound($"User with id {id} not found");
            }

            return Ok(deletedUser);
        }
    }
}