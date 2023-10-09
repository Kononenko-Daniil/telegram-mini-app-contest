using server_side.Extensions.Services;
using server_side.Middlewares.UseTelegramUser;

var builder = WebApplication.CreateBuilder(args);

string ALLOW_ORIGINS = "allowOrigins";
string DB_CONNECTION_STRING = builder.Configuration.GetConnectionString("Default")!;

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddTelegram(builder.Configuration);
builder.Services.AddDatabase(DB_CONNECTION_STRING);
builder.Services.AddServices();

builder.Services.AddCors(p => p.AddPolicy(ALLOW_ORIGINS, policy => {
    policy.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
}));

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors(ALLOW_ORIGINS);

app.UseMiddleware<TelegramUserMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
