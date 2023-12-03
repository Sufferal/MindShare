using Microsoft.AspNetCore.Mvc;
using Server.Services;
using Server.ViewModel;
using System;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly CommentService _commentService;

        public CommentsController(CommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetComments()
        {
            try
            {
                var comments = await _commentService.GetComments();
                return Ok(comments);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to retrieve comments: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCommentById(int id)
        {
            try
            {
                var comment = await _commentService.GetCommentById(id);
                if (comment == null)
                {
                    return NotFound($"Comment with ID {id} not found");
                }
                return Ok(comment);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to retrieve comment: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddComment([FromBody] CommentModel model)
        {
            try
            {
                var comment = await _commentService.AddComment(model);
                return CreatedAtAction("GetCommentById", new { id = comment.Id }, comment);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to add a comment: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComment([FromBody] CommentModel model, int id)
        {
            try
            {
                var updatedComment = await _commentService.UpdateComment(id, model);
                if (updatedComment == null)
                {
                    return NotFound($"Comment with ID {id} not found");
                }
                return Ok(updatedComment);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to update the comment: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            try
            {
                var deletedComment = await _commentService.DeleteComment(id);
                if (deletedComment == null)
                {
                    return NotFound($"Comment with ID {id} not found");
                }
                return Ok($"Comment with ID {id} has been deleted");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to delete the comment: {ex.Message}");
            }
        }
    }
}
