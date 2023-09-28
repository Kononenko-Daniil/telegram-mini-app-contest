using Microsoft.EntityFrameworkCore;
using server_side.Database;
using server_side.Models;

namespace server_side.Services
{
    public class GroupService : IGroupService
    {
        private readonly MySQLContext _dbContext;

        public GroupService(MySQLContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public async Task<Group> GetById(int id) {
            var group = await _dbContext.Groups.FirstOrDefaultAsync(g => g.Id == id);

            if (group == null) {
                throw new Exception(); // TODO: CUSTOM EXCEPTION
            }

            return group;
        }

        public async Task<IEnumerable<Group>> GetUserGroups(int userId) {
            var groups = await _dbContext.Groups
                .Join(_dbContext.UserGroupRelations.Where(ugr => ugr.UserId == userId),
                    g => g.Id, 
                    ugr => ugr.GroupId, 
                    (g, ugr) => g)
                .ToListAsync();

            return groups;
        }

        public bool TryGetUserGroupRelation(int userId, int groupId, out UserGroupRelation? relation) {
            relation = _dbContext.UserGroupRelations
                .FirstOrDefault(ugr => ugr.UserId == userId && ugr.GroupId == groupId);

            if (relation is null) {
                return false;
            }

            return true;
        }
    }
}
