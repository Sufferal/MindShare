using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    [HttpGet]
    public IActionResult GetUsers()
    {
        return Ok("You got all users");
    }

    [HttpGet("{id}")]
    public IActionResult GetUserById(int id)
    {
        return Ok($"You got user with id {id}");
    }
    
    [HttpGet("{id}/posts")]
    public IActionResult GetPostsByUserId(int userId)
    {
        return Ok($"You got all posts by user with id {userId}");
    }

}