using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Primitives;
using server_side.Telegram.UserServices;

namespace server_side.Middlewares.UseTelegramUser
{
    public class TelegramUserMiddleware
    {
        private readonly RequestDelegate _next;

        public TelegramUserMiddleware(RequestDelegate next) {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, IInitDataService initDataService) {
            Endpoint? endpoint = context.Features.Get<IEndpointFeature>()?.Endpoint;
            UseTelegramUserAttribute? attribute = endpoint?.Metadata
                .GetMetadata<UseTelegramUserAttribute>();

            if (attribute == null) {
                await _next(context);
                return;
            }

            if (context.Request.Headers.TryGetValue("InitData", out StringValues initData)) {
                bool isValid = initDataService.Validate(initData.ToString());

                if (!isValid) {
                    throw new UnauthorizedAccessException();
                }

                
            } else {
                throw new UnauthorizedAccessException();
            }

            await _next(context);
        }
    }
}
