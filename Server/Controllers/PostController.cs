using Microsoft.AspNetCore.Mvc;
using Server.Services;
using Server.ViewModel;

namespace Server.Controllers;

[ApiController]
[Route("api/posts")]
public class PostsController : ControllerBase
{
    private readonly PostService _postService;
    private readonly CommentService _commentService;

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
    
    [HttpPost("{postId}/comments")]
    public async Task<IActionResult> AddCommentToPost(int postId, [FromBody] CommentModel commentModel)
    {
        try
        {
            var comment = await _postService.AddCommentToPost(postId, commentModel);
            return CreatedAtAction("GetCommentById", "Comments", new { id = comment.Id }, comment);
        }
        catch (Exception ex)
        {
            return BadRequest($"Failed to add a comment to the post: {ex.Message}");
        }
    }

    [HttpPut("{postId}/comments/{commentId}")]
    public async Task<IActionResult> UpdateCommentInPost(int postId, int commentId, [FromBody] CommentModel commentModel)
    {
        try
        {
            var updatedComment = await _postService.UpdateCommentInPost(postId, commentId, commentModel);
            if (updatedComment == null)
            {
                return NotFound($"Comment with ID {commentId} not found in post with ID {postId}");
            }
            return Ok(updatedComment);
        }
        catch (Exception ex)
        {
            return BadRequest($"Failed to update the comment in the post: {ex.Message}");
        }
    }

    [HttpDelete("{postId}/comments/{commentId}")]
    public async Task<IActionResult> DeleteCommentFromPost(int postId, int commentId)
    {
        try
        {
            var deletedComment = await _postService.DeleteCommentFromPost(postId, commentId);
            if (deletedComment == null)
            {
                return NotFound($"Comment with ID {commentId} not found in post with ID {postId}");
            }
            return Ok($"Comment with ID {commentId} has been deleted from post with ID {postId}");
        }
        catch (Exception ex)
        {
            return BadRequest($"Failed to delete the comment from the post: {ex.Message}");
        }
    }
    
    [HttpGet("{postId}/comments")]
    public async Task<IActionResult> GetCommentsForPost(int postId)
    {
        try
        {
            var comments = await _postService.GetCommentsForPost(postId);
            return Ok(comments);
        }
        catch (Exception ex)
        {
            return BadRequest($"Failed to retrieve comments for post with ID {postId}: {ex.Message}");
        }
    }
    
}
