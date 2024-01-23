using Server.Domain;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Server.Services;

public class EmailService
{

    private async Task SendActivationEmail(User user, string activationToken)
    {
        string smtpServer = "smtp.gmail.com";
        int smtpPort = 587;
        string smtpUsername = "your-gmail-account@gmail.com";
        string smtpPassword = "your-gmail-password";

        var activationLink = $"http://localhost:8080/api/activate?userId={user.Id}&token={activationToken}";

        using (SmtpClient smtpClient = new SmtpClient(smtpServer, smtpPort))
        {
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
            smtpClient.EnableSsl = true;

            MailMessage mailMessage = new MailMessage
            {
                From = new MailAddress(smtpUsername),
                Subject = "Account Activation",
                Body = $"Hello {user.FirstName},\n\n" +
                       $"Please click on the following link to activate your account:\n" +
                       $"{activationLink}\n\n" +
                       "Thank you!",
                IsBodyHtml = false
            };

            mailMessage.To.Add(user.Email);

            await smtpClient.SendMailAsync(mailMessage);
        }
    }
}