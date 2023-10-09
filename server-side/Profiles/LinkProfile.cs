using AutoMapper;
using server_side.DTOs;
using server_side.Models;

namespace server_side.Profiles
{
    public class LinkProfile : Profile
    {
        public LinkProfile()
        {
            CreateMap<CreateLinkInput, Link>();
        }
    }
}
