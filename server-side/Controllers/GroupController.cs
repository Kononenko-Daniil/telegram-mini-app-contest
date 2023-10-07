using Microsoft.AspNetCore.Mvc;
using server_side.DTOs;
using server_side.Middlewares.UseTelegramUser;
using server_side.Models;
using server_side.Services;
using server_side.Telegram.UserServices;
using server_side.Types.Enums;
using System.ComponentModel;

namespace server_side.Controllers
{
    [ApiController]
    [Route("groups")]
    public class GroupController : ControllerBase
    {
        private readonly IGroupService _groupService;
        private readonly IUserService _userService;
        private readonly IHometaskService _hometaskService;

        public GroupController(IGroupService groupService, IUserService userService, IHometaskService hometaskService)
        {
            _groupService = groupService;
            _userService = userService;
            _hometaskService = hometaskService;
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

            if (!await _userService.IsAuthorized(user.Id, id)) {
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

        [HttpPost]
        [Route("add-user")]
        [UseTelegramUser]
        public async Task<ActionResult> AddUserToGroup([FromBody] AddUserToGroupInput input) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            await _groupService.AddUserToGroup(input, user.Id);

            return Ok();
        }

        [HttpGet("{id:int}/hometasks")]
        [UseTelegramUser]
        public async Task<ActionResult<IEnumerable<Hometask>>> GetGroupHometasks(int id) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!await _userService.IsAuthorized(user.Id, id)) {
                return Unauthorized();
            }

            var hometasks = await _hometaskService.GetByGroup(id);

            return Ok(hometasks);
        }

        [HttpGet("{id:int}/hometasks/{hometaskId:int}")]
        [UseTelegramUser]
        public async Task<ActionResult<Hometask>> GetHometaskById(int id, int hometaskId) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!await _userService.IsAuthorized(user.Id, id)) {
                return Unauthorized();
            }

            var hometask = await _hometaskService.GetById(hometaskId);

            return Ok(hometask);
        }

        [HttpPost("{id:int}/hometasks/{hometaskId:int}/delete")]
        [UseTelegramUser]
        public async Task<ActionResult<bool>> DeleteHometask(int id, int groupId) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!await _userService.IsAuthorized(user.Id, id, UserGroupRelationType.VIEWER)) {
                return Unauthorized();
            }

            var isDeleted = await _hometaskService.Delete(id);

            return Ok(isDeleted);
        }
    }
}
