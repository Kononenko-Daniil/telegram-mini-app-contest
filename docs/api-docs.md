# API Documentation

Server-side represents a .NET 7 Web-API project. 
 
 - **Entity Framework** for interacting with database.
 - **AutoMapper** for mapping DTOs on models (and vice-versa)

## Main features

In this section I would describe you the most interesting (from my point of view) parts of this application.

### Telegram services

#### InitData using
In order to correctly check user information, which we get from *Telegram.WebApp.initData* I've created **InitDataService** *(/Telegram/UserServices dir)*. It has two public methods:

- `bool Validate (string initData)` - it gets raw initData string and validate it according to official Telegram algorithm, which is described [here](https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app)
- `TelegramUser GetUser (string initData)` - it retrieves validated initData string and get user information from it as `TelegramUser` *(Models dir)* object.

#### Getting current user in endpoint
Generally every endpoint can get current **TelegramUser** instance, by using:
 - `[UseTelegramUser]` attribute, which launches `TelegramUserMiddleware`, which gets **initData** field from *request headers* (`InitData` header) and then, by using `InitDataService` it provides `TelegramUser` instance to the context
 - `TelegramUser UserService.Get (HttpContext)` method to get current `TelegramUser` instance from `HttpContext`.

#### Authorizing user in group
In order to authorize user in specific group *(check his permissions and check if the user is a participant of this group)* there is `bool UserService.IsAuthorized(TelegramUser user, int groupId, params UserGroupRelationType [] notAllowedTypes)` method. It retrieves Telegram user, group id and user types that are not allowed to access this resource.

**Example**: we have an endpoint that can be accessed only by **owner** of a group, so that means that users with types: `UserGroupRelationType.EDITOR` and `UserGroupRelationType.OWNER` don't have an access.

## Endpoints

If you want to learn more about API endpoints, you can visit [Swagger](https://glowing-usually-robin.ngrok-free.app/swagger).


