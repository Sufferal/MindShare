using Server.Domain;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Server.Services;

public class EmailService
{

    public async Task SendActivationEmail(User user, string activationToken)
    {
        string smtpServer = "smtp.gmail.com";
        int smtpPort = 587;
        var smtpUsername = "testsmtppython665@gmail.com";
        var smtpPassword = "roilkipnzwgabnbc";

        var activationLink = $"http://localhost:8080/api/activate?UserId={user.Id}&ActivationToken={activationToken}";

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
                   $"<a href=\"{activationLink}\" target=\"_blank\">Activate Account</a>\n\n" +
                   "Thank you!",
                IsBodyHtml = true
            };

            mailMessage.To.Add(user.Email);

            await smtpClient.SendMailAsync(mailMessage);
        }
    }

    public void SendTokenViaEmail(string userEmail, string token)
    {
        string smtpServer = "smtp.gmail.com";
        int smtpPort = 587; 
        string smtpUsername = "testsmtppython665@gmail.com";
        string smtpPassword = "roilkipnzwgabnbc";

        using (SmtpClient client = new SmtpClient(smtpServer, smtpPort))
        {
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
            client.EnableSsl = true;

            MailMessage message = new MailMessage();
            message.From = new MailAddress(smtpUsername);
            message.To.Add(userEmail);
            message.Subject = "Two-Step Authentication Token";
            message.Body = $"Your authentication token is: {token}";

            try
            {
                client.Send(message);
            }
            catch (Exception ex)
            {
                throw new ApplicationException($"Error sending email: {ex.Message}");
            }
        }
    }
}