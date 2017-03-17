

using Microsoft.AspNet.Identity;

namespace Lynex.Notification.Common.Model
{
    public abstract class NotificationModel : INotificationModel
    {
        public string Template { get; private set; }

        public string Body { get; protected set; }

        protected NotificationModel(string template)
        {
            Template = template;
        }
    }
}
