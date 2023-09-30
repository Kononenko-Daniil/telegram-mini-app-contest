using server_side.Models;

namespace server_side.Telegram.UserServices
{
    public interface IUserService
    {
        public TelegramUser? Get(HttpContext context);
    }
}
