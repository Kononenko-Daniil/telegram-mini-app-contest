using AutoMapper;
using server_side.DTOs;
using server_side.Models;
using System.Globalization;

namespace server_side.Profiles
{
    public class HometaskProfile : Profile
    {
        public HometaskProfile()
        {
            CreateMap<CreateHometaskInput, Hometask>();
        }
    }
}
