using AutoMapper;
using server_side.DTOs;
using System.Globalization;

namespace server_side.Models
{
    public class UserGroupRelationProfile : Profile
    {
        public UserGroupRelationProfile()
        {
            CreateMap<UserGroupRelation, UserGroupInfo>()
                .ForMember(dest => dest.IsOwner,
                    opt => opt.MapFrom(src => src.Type == Types.Enums.UserGroupRelationType.OWNER))
                .ForMember(dest => dest.CanEdit,
                    opt => opt.MapFrom(src => src.Type == Types.Enums.UserGroupRelationType.OWNER || 
                        src.Type == Types.Enums.UserGroupRelationType.EDITOR));
        }
    }
}
