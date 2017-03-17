using System.Threading.Tasks;
using Lynex.Common.Setting;
using Lynex.Notification.Common;
using Lynex.Notification.SMS.Model;
using Microsoft.AspNet.Identity;

namespace Lynex.Notification.SMS
{
    public interface ISMSNotificationService : INotificationService
    {
        
    }

    public class SMSNotificationService : NotificationService<SMSModel>, ISMSNotificationService
    {
        private readonly ISMSNotificationSettings _settings;

        public SMSNotificationService(ISMSNotificationSettings settings)
            : base(settings.Type)
        {
            _settings = settings;
        }


        public override Task SendAsync(IdentityMessage message)
        {
            return Task.FromResult(true);
        }
    }
}
