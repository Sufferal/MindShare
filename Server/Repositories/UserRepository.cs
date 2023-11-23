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

    public async Task<User> GetUser()
    {
        return await _context.Users.FirstOrDefaultAsync();
    }

    public async Task<User> GetUserById(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<User> PostUser(string username, string email, string password)
    {
        var newUser = new User { Username = username, Email = email, Password = password };
        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();
        return newUser;
    }

    public async Task<User> PutUser(int id, string username, string email, string password)
    {
        var existingUser = await _context.Users.FindAsync(id);

        if (existingUser != null)
        {
            existingUser.Username = username;
            existingUser.Email = email;
            existingUser.Password = password;

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