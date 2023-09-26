using Microsoft.AspNetCore.Mvc;
using server_side.Middlewares.UseTelegramUser;

namespace server_side.Controllers {
    [ApiController]
    [Route("api")]
    public class BaseController : ControllerBase {
        [HttpGet("get")]
        [UseTelegramUser]
        public void Get() {

        }
    }
}
