using server_side.Types.Enums;

namespace server_side.Models
{
    public class UserGroupRelation
    {
        public int UserId { get; set; }
        public int GroupId { get; set; }
        public string Nickname { get; set; }
        public UserGroupRelationType Type { get; set; }
    }
}
