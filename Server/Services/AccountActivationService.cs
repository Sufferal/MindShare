using Server.Domain;

namespace Server.Services;

public class AccountActivationService
{
    public string GenerateActivationToken()
    {
        return Guid.NewGuid().ToString();
    }

    public bool ValidateActivationToken(User user, string activationToken)
    {

        return !string.IsNullOrEmpty(activationToken) &&
               !user.IsActivated && 
               string.Equals(activationToken, user.ActivationToken, StringComparison.Ordinal);
    }
}