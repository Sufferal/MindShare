using Microsoft.EntityFrameworkCore;
using Server.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Data;
    
public class PostRepository
{
    private readonly ApplicationDbContext _context;

    public PostRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Post>> GetPostsAsync()
    {
        return await _context.Posts.ToListAsync();
    }

    public async Task<Post> GetPostByIdAsync(int id)
    {
        return await _context.Posts.FindAsync(id);
    }

    public async Task<Post> AddPostAsync(Post post)
    {
        post.CreatedAt = DateTime.Now; // Set the creation timestamp
        _context.Posts.Add(post);
        await _context.SaveChangesAsync();
        return post;
    }

    public async Task<Post> UpdatePostAsync(int id, Post updatedPost)
    {
        var existingPost = await _context.Posts.FindAsync(id);
        if (existingPost == null)
            return null;

        existingPost.Title = updatedPost.Title;
        existingPost.Content = updatedPost.Content;
        existingPost.Author = updatedPost.Author;
        await _context.SaveChangesAsync();
        return existingPost;
    }

    public async Task<Post> DeletePostAsync(int id)
    {
        var post = await _context.Posts.FindAsync(id);
        if (post == null)
            return null;

        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();
        return post;
    }
    
    public async Task<Comment> AddCommentToPostAsync(int postId, Comment comment)
    {
        var post = await _context.Posts.Include(p => p.Comments).FirstOrDefaultAsync(p => p.Id == postId);
        if (post == null)
            return null;

        comment.CreatedAt = DateTime.Now;
        comment.PostId = postId;
        post.Comments.Add(comment);
        await _context.SaveChangesAsync();

        return comment;
    }

    public async Task<Comment> UpdateCommentInPostAsync(int postId, int commentId, Comment updatedComment)
    {
        var post = await _context.Posts.Include(p => p.Comments).FirstOrDefaultAsync(p => p.Id == postId);
        if (post == null)
            return null;

        var comment = post.Comments.FirstOrDefault(c => c.Id == commentId);
        if (comment == null)
            return null;

        comment.Author = updatedComment.Author;
        comment.Content = updatedComment.Content;
        await _context.SaveChangesAsync();

        return comment;
    }

    public async Task<Comment> DeleteCommentFromPostAsync(int postId, int commentId)
    {
        var post = await _context.Posts.Include(p => p.Comments).FirstOrDefaultAsync(p => p.Id == postId);
        if (post == null)
            return null;

        var comment = post.Comments.FirstOrDefault(c => c.Id == commentId);
        if (comment == null)
            return null;

        post.Comments.Remove(comment);
        await _context.SaveChangesAsync();

        return comment;
    }
    
}