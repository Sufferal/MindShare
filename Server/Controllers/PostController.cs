using Microsoft.AspNetCore.Mvc;
using Server.Services;
using Server.ViewModel;

namespace Server.Controllers;

[ApiController]
[Route("api/posts")]
public class PostsController : ControllerBase
{
    private readonly PostService _postService;

    public PostsController(PostService postService)
    {
        _postService = postService;
    }

    [HttpGet]
    public async Task<IActionResult> GetPosts()
    {
        try
        {
            var posts = await _postService.GetPosts();
            return Ok(posts);
        }
        catch (Exception ex)
        {
            return BadRequest($"Failed to retrieve posts: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPostById(int id)
    {
        try
        {
            var post = await _postService.GetPostById(id);
            if (post == null)
            {
                return NotFound($"Post with ID {id} not found");
            }
            return Ok(post);
        }
        catch (Exception ex)
        {
            return BadRequest($"Failed to retrieve post: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> AddPost([FromBody] PostModel model)
    {
        try
        {
            var post = await _postService.AddPost(model);
            return CreatedAtAction("GetPostById", new { id = post.Id }, post);
        }
        catch (Exception ex)
        {
            return BadRequest($"Failed to add a post: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePost([FromBody] PostModel model, int id)
    {
        try
        {
            var updatedPost = await _postService.UpdatePost(id, model);
            if (updatedPost == null)
            {
                return NotFound($"Post with ID {id} not found");
            }
            return Ok(updatedPost);
        }
        catch (Exception ex)
        {
            return BadRequest($"Failed to update the post: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePost(int id)
    {
        try
        {
            var deletedPost = await _postService.DeletePost(id);
            if (deletedPost == null)
            {
                return NotFound($"Post with ID {id} not found");
            }
            return Ok($"Post with ID {id} has been deleted");
        }
        catch (Exception ex)
        {
            return BadRequest($"Failed to delete the post: {ex.Message}");
        }
    }
}
