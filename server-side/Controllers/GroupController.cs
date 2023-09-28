using Microsoft.AspNetCore.Mvc;
using server_side.Middlewares.UseTelegramUser;
using server_side.Models;
using server_side.Services;

namespace server_side.Controllers
{
    [ApiController]
    [Route("groups")]
    public class GroupController : ControllerBase
    {
        private readonly IGroupService _groupService;

        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet]
        [Route("my")]
        [UseTelegramUser]
        public async Task<ActionResult<IEnumerable<Group>>> GetMyGroups() {
            TelegramUser? user = GetUserFromContext(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            var groups = await _groupService.GetUserGroups(user.Id);

            return Ok(groups);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<Group>> GetGroupById(int id) {
            TelegramUser? user = GetUserFromContext(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if(!_groupService.TryGetUserGroupRelation(user.Id, id, out UserGroupRelation? relation)) {
                return Unauthorized();
            }

            var group = await _groupService.GetById(id);

            return Ok(group);
        }

        private TelegramUser? GetUserFromContext(HttpContext context) {
            TelegramUser? user = context.Items[TelegramUserMiddleware.TELEGRAM_USER_CONTEXT_KEY]
                as TelegramUser;

            return user;
        }
    }
}
