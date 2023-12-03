using Server.Domain;
using Server.ViewModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Data;

namespace Server.Services
{
    public class PostService
    {
        private readonly PostRepository _postRepository;

        public PostService(PostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public async Task<List<Post>> GetPosts()
        {
            return await _postRepository.GetPostsAsync();
        }

        public async Task<Post> GetPostById(int id)
        {
            return await _postRepository.GetPostByIdAsync(id);
        }

        public async Task<Post> AddPost(PostModel model)
        {
            var post = new Post
            {
                Title = model.Title,
                Author = model.Author,
                Content = model.Content,
            };
            return await _postRepository.AddPostAsync(post);
        }

        public async Task<Post> UpdatePost(int id, PostModel model)
        {
            var updatedPost = new Post
            {
                Title = model.Title,
                Author = model.Author,
                Content = model.Content
            };
            return await _postRepository.UpdatePostAsync(id, updatedPost);
        }

        public async Task<Post> DeletePost(int id)
        {
            return await _postRepository.DeletePostAsync(id);
        }
        
        public async Task<Comment> AddCommentToPost(int postId, CommentModel model)
        {
            var comment = new Comment()
            {
                Author = model.Author,
                Content = model.Content,
            };
            return await _postRepository.AddCommentToPostAsync(postId, comment);
        }

        public async Task<Comment> UpdateCommentInPost(int postId, int commentId, CommentModel model)
        {
            var updatedComment = new Comment()
            {
                Author = model.Author,
                Content = model.Content,
            };
            return await _postRepository.UpdateCommentInPostAsync(postId, commentId, updatedComment);
        }

        public async Task<Comment> DeleteCommentFromPost(int postId, int commentId)
        {
            return await _postRepository.DeleteCommentFromPostAsync(postId, commentId);
        }
        
        public async Task<List<Comment>> GetCommentsForPost(int postId)
        {
            var post = await _postRepository.GetPostByIdAsync(postId);
            if (post == null)
            {
                // Handle the case where the post is not found
                return null;
            }

            return post.Comments;
        }
        
    }
}