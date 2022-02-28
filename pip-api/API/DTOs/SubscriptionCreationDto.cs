using API.Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class SubscriptionCreationDto
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Required]
        public SubscriptionDuration Duration { get; set; }

        public string Description { get; set; }

        [Required]
        public string CreatedBy { get; set; }
        public string Role { get; set; }
    }
}
