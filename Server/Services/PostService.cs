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
                Content = model.Content,
                // UserId = model.UserId
            };
            return await _postRepository.AddPostAsync(post);
        }

        public async Task<Post> UpdatePost(int id, PostModel model)
        {
            var updatedPost = new Post
            {
                Title = model.Title,
                Content = model.Content,
                // UserId = model.UserId
            };
            return await _postRepository.UpdatePostAsync(id, updatedPost);
        }

        public async Task<Post> DeletePost(int id)
        {
            return await _postRepository.DeletePostAsync(id);
        }
    }
}