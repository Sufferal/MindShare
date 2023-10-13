using Microsoft.AspNetCore.Mvc;
using Server.ViewModel;

namespace Server.Controllers;

[ApiController]
[Route("api/")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel model)
    {
        if (model.Username == "username" && model.Password == "password")
        {
            return Ok("Login successful");
        }
        
        return BadRequest("Login failed");
    }
    
    [HttpPost("register")]
    public IActionResult User([FromBody] UserModel model)
    {
        return Ok($"User with name {model.Username} and email {model.Email} was successfully registered");
    }
}