using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server_side.Middlewares.UseTelegramUser;
using server_side.Models;

namespace server_side.Controllers {
    [ApiController]
    [Route("api")]
    public class BaseController : ControllerBase {
        [HttpGet("get")]
        [UseTelegramUser]
        public IActionResult Get() {
            TelegramUser? user = HttpContext.Items[TelegramUserMiddleware.TELEGRAM_USER_CONTEXT_KEY]
                as TelegramUser;

            if (user == null) {
                return Unauthorized();
            }

            return Ok();
        }
    }
}
