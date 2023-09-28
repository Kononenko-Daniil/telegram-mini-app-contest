﻿using server_side.Models;

namespace server_side.Services
{
    public interface IGroupService
    {
        public Task<IEnumerable<Group>> GetUserGroups(int userId);
        public Task<Group> GetById(int id);
        public bool TryGetUserGroupRelation(int userId,
            int groupId,
            out UserGroupRelation? relation);

    }
}