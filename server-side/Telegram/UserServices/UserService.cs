using server_side.Middlewares.UseTelegramUser;
using server_side.Models;

namespace server_side.Telegram.UserServices
{
    public class UserService : IUserService
    {
        public TelegramUser? Get(HttpContext context) {
            TelegramUser? user = context.Items[TelegramUserMiddleware.TELEGRAM_USER_CONTEXT_KEY]
                as TelegramUser;

            return user;
        }
    }
}
