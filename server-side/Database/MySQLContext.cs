using Microsoft.EntityFrameworkCore;
using server_side.Extensions.Contexts;
using server_side.Models;

namespace server_side.Database
{
    public class MySQLContext : DbContext
    {
        public DbSet<Group> Groups { get; set; }
        public DbSet<UserGroupRelation> UserGroupRelations { get; set; }

        public MySQLContext(DbContextOptions<MySQLContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.HasCharSet(null, DelegationModes.ApplyToDatabases);

            modelBuilder
                .AddModelsPrimaryKeys();
        }
    }
}
