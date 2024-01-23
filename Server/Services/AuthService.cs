using Server.Domain;

namespace Server.Services;

public class AuthService
{
    private readonly AuthRepository _authRepository;
    private readonly UserRepository _userRepository;
    private readonly HashingService _hashingService;
    private readonly AccountActivationService _accountActivationService;
    public AuthService(AuthRepository authRepository, UserRepository userRepository)
    {
        _authRepository = authRepository;
        _userRepository = userRepository;
        _hashingService = new HashingService();
        _accountActivationService = new AccountActivationService();
    }

    public async Task<User> RegisterUser(string firstName, string lastName, string dateOfBirth, string gender, 
                                        string username, string password, string email)
    {
        var hashedPassword = _hashingService.HashPassword(password);
        var activationToken = _accountActivationService.GenerateActivationToken();
        
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
            IsActivated = false,
            ActivationToken = activationToken
        };
        
        // await SendActivationEmail(user, activationToken);

        return await _authRepository.RegisterUser(user);
    }

    public async Task<User> LoginUser(string username, string password)
    {
        var user = await _authRepository.GetUserByUsername(username);

        if (!_hashingService.VerifyPassword(password, user.Password, user.Salt))
        {
            throw new ApplicationException("Invalid password.");
        }

        return user;
    }
    
    public async Task<User> ActivateUser(int userId, string activationToken)
    {
        var user = await _userRepository.GetUserById(userId);

        if (user == null || user.IsActivated)
        {
            throw new ApplicationException("Invalid user or account already activated.");
        }
        
        if (!_accountActivationService.ValidateActivationToken(user, activationToken))
        {
            throw new ApplicationException("Invalid activation token.");
        }

        user.IsActivated = true;
        return await _userRepository.UpdateUser(user);
    }

}