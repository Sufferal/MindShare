using Microsoft.EntityFrameworkCore;
using Server.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Data
{
    public class CommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Comment>> GetCommentsAsync()
        {
            return await _context.Comments.ToListAsync();
        }

        public async Task<Comment> GetCommentByIdAsync(int id)
        {
            return await _context.Comments.FindAsync(id);
        }

        public async Task<Comment> AddCommentAsync(Comment comment)
        {
            comment.CreatedAt = DateTime.Now;
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public async Task<Comment> UpdateCommentAsync(int id, Comment updatedComment)
        {
            var existingComment = await _context.Comments.FindAsync(id);
            if (existingComment == null)
                return null;

            existingComment.Author = updatedComment.Author;
            existingComment.Content = updatedComment.Content;
            await _context.SaveChangesAsync();
            return existingComment;
        }

        public async Task<Comment> DeleteCommentAsync(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
                return null;

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            return comment;
        }
        
        public async Task<List<Comment>> GetCommentsForPostAsync(int postId)
        {
            return await _context.Comments.Where(c => c.PostId == postId).ToListAsync();
        }
    }
}