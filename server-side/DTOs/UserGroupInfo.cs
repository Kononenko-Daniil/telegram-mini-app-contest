using server_side.Types.Enums;

namespace server_side.DTOs
{
    public class UserGroupInfo
    {
        public int UserId { get; set; }
        public int GroupId { get; set; }
        public string Nickname { get; set; }
        public UserGroupRelationType Type { get; set; }
        public bool IsOwner { get; set; }
        public bool CanEdit { get; set; }
    }
}
