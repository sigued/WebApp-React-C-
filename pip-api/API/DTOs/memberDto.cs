using API.Common.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class MemberDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string MainRole { get; set; }
        public String Profession { get; set; }
        public AppUserStatus Status { get; set; }

        [DataType(DataType.PhoneNumber)]
        [RegularExpression(@"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$", ErrorMessage = "Not a valid phone number")]
        public string PhoneNumber { get; set; }
    }
}
