using Microsoft.AspNetCore.Mvc;
using server_side.DTOs;
using server_side.Middlewares.UseTelegramUser;
using server_side.Models;
using server_side.Services;
using server_side.Telegram.UserServices;
using server_side.Types.Enums;

namespace server_side.Controllers
{
    [ApiController]
    [Route("groups")]
    public class GroupController : ControllerBase
    {
        private readonly IGroupService _groupService;
        private readonly IUserService _userService;
        private readonly IHometaskService _hometaskService;

        public GroupController(IGroupService groupService,
            IUserService userService,
            IHometaskService hometaskService) {
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

        [HttpDelete]
        [Route("{id:int}/delete")]
        [UseTelegramUser]
        public async Task<ActionResult> DeleteGroup(int id) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!await _userService.IsAuthorized(user.Id, id, 
                    UserGroupRelationType.EDITOR, 
                    UserGroupRelationType.VIEWER)) {
                return Unauthorized();
            }

            await _groupService.Delete(id);

            return Ok();
        }

        [HttpGet]
        [Route("{id:int}/user-info")]
        [UseTelegramUser]
        public async Task<ActionResult<UserGroupInfo>> GetUserGroupRelation(int id) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            var userRelation = await _groupService.GetUserGroupRelation(user.Id, id);
            if (userRelation == null) {
                return Unauthorized();
            }
            var userGroupInfo = _groupService.GetUserGroupInfo(userRelation);

            return Ok(userGroupInfo);
        }

        [HttpGet]
        [Route("{id:int}/participants")]
        [UseTelegramUser]
        public async Task<ActionResult<IEnumerable<UserGroupInfo>>> GetGroupParticipants(int id) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!await _userService.IsAuthorized(user.Id, id, UserGroupRelationType.EDITOR,
                    UserGroupRelationType.VIEWER)) {
                return Unauthorized();
            }

            var participants = await _groupService.GetParticipants(id);

            return Ok(participants);
        }

        [HttpPost]
        [Route("participants/join")]
        [UseTelegramUser]
        public async Task<ActionResult> AddUserToGroup([FromBody] AddUserToGroupInput input) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            await _groupService.AddUserToGroup(input, user.Id);

            return Ok();
        }

        [HttpPost]
        [Route("{id:int}/participants/update")]
        [UseTelegramUser]
        public async Task<ActionResult> UpdateParticipant(int id, [FromBody] UserGroupRelation input) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!await _userService.IsAuthorized(user.Id, id,
                    UserGroupRelationType.EDITOR,
                    UserGroupRelationType.VIEWER)) {
                return Unauthorized();
            }

            await _groupService.UpdateUserGroupRelation(input);

            return Ok();
        }

        [HttpDelete]
        [Route("{id:int}/participants/{participantId:int}/delete")]
        [UseTelegramUser]
        public async Task<ActionResult> ExcludeParticipantFromGroup(int id, int participantId) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!await _userService.IsAuthorized(user.Id, id, 
                    UserGroupRelationType.EDITOR, 
                    UserGroupRelationType.VIEWER)) {
                return Unauthorized();
            }

            await _groupService.ExcludeUser(participantId, id);

            return Ok();
        }

        [HttpDelete]
        [Route("{id:int}/participants/exclude-me")]
        [UseTelegramUser]
        public async Task<ActionResult> ExcludeMeFromGroup(int id) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!await _userService.IsAuthorized(user.Id, id)) {
                return Unauthorized();
            }

            await _groupService.ExcludeUser(user.Id, id);

            return Ok();
        }

        [HttpGet]
        [Route("{id:int}/hometasks")]
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

        [HttpGet]
        [Route("{id:int}/hometasks/{hometaskId:int}")]
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

        [HttpDelete]
        [Route("{id:int}/hometasks/{hometaskId:int}/delete")]
        [UseTelegramUser]
        public async Task<ActionResult> DeleteHometask(int id, int hometaskId) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!await _userService.IsAuthorized(user.Id, id, UserGroupRelationType.VIEWER)) {
                return Unauthorized();
            }

            await _hometaskService.Delete(hometaskId);

            return Ok();
        }
    }
}
