using server_side.DTOs;
using server_side.Models;

namespace server_side.Services
{
    public interface ILinkService
    {
        public Task<IEnumerable<Link>> GetByGroup(int groupId);
        public Task<int> Create(CreateLinkInput input, int groupId);
        public Task<bool> Delete(int id);
    }
}
