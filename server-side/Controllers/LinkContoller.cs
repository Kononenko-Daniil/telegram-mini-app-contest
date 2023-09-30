using Microsoft.AspNetCore.Mvc;
using server_side.DTOs;
using server_side.Middlewares.UseTelegramUser;
using server_side.Models;
using server_side.Services;
using server_side.Telegram.UserServices;

namespace server_side.Controllers
{
    [ApiController]
    [Route("groups/{groupId:int}/links")]
    public class LinkContoller : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILinkService _linkService;
        private readonly IGroupService _groupService;

        public LinkContoller(IUserService userService, ILinkService linkService, IGroupService groupService)
        {
            _linkService = linkService;
            _userService = userService;
            _groupService = groupService;
        }

        [HttpGet("")]
        [UseTelegramUser]
        public async Task<ActionResult<IEnumerable<Link>>> GetLinks(int groupId) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!_groupService.TryGetUserGroupRelation(user.Id, groupId, out UserGroupRelation? relation)) {
                return Unauthorized();
            }

            var links = await _linkService.GetByGroup(groupId);

            return Ok(links);
        }

        [HttpPost("create")]
        [UseTelegramUser]
        public async Task<ActionResult<int>> CreateLink(int groupId, [FromBody] CreateLinkInput input) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!_groupService.TryGetUserGroupRelation(user.Id, groupId, out UserGroupRelation? relation)) {
                return Unauthorized();
            }

            var linkId = await _linkService.Create(input, groupId);

            return Ok(linkId);
        }

        [HttpPost("{id:int}/delete")]
        [UseTelegramUser]
        public async Task<ActionResult<bool>> DeleteLink(int groupId, int id) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!_groupService.TryGetUserGroupRelation(user.Id, groupId, out UserGroupRelation? relation)) {
                return Unauthorized();
            }

            var isDeleted = await _linkService.Delete(id);

            return Ok(isDeleted);
        }
    }
}
