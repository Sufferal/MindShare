using System.Threading.Tasks;
using Server.Domain;

namespace Server.Services
{
    public class UserService
    {
        private readonly UserRepository _userRepository;
        private readonly HashingService _hashingService;
        private readonly AccountActivationService _accountActivationService;

        public UserService(UserRepository userRepository)
        {
            _userRepository = userRepository;
            _hashingService = new HashingService();
            _accountActivationService = new AccountActivationService();
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _userRepository.GetUsers();
        }

        public async Task<User> GetUserById(int id)
        {
            return await _userRepository.GetUserById(id);
        }

        public async Task<User> CreateUser(string firstName, string lastName, string dateOfBirth, string gender,
                                     string username, string email, string password)
        {
            var generateToken = _accountActivationService.GenerateActivationToken();
            var hashedPassword = _hashingService.HashPassword(password);
            
            
            
            return await _userRepository.PostUser(firstName, lastName, dateOfBirth, gender, username, email, hashedPassword.PasswordHash, hashedPassword.PasswordSalt, generateToken);
        }

        public async Task<User> UpdateUser(int id, string firstName, string lastName, string dateOfBirth, string gender,
                                     string username, string email, string password)
        {
            var hashedPassword = _hashingService.HashPassword(password);
            return await _userRepository.PutUser(id, firstName, lastName, dateOfBirth, gender, username, email, hashedPassword.PasswordHash, hashedPassword.PasswordSalt);
        }

        public async Task<User> DeleteUser(int id)
        {
            return await _userRepository.DeleteUser(id);
        }
    }
}