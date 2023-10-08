using server_side.DTOs;
using server_side.Models;

namespace server_side.Services
{
    public interface ISubjectService
    {
        public Task<IEnumerable<Subject>> GetByGroup(int groupId);
        public Task<Subject> GetById(int id);
        public Task<int> Create(CreateSubjectInput input, int groupId);
        public Task Delete(int id);
    }
}
