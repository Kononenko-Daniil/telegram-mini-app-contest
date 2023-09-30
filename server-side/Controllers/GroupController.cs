using Microsoft.AspNetCore.Mvc;
using server_side.DTOs;
using server_side.Middlewares.UseTelegramUser;
using server_side.Models;
using server_side.Services;
using server_side.Telegram.UserServices;

namespace server_side.Controllers
{
    [ApiController]
    [Route("groups")]
    public class GroupController : ControllerBase
    {
        private readonly IGroupService _groupService;
        private readonly IUserService _userService;

        public GroupController(IGroupService groupService, IUserService userService)
        {
            _groupService = groupService;
            _userService = userService;
        }

        [HttpGet]
        [Route("my")]
        [UseTelegramUser]
        public async Task<ActionResult<IEnumerable<Group>>> GetMyGroups() {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            var groups = await _groupService.GetUserGroups(user.Id);

            return Ok(groups);
        }

        [HttpGet]
        [Route("{id:int}")]
        [UseTelegramUser]
        public async Task<ActionResult<Group>> GetGroupById(int id) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if(!_groupService.TryGetUserGroupRelation(user.Id, id, out UserGroupRelation? relation)) {
                return Unauthorized();
            }

            var group = await _groupService.GetById(id);

            return Ok(group);
        }

        [HttpPost]
        [Route("create")]
        [UseTelegramUser]
        public async Task<ActionResult<int>> CreateGroup([FromBody] CreateGroupInput input) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            var groupId = await _groupService.Create(input, user.Id);

            return groupId;
        }
    }
}
