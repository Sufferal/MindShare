using Server.Domain;

namespace Server.Services;

public class AuthService
{
    private readonly AuthRepository _userRepository;

    public AuthService(AuthRepository authRepository)
    {
        _userRepository = authRepository;
    }

    public async Task<User> RegisterUser(string username, string password, string email)
    {
        var user = new User
        {
            Username = username,
            Email = email,
            Password = password,
        };

        return await _userRepository.RegisterUser(user);
    }

    public async Task<User> LoginUser(string username, string password)
    {
        // You can perform any additional validation or business logic here
        return await _userRepository.LoginUser(username, password);
    }

}