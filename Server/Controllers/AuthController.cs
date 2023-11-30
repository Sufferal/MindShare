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
            return Ok(new { status = 200, message = $"Login successful for user with ID {user.Id}", data = user });
        }
        catch (Exception ex)
        {
            return Ok(new { status = 401, message = $"Login failed: {ex.Message}" });
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> User([FromBody] UserModel model)
    {
        try
        {
            var user = await _authService.RegisterUser(model.FirstName, model.LastName, model.DateOfBirth, model.Gender,
                                                       model.Username, model.Password, model.Email);
            return Ok(new { status = 200, message = "User was successfully registered", data = user });
        }
        catch (Exception ex)
        {
            return Ok(new { status = 400, message = $"Registration failed: {ex.Message}" });
        }
    }
}