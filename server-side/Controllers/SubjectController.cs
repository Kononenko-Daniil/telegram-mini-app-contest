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
    [Route("groups/{groupId:int}/subjects")]
    public class SubjectController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IGroupService _groupService;
        private readonly ISubjectService _subjectService;
        private readonly IHometaskService _hometaskService;

        public SubjectController(IUserService userService,
            IGroupService groupService,
            ISubjectService subjectService,
            IHometaskService hometaskService) {
            _groupService = groupService;
            _userService = userService;
            _subjectService = subjectService;
            _hometaskService = hometaskService;
        }

        [HttpGet]
        [UseTelegramUser]
        public async Task<ActionResult<IEnumerable<Subject>>> GetSubjects(int groupId) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!await _userService.IsAuthorized(user.Id, groupId)) {
                return Unauthorized();
            }

            var subjects = await _subjectService.GetByGroup(groupId);

            return Ok(subjects);
        }

        [HttpGet]
        [Route("{id:int}")]
        [UseTelegramUser]
        public async Task<ActionResult<Subject>> GetSubjectById(int groupId, int id) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!await _userService.IsAuthorized(user.Id, groupId)) {
                return Unauthorized();
            }

            var subject = await _subjectService.GetById(id);

            return Ok(subject);
        }

        [HttpPost]
        [Route("create")]
        [UseTelegramUser]
        public async Task<ActionResult<int>> CreateSubject(int groupId, [FromBody] CreateSubjectInput input) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!await _userService.IsAuthorized(user.Id, groupId, UserGroupRelationType.VIEWER)) {
                return Unauthorized();
            }

            var subjectId = await _subjectService.Create(input, groupId);

            return Ok(subjectId);
        }

        [HttpGet]
        [Route("{id:int}/hometasks")]
        [UseTelegramUser]
        public async Task<ActionResult<IEnumerable<Hometask>>> GetSubjectHometasks(int id, int groupId) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!await _userService.IsAuthorized(user.Id, groupId)) {
                return Unauthorized();
            }

            var hometasks = await _hometaskService.GetBySubject(id);

            return Ok(hometasks);
        }

        [HttpPost]
        [Route("{id:int}/hometasks/create")]
        [UseTelegramUser]
        public async Task<ActionResult<int>> CreateHometask(int id, int groupId, [FromBody] CreateHometaskInput input) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!await _userService.IsAuthorized(user.Id, groupId, UserGroupRelationType.VIEWER)) {
                return Unauthorized();
            }

            var hometaskId = await _hometaskService.Create(input, id);

            return Ok(hometaskId);
        }

        [HttpDelete]
        [Route("{id:int}/delete")]
        [UseTelegramUser]
        public async Task<ActionResult> DeleteSubject(int groupId, int id) {
            TelegramUser? user = _userService.Get(HttpContext);

            if (user is null) {
                return Unauthorized();
            }

            if (!await _userService.IsAuthorized(user.Id, groupId, UserGroupRelationType.VIEWER)) {
                return Unauthorized();
            }

            await _subjectService.Delete(id);

            return Ok();
        }
    }
}
