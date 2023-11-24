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
        // existingPost.UserId = updatedPost.UserId;
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
}