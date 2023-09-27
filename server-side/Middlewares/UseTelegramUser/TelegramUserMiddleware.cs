using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Primitives;
using server_side.Models;
using server_side.Telegram.UserServices;
using System.Net;

namespace server_side.Middlewares.UseTelegramUser
{
    public class TelegramUserMiddleware
    {
        public const string TELEGRAM_USER_CONTEXT_KEY = "TelegramUser";

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
                    await ReturnUnauthorized(context);
                }

                TelegramUser user = initDataService.GetUser(initData.ToString());

                context.Items.TryAdd(TELEGRAM_USER_CONTEXT_KEY, user);
            } else {
                await ReturnUnauthorized(context);
            }

            await _next(context);
        }

        private async Task ReturnUnauthorized(HttpContext context) {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            await context.Response.StartAsync();
        }
    }
}
