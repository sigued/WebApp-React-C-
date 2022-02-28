using API.DTOs;
using API.Entities;
using API.Helpers;
using AutoMapper;
using System.Linq;

namespace API.Mappers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>().ForMember(dest => dest.MainRole, opt => opt.MapFrom(src => src.UserRoles.Select(r => r.Role.Name).ToList().GetMainRole()));
            CreateMap<AppSubscription, InvitationDto>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.User.UserName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email))
                .ForMember(dest => dest.UserStatusAccount, opt => opt.MapFrom(src => src.User.Status))
                .ForMember(dest => dest.MainRole, opt => opt.MapFrom(src => src.User.UserRoles.Select(r => r.Role.Name).ToList().GetMainRole()));
        }
    }
}
