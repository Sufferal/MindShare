using Microsoft.AspNetCore.Mvc;
using Server.Services;
using Server.ViewModel;

namespace Server.Controllers;

[ApiController]
[Route("api/")]
public class AuthController : ControllerBase
{   
    private readonly AuthService _authService;
    public AuthController(AuthService authService)
    {
        _authService = authService;
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        try
        {
            var user = await _authService.LoginUser(model.Username, model.Password);
            return Ok($"Login successful for user with ID {user.Id}");
        }
        catch (Exception ex)
        {
            return BadRequest($"Login failed: {ex.Message}");
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> User([FromBody] UserModel model)
    {
        try
        {
            var user = await _authService.RegisterUser(model.Username, model.Password, model.Email);
            return Ok($"User with name {user.Username} and email {user.Email} was successfully registered");
        }
        catch (Exception ex)
        {
            return BadRequest($"Registration failed: {ex.Message}");
        }
    }
}