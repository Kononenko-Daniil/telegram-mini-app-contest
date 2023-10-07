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
    [Route("groups/{groupId:int}/links")]
    public class LinkContoller : ControllerBase {
        private readonly IUserService _userService;
        private readonly ILinkService _linkService;

        public LinkContoller(IUserService userService, ILinkService linkService) {
            _linkService = linkService;
            _userService = userService;
        }

        [HttpGet("")]
        [UseTelegramUser]
        public async Task<ActionResult<IEnumerable<Link>>> GetLinks(int groupId) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!await _userService.IsAuthorized(user.Id, groupId)) {
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

            if (!await _userService.IsAuthorized(user.Id, groupId, UserGroupRelationType.VIEWER)) {
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

            if (!await _userService.IsAuthorized(user.Id, groupId, UserGroupRelationType.VIEWER)) {
                return Unauthorized();
            }

            var isDeleted = await _linkService.Delete(id);

            return Ok(isDeleted);
        }
    }
}
