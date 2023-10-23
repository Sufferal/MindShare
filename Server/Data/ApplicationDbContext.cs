using Microsoft.EntityFrameworkCore;
using Server.Domain;

namespace Server.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Post> Posts { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User entity
        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .IsRequired();

            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsRequired();

            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsRequired();
        });
        
        // Post entity
        modelBuilder.Entity<Post>(entity =>
        {
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .IsRequired();

            entity.Property(e => e.Content)
                .HasMaxLength(1000)
                .IsRequired();

            entity.Property(e => e.CreatedAt)
                .IsRequired();
        });
        
    }
}