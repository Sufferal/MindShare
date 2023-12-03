using Server.Data;
using Server.Domain;
using Server.ViewModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Services
{
    public class CommentService
    {
        private readonly CommentRepository _commentRepository;

        public CommentService(CommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task<List<Comment>> GetComments()
        {
            return await _commentRepository.GetCommentsAsync();
        }

        public async Task<Comment> GetCommentById(int id)
        {
            return await _commentRepository.GetCommentByIdAsync(id);
        }

        public async Task<Comment> AddComment(CommentModel model)
        {
            var comment = new Comment
            {
                Author = model.Author,
                Content = model.Content,
            };
            return await _commentRepository.AddCommentAsync(comment);
        }

        public async Task<Comment> UpdateComment(int id, CommentModel model)
        {
            var updatedComment = new Comment
            {
                Author = model.Author,
                Content = model.Content,
            };
            return await _commentRepository.UpdateCommentAsync(id, updatedComment);
        }

        public async Task<Comment> DeleteComment(int id)
        {
            return await _commentRepository.DeleteCommentAsync(id);
        }
        
        public async Task<List<Comment>> GetCommentsForPost(int postId)
        {
            return await _commentRepository.GetCommentsForPostAsync(postId);
        }
    }
}