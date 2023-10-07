namespace server_side.DTOs
{
    public class CreateGroupInput
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string AccessCode { get; set; }
        public string OwnerNickname { get; set; }
    }
}
