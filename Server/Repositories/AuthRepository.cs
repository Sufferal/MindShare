using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Domain;

public class AuthRepository
{
    private readonly ApplicationDbContext _context;

    public AuthRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<User> RegisterUser(User user)
    {
        if (await _context.Users.AnyAsync(u => u.Username == user.Username))
        {
            throw new ApplicationException("Username is already taken.");
        }
        
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return user;
    }
    
    public async Task<User> GetUserByUsername(string username)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == username);

        if (user == null)
        {
            throw new ApplicationException("User not found.");
        }

        return user;
    }
    
}