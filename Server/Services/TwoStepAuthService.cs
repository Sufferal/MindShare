using Server.Domain;
using System.Net;
using System.Net.Mail;

namespace Server.Services;

public class TwoStepAuthService
{
    private const int TokenSizeInBytes = 16; // 128 bits
    private const int TokenExpirationMinutes = 1;

    public (string token, DateTime timestamp) GenerateUniqueToken()
    {
        using var rng = new System.Security.Cryptography.RNGCryptoServiceProvider();
        var tokenBytes = new byte[TokenSizeInBytes];
        rng.GetBytes(tokenBytes);

        var token = Convert.ToBase64String(tokenBytes);
        var timestamp = DateTime.UtcNow;

        return (token, timestamp);
    }

    public bool IsTokenExpired(DateTime timestamp)
    {
        // Calculate the age of the token
        var age = DateTime.UtcNow - timestamp;

        // Check if the token has expired
        return age <= TimeSpan.FromMinutes(TokenExpirationMinutes);
    }
}