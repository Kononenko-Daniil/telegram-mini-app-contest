using Microsoft.EntityFrameworkCore;
using server_side.Models;

namespace server_side.Extensions.Contexts
{
    public static class ContextExtension
    {
        public static ModelBuilder AddModelsPrimaryKeys(this ModelBuilder modelBuilder) {
            modelBuilder.Entity<Group>()
               .HasKey(e => new { e.Id });
            modelBuilder.Entity<UserGroupRelation>()
                .HasKey(e => new { e.UserId, e.GroupId });
            modelBuilder.Entity<Link>()
               .HasKey(e => new { e.Id });
            modelBuilder.Entity<Subject>()
               .HasKey(e => new { e.Id });
            modelBuilder.Entity<Hometask>()
               .HasKey(e => new { e.Id });

            return modelBuilder;
        }
    }
}
