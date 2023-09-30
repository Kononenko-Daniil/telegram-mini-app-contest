using server_side.Profiles;
using server_side.Services;

namespace server_side.Extensions.Services
{
    public static class DIExtension
    {
        public static IServiceCollection AddServices(this IServiceCollection services) {
            services.AddScoped<IGroupService, GroupService>();

            return services;
        }
    }
}
