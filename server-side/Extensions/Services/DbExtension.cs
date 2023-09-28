using Microsoft.EntityFrameworkCore;
using server_side.Database;

namespace server_side.Extensions.Services
{
    public static class DbExtension
    {
        public static IServiceCollection AddDatabase(this IServiceCollection services,
            string connectionString) {
            services.AddDbContext<MySQLContext>(options => {
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            });

            return services;
        }
    }
}
