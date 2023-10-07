using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server_side.Database;
using server_side.DTOs;
using server_side.Models;
using server_side.Types.Enums;

namespace server_side.Services
{
    public class GroupService : IGroupService
    {
        private readonly MySQLContext _dbContext;
        private readonly IMapper _mapper;

        public GroupService(IMapper mapper, MySQLContext dbContext) {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<bool> AddUserToGroup(AddUserToGroupInput input, int userId) {
            Group? group = await _dbContext.Groups.FirstOrDefaultAsync(g => g.Id == input.GroupId);
            if (group == null) {
                throw new Exception();
            }

            if (group.AccessCode != input.AccessCode) {
                throw new Exception();
            }

            UserGroupRelation relation = new UserGroupRelation {
                GroupId = input.GroupId,
                UserId = userId,
                Type = UserGroupRelationType.VIEWER
            };

            await _dbContext.UserGroupRelations.AddAsync(relation);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<int> Create(CreateGroupInput input, int ownerId) {
            using (var transaction = await _dbContext.Database.BeginTransactionAsync()) {
                try {
                    Group group = _mapper.Map<Group>(input);
                    await _dbContext.Groups.AddAsync(group);
                    await _dbContext.SaveChangesAsync();

                    UserGroupRelation userRelation = new UserGroupRelation() {
                        UserId = ownerId,
                        GroupId = group.Id,
                        Type = UserGroupRelationType.OWNER
                    };
                    await _dbContext.UserGroupRelations.AddAsync(userRelation);
                    await _dbContext.SaveChangesAsync();

                    await transaction.CommitAsync();

                    return group.Id;
                } catch (Exception ex) {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }

        public async Task<bool> Delete(int id) {
            Group? group = await _dbContext.Groups.FirstOrDefaultAsync(g => g.Id == id);
            if (group == null) {
                throw new Exception();
            }

            var userRelations = await _dbContext.UserGroupRelations
                .Where(ugr => ugr.GroupId == id)
                .ToListAsync();
            var subjects = await _dbContext.Subjects
                .Where(s => s.GroupId == id)
                .ToListAsync();
            var hometasks = await _dbContext.Hometasks
                .Join(_dbContext.Subjects.Where(s => s.GroupId == id),
                    h => h.SubjectId,
                    s => s.Id,
                    (h, s) => h)
                .ToListAsync();

            _dbContext.Remove(group);
            _dbContext.Remove(userRelations);
            _dbContext.RemoveRange(subjects);
            _dbContext.RemoveRange(hometasks);
            await _dbContext.SaveChangesAsync();

            return true;
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
