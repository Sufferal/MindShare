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

    [HttpPost("two-step-auth")]
    public async Task<IActionResult> TwoStepAuthLogin([FromBody] TwoStepAuthModel model)
    {
        try
        {
            var isValidToken = await _authService.TwoStepAuth(model.Username, model.Token);

            if (isValidToken)
            {
                return Ok(new { status = 200, message = $"Two-step authentication successful for user {model.Username}", data = model });
            }
            else
            {
                return Ok(new { status = 401, message = "Invalid two-step authentication token." });
            }
        }
        catch (Exception ex)
        {
            return Ok(new { status = 401, message = $"Two-step authentication failed: {ex.Message}" });
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
    
    [HttpPost("two-step-activate")]
    public async Task<IActionResult> ActivateTwoStepAuth([FromBody] TwoStepActivationModel model)
    {
        try
        {   
            var user = await _authService.TwoStepActivation(model.Username, model.IsActivated);
            
            if (model.IsActivated == false)
            {
                return Ok(new { status = 200, message = "Two factor authentication deactivated successfully" });
            }
            else
            {
                return Ok(new { status = 200, message = "Two factor authentication activated successfully" });
            }
        }
        catch (Exception ex)
        {
            return Ok(new { status = 400, message = $"Failed to activate two factor authentication: {ex.Message}" });
        }
    }
    
    [HttpGet("activate")]
    public async Task<IActionResult> ActivateAccount([FromQuery] ActivationModel model)
    {
        try
        {
            var user = await _authService.ActivateUser(model.UserId, model.ActivationToken);
            var htmlFilePath = Path.Combine(Directory.GetCurrentDirectory(), "activation.html");
            if (!System.IO.File.Exists(htmlFilePath))
            {
                return NotFound();
            }

            return PhysicalFile(htmlFilePath, "text/html");
        }
        catch (Exception ex)
        {
            return Ok(new { status = 400, message = $"Activation failed: {ex.Message}" });
        }
    }
    
}