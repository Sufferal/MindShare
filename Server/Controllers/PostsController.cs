using Microsoft.AspNetCore.Mvc;
using Server.Model.Database;

namespace Server.Controllers;

[ApiController]
[Route("api/posts")]
public class PostsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetPosts()
    {
        return Ok("You got all posts");
    }

    [HttpGet("{id}")]
    public IActionResult GetPostById(int id)
    {
        return Ok($"You got the post with id {id}");
    }
    
    [HttpPost]
    public IActionResult AddPosts([FromBody] PostsModel model)
    {
        return Ok($"You added a post with title {model.Title} and content {model.Content}");
    }
    
    [HttpPut("{id}")]
    public IActionResult UpdatePosts([FromBody] PostsModel model, int id)
    {
        return Ok($"You updated the post with id {id} to have title {model.Title} and content {model.Content}");
    }
    
    [HttpDelete("{id}")]
    public IActionResult DeletePosts([FromBody] PostsModel model, int id)
    {
        return Ok($"You deleted the post with id {id}");
    }
}