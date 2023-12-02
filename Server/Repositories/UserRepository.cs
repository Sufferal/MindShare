using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Domain;

public class UserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetUsers()
    {
        return await _context.Users.ToListAsync();
        
    }

    public async Task<User> GetUserById(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<User> PostUser(string firstName, string lastName, string dateOfBirth, string gender,
                                     string username, string email, string password, string salt)
    {
        var newUser = new User { FirstName = firstName, LastName = lastName, DateOfBirth = dateOfBirth, Gender = gender, 
                                 Username = username, Email = email, Password = password, Salt = salt};
        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();
        return newUser;
    }

    public async Task<User> PutUser(int id, string firstName, string lastName, string dateOfBirth, string gender,
                                     string username, string email, string password, string salt)
    {
        var existingUser = await _context.Users.FindAsync(id);

        if (existingUser != null)
        {
            existingUser.FirstName = firstName;
            existingUser.LastName = lastName;
            existingUser.DateOfBirth = dateOfBirth;
            existingUser.Gender = gender;
            existingUser.Username = username;
            existingUser.Email = email;
            existingUser.Password = password;
            existingUser.Salt = salt;

            await _context.SaveChangesAsync();
        }

        return existingUser;
    }

    public async Task<User> DeleteUser(int id)
    {
        var userToDelete = await _context.Users.FindAsync(id);

        if (userToDelete != null)
        {
            _context.Users.Remove(userToDelete);
            await _context.SaveChangesAsync();
        }

        return userToDelete;
    }
}