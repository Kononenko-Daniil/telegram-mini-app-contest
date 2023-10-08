using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server_side.Database;
using server_side.DTOs;
using server_side.Exceptions;
using server_side.Models;

namespace server_side.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly IMapper _mapper;
        private readonly MySQLContext _dbContext;

        public SubjectService(IMapper mapper, MySQLContext dbContext) {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<int> Create(CreateSubjectInput input, int groupId) {
            Subject subject = _mapper.Map<Subject>(input);
            subject.GroupId = groupId;

            await _dbContext.Subjects.AddAsync(subject);
            await _dbContext.SaveChangesAsync();

            return subject.Id;
        }

        public async Task Delete(int id) {
            Subject? subject = await _dbContext.Subjects.FirstOrDefaultAsync(s => s.Id == id);
            if (subject == null) {
                throw new Exception();
            }

            var subjectHometasks = await _dbContext.Hometasks
                .Where(h => h.SubjectId == id)
                .ToListAsync();

            _dbContext.Subjects.Remove(subject);
            _dbContext.RemoveRange(subjectHometasks);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Subject>> GetByGroup(int groupId) {
            var subjects = await _dbContext.Subjects.Where(s => s.GroupId == groupId).ToListAsync();

            return subjects;
        }

        public async Task<Subject> GetById(int id) {
            var subject = await _dbContext.Subjects.FirstOrDefaultAsync(s => s.Id == id);

            if (subject == null) {
                throw new NotFoundException();
            }

            return subject;
        }
    }
}
