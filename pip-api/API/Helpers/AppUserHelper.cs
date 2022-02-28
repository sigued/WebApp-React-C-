using API.Common.Enums;
using System.Collections.Generic;

namespace API.Helpers
{
    public static class AppUserHelper
    {
        public static string GetMainRole(this IList<string> roles)
        {
            if (roles.Contains(AppRolesType.sadmin.ToString()))
                return AppRolesType.sadmin.ToString();
            else if(roles.Contains(AppRolesType.admin.ToString()))
                return AppRolesType.admin.ToString();
            return AppRolesType.member.ToString();
        }
    }
}
