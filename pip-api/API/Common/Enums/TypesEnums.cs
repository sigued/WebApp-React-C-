using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Common.Enums
{
    public enum AppEmailType
    {
        AccountCreation = 1,
        PasswordRecovery = 2,
        UserIdRecovery = 3
    }

    public enum AppRolesType
    {
        admin,
        sadmin,
        member
    }

    public enum CorrelationType
    {
        Equation,
        Abaque
    }
    public enum AppSubscriptionType
    {
        creation,
        update
    }
}
