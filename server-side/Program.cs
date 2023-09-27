using server_side.Extensions.Services;
using server_side.Middlewares.UseTelegramUser;

const string ALLOW_ORIGINS = "allowOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTelegram(builder.Configuration);

builder.Services.AddCors(p => p.AddPolicy(ALLOW_ORIGINS, policy => {
    policy.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
}));

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(ALLOW_ORIGINS);

app.UseMiddleware<TelegramUserMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
