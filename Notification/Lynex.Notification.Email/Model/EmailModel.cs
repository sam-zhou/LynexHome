using Lynex.Notification.Common.Model;
using Microsoft.AspNet.Identity;

namespace Lynex.Notification.Email.Model
{
    public class EmailModel : NotificationModel, IEmailModel
    {
        public string CC { get; set; }

        public string BCC { get; set; }

        public string Subject { get; set; }

        public bool IsHtml { get; set; }

        public EmailModel(string template)
            : base(template)
        {
            Body = template;
        }
    }
}
