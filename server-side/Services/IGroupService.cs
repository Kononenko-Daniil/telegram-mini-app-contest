using server_side.DTOs;
using server_side.Models;

namespace server_side.Services
{
    public interface IGroupService
    {
        public Task<IEnumerable<Group>> GetUserGroups(int userId);
        public Task<Group> GetById(int id);
        public Task<UserGroupRelation?> GetUserGroupRelation(int userId, int groupId);

        public Task<bool> AddUserToGroup(AddUserToGroupInput input, int userId);
        public Task<int> Create(CreateGroupInput input, int ownerId);
        public Task<bool> Delete(int id);
    }
}
