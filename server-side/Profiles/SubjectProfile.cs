using AutoMapper;
using server_side.DTOs;
using server_side.Models;

namespace server_side.Profiles
{
    public class SubjectProfile : Profile
    {
        public SubjectProfile()
        {
            CreateMap<CreateSubjectInput, Subject>();
        }
    }
}
