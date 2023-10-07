using server_side.Models;
using server_side.Types.Enums;

namespace server_side.Telegram.UserServices
{
    public interface IUserService
    {
        public TelegramUser? Get(HttpContext context);
        public Task<bool> IsAuthorized(int userId, int groupId, params UserGroupRelationType[] allowedTypes);
    }
}
