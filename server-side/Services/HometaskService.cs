using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server_side.Database;
using server_side.DTOs;
using server_side.Exceptions;
using server_side.Models;

namespace server_side.Services
{
    public class HometaskService : IHometaskService
    {
        private readonly IMapper _mapper;
        private readonly MySQLContext _dbContext;

        public HometaskService(IMapper mapper, MySQLContext dbContext) {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<int> Create(CreateHometaskInput input, int subjectId) {
            Hometask hometask = _mapper.Map<Hometask>(input);
            hometask.SubjectId = subjectId;

            await _dbContext.Hometasks.AddAsync(hometask);
            await _dbContext.SaveChangesAsync();

            return hometask.Id;
        }

        public async Task Delete(int id) {
            Hometask? hometask = await _dbContext.Hometasks
                .FirstOrDefaultAsync(h => h.Id == id);
            if (hometask == null) {
                throw new NotFoundException();
            }

            _dbContext.Hometasks.Remove(hometask);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Hometask>> GetByGroup(int groupId) {
            var hometasks = await _dbContext.Hometasks
                .Join(_dbContext.Subjects.Where(s => s.GroupId == groupId),
                    h => h.SubjectId,
                    s => s.Id,
                    (h, s) => h)
                .ToListAsync();

            return hometasks;
        }

        public async Task<Hometask> GetById(int id) {
            Hometask? hometask = await _dbContext.Hometasks.FirstOrDefaultAsync(h => h.Id == id);
            if (hometask == null) {
                throw new NotFoundException();
            }

            return hometask;
        }

        public async Task<IEnumerable<Hometask>> GetBySubject(int subjectId) {
            var hometasks = await _dbContext.Hometasks
                .Where(h => h.SubjectId == subjectId)
                .ToListAsync();

            return hometasks;
        }
    }
}
