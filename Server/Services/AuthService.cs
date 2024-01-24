using Server.Domain;

namespace Server.Services;

public class AuthService
{
    private readonly AuthRepository _authRepository;
    private readonly UserRepository _userRepository;
    private readonly HashingService _hashingService;
    private readonly AccountActivationService _accountActivationService;
    private readonly EmailService _emailService;
    private readonly TwoStepAuthService _twoStepAuthService;
    public AuthService(AuthRepository authRepository, UserRepository userRepository)
    {
        _authRepository = authRepository;
        _userRepository = userRepository;
        _hashingService = new HashingService();
        _accountActivationService = new AccountActivationService();
        _emailService = new EmailService();
        _twoStepAuthService = new TwoStepAuthService();
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
            ActivationToken = activationToken,
            TwoStepAuthToken = "null"
        };
        
        var registeredUser = await _authRepository.RegisterUser(user);
        
        await _emailService.SendActivationEmail(registeredUser, activationToken);

        return registeredUser;
    }

    public async Task<User> LoginUser(string username, string password)
    {
        var user = await _authRepository.GetUserByUsername(username);

        if (user.IsActivated == false)
        {
            throw new ApplicationException("Account not activated.");
        }

        if (!_hashingService.VerifyPassword(password, user.Password, user.Salt))
        {
            throw new ApplicationException("Invalid password.");
        }
        
        if (user.IsTwoFactorAuth)
        {
            var token = _twoStepAuthService.GenerateUniqueToken();
        
            user.TwoStepAuthToken = token;
            await _userRepository.UpdateUser(user);
        
            _emailService.SendTokenViaEmail(user.Email, token);
            throw new ApplicationException("Two-step authentication required.");
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
    
    public async Task<User> TwoStepActivation(string username, bool isTwoFactorAuth)
    {
        var user = await _authRepository.GetUserByUsername(username);

        if (user == null)
        {
            throw new ApplicationException("User not found.");
        }
        
        user.IsTwoFactorAuth = isTwoFactorAuth;
        return await _userRepository.UpdateUser(user);
    }
    

    public async Task<bool> TwoStepAuth(string username, string providedToken)
    {
        var user = await _authRepository.GetUserByUsername(username);

        if (user == null)
        {
            throw new ApplicationException("User not found.");
        }
        
        if (user.IsTwoFactorAuth == false)
        {
            throw new ApplicationException("Two-step authentication not activated.");
        }

        return string.Equals(user.TwoStepAuthToken, providedToken, StringComparison.Ordinal);
    }
}