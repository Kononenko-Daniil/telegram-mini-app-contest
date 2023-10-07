using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server_side.Database;
using server_side.DTOs;
using server_side.Exceptions;
using server_side.Models;

namespace server_side.Services
{
    public class LinkService : ILinkService
    {
        private readonly IMapper _mapper;
        private readonly MySQLContext _dbContext;

        public LinkService(IMapper mapper, MySQLContext dbContext) {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<int> Create(CreateLinkInput input, int groupId) {
            Link link = _mapper.Map<Link>(input);
            link.GroupId = groupId;

            await _dbContext.Links.AddAsync(link);
            await _dbContext.SaveChangesAsync();

            return link.Id;
        }

        public async Task<bool> Delete(int id) {
            Link? link = await _dbContext.Links.FirstOrDefaultAsync(l => l.Id == id);

            if (link == null) {
                throw new NotFoundException();
            }

            _dbContext.Links.Remove(link);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<Link>> GetByGroup(int groupId) {
            var links = await _dbContext.Links.Where(l => l.GroupId == groupId).ToListAsync();

            return links;
        }
    }
}
