using server_side.Middlewares.UseTelegramUser;
using server_side.Models;
using server_side.Services;
using server_side.Types.Enums;

namespace server_side.Telegram.UserServices
{
    public class UserService : IUserService
    {
        private readonly IGroupService _groupService;

        public UserService(IGroupService groupService)
        {
            _groupService = groupService;
        }

        public TelegramUser? Get(HttpContext context) {
            TelegramUser? user = context.Items[TelegramUserMiddleware.TELEGRAM_USER_CONTEXT_KEY]
                as TelegramUser;

            return user;
        }

        public async Task<bool> IsAuthorized(int userId, int groupId, params UserGroupRelationType[] notAllowedTypes) {
            var userRelation = await _groupService.GetUserGroupRelation(userId, groupId);

            if (userRelation == null) {
                return false;
            }

            return !notAllowedTypes.Any(t => t == userRelation.Type);
        }
    }
}
