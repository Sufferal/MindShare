using Server.Domain;

namespace Server.Services;

public class AuthService
{
    private readonly AuthRepository _userRepository;

    public AuthService(AuthRepository authRepository)
    {
        _userRepository = authRepository;
    }

    public async Task<User> RegisterUser(string firstName, string lastName, string dateOfBirth, string gender, 
                                        string username, string password, string email)
    {
        var user = new User
        {
            FirstName = firstName,
            LastName = lastName,
            DateOfBirth = dateOfBirth,
            Gender = gender,
            Username = username,
            Email = email,
            Password = password,
        };

        return await _userRepository.RegisterUser(user);
    }

    public async Task<User> LoginUser(string username, string password)
    {
        // TODO: Password hashing
        return await _userRepository.LoginUser(username, password);
    }

}