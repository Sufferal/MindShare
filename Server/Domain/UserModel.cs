namespace Server.Domain;

public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string DateOfBirth { get; set; }
    public string Gender { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Salt { get; set; }
    public bool IsActivated { get; set; }
    public string ActivationToken { get; set; }
    public bool IsTwoFactorAuth { get; set; }
    public string TwoStepAuthToken { get; set; }
    public DateTime TokenCreationTime { get; set; }
}