using API.Common.Enums;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class AppUser : IdentityUser<Guid>
    {
        public AppUser()
        {
            Id = Guid.NewGuid();
            UserName = Id.ToString();
            Status = AppUserStatus.Inactive;
        }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public ICollection<AppUserRole> UserRoles { get; set; } // joue le role d<une join table
        public string Profession { get; set; }
        public AppUserStatus Status { get; set; }
    }
}