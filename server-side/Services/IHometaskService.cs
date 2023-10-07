using server_side.DTOs;
using server_side.Models;

namespace server_side.Services
{
    public interface IHometaskService
    {
        public Task<IEnumerable<Hometask>> GetByGroup(int groupId);
        public Task<IEnumerable<Hometask>> GetBySubject(int subjectId);
        public Task<Hometask> GetById(int id);
        public Task<int> Create(CreateHometaskInput input, int subjectId);
        public Task<bool> Delete(int id);
    }
}
