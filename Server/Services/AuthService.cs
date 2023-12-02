using Server.Domain;

namespace Server.Services;

public class AuthService
{
    private readonly AuthRepository _userRepository;
    private readonly HashingService _hashingService;
    public AuthService(AuthRepository authRepository)
    {
        _userRepository = authRepository;
        _hashingService = new HashingService();
    }

    public async Task<User> RegisterUser(string firstName, string lastName, string dateOfBirth, string gender, 
                                        string username, string password, string email)
    {
        var hashedPassword = _hashingService.HashPassword(password);
        var user = new User
        {
            FirstName = firstName,
            LastName = lastName,
            DateOfBirth = dateOfBirth,
            Gender = gender,
            Username = username,
            Email = email,
            Password = hashedPassword.PasswordHash,
            Salt = hashedPassword.PasswordSalt,
        };

        return await _userRepository.RegisterUser(user);
    }

    public async Task<User> LoginUser(string username, string password)
    {
        var user = await _userRepository.GetUserByUsername(username);

        if (!_hashingService.VerifyPassword(password, user.Password, user.Salt))
        {
            throw new ApplicationException("Invalid password.");
        }

        return user;
    }

}