using Microsoft.AspNetCore.Mvc;
using server_side.Middlewares.UseTelegramUser;
using server_side.Models;
using server_side.Services;
using server_side.Telegram.UserServices;

namespace server_side.Controllers
{
    [ApiController]
    [Route("hometasks")]
    public class HometaskController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IGroupService _groupService;
        private readonly ISubjectService _subjectService;
        private readonly IHometaskService _hometaskService;

        public HometaskController(IUserService userService,
            IGroupService groupService,
            ISubjectService subjectService,
            IHometaskService hometaskService) {
            _groupService = groupService;
            _userService = userService;
            _subjectService = subjectService;
            _hometaskService = hometaskService;
        }
    }
}
