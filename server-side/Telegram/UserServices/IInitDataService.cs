namespace server_side.Telegram.UserServices
{
    public interface IInitDataService
    {
        public bool Validate(string initData);
    }
}