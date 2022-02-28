

namespace API.Common.Enums
{
    public enum SubscriptionStatus
    {
        PendingStart = 0,    
        Active = 1,   
        Expired = 2,    
        Blocked = 3,      
    }

    public enum AppEmailStatus
    {
        PendingUse = 0,
        Used = 1,
        Expired = 2,
        Canceled = 3
    }

    public enum OrderStatus
    {
        Pendig,
        Processing,
        Error,
        Completed,
    }
    
    public enum AppUserStatus
    {
        Inactive,
        Active
    }
}
