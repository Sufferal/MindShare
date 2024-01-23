using Server.Domain;
using System.Security.Cryptography;
using System.Text;
namespace Server.Services;

public class HashingService
{
    public (string PasswordHash, string PasswordSalt) HashPassword(string password)
    {
        string salt = GenerateSalt();
        string hashedPassword = HashPassword(password, salt);
        return (hashedPassword, salt);
    }

    public bool VerifyPassword(string inputPassword, string storedHash, string salt)
    {
        string hashedInputPassword = HashPassword(inputPassword, salt);
        return storedHash == hashedInputPassword;
    }

    private string GenerateSalt()
    {
        byte[] saltBytes = new byte[32];
        using (var rng = new RNGCryptoServiceProvider())
        {
            rng.GetBytes(saltBytes);
        }
        return Convert.ToBase64String(saltBytes);
    }

    private string HashPassword(string password, string salt)
    {
        using (var sha256 = SHA256.Create())
        {
            byte[] combinedBytes = Encoding.UTF8.GetBytes(password + salt);
            byte[] hashBytes = sha256.ComputeHash(combinedBytes);
            return Convert.ToBase64String(hashBytes);
        }
    }
}