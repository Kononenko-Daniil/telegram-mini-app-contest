using Microsoft.EntityFrameworkCore;
using server_side.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace server_side.Extensions.Contexts
{
    public static class ContextExtension
    {
        public static ModelBuilder AddModelsPrimaryKeys(this ModelBuilder modelBuilder) {
            modelBuilder.Entity<Group>()
               .HasKey(e => new { e.Id });
            modelBuilder.Entity<UserGroupRelation>()
                .HasKey(e => new { e.UserId, e.GroupId });

            return modelBuilder;
        }
    }
}
