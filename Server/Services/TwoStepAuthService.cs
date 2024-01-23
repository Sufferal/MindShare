using Server.Domain;
using System.Net;
using System.Net.Mail;

namespace Server.Services;

public class TwoStepAuthService
{
    public string GenerateUniqueToken()
    {
        using (var rng = new System.Security.Cryptography.RNGCryptoServiceProvider())
        {
            var tokenBytes = new byte[32]; // 256 bits for a secure token
            rng.GetBytes(tokenBytes);
            return Convert.ToBase64String(tokenBytes);
        }
    }

}