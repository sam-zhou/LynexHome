
using System.Threading.Tasks;
using Lynex.Common;
using Lynex.Notification.Common.Model;
using Microsoft.AspNet.Identity;

namespace Lynex.Notification.Common
{
    public interface INotificationService : IIdentityMessageService
    {
        
    }

    public abstract class NotificationService<TModel>: INotificationService where TModel: class, INotificationModel
    {
        protected INotificationFormatProvider<TModel> FormatProvider { get; set; }

        protected NotificationService(FormatType type)
        {
            FormatProvider = new NotificationFormatProvider<TModel>(type);
        }

        public abstract Task SendAsync(IdentityMessage message);
    }
}
