using server_side.Telegram.UserServices;
using server_side.Types;

namespace server_side.Extensions.Services
{
    public static class TelegramExtension
    {
        public static IServiceCollection AddTelegram(this IServiceCollection services,
            IConfiguration configuration) {
            services.AddScoped<IInitDataService, InitDataService>();
            services.AddScoped<IUserService, UserService>();
            services.Configure<TelegramBotConfiguration>(
                configuration.GetSection("TelegramBotConfiguration"));

            return services;
        }
    }
}
