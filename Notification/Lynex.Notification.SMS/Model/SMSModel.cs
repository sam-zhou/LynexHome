using Lynex.Notification.Common.Model;
using Microsoft.AspNet.Identity;

namespace Lynex.Notification.SMS.Model
{
    public class SMSModel : NotificationModel, ISMSModel
    {
        public SMSModel(string template)
            : base(template)
        {
            
        }
        
    }
}
