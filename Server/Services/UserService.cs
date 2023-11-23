using System.Threading.Tasks;
using Server.Domain;

namespace Server.Services
{
    public class UserService
    {
        private readonly UserRepository _userRepository;

        public UserService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> GetUser()
        {
            return await _userRepository.GetUser();
        }

        public async Task<User> GetUserById(int id)
        {
            return await _userRepository.GetUserById(id);
        }

        public async Task<User> CreateUser(string username, string email, string password)
        {
            return await _userRepository.PostUser(username, email, password);
        }

        public async Task<User> UpdateUser(int id, string username, string email, string password)
        {
            return await _userRepository.PutUser(id, username, email, password);
        }

        public async Task<User> DeleteUser(int id)
        {
            return await _userRepository.DeleteUser(id);
        }
    }
}