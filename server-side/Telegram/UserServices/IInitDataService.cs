using server_side.Models;

namespace server_side.Telegram.UserServices
{
    public interface IInitDataService
    {
        public bool Validate(string initData);
        public TelegramUser GetUser(string initData);
    }
}