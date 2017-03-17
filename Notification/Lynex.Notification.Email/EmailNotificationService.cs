using System;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Lynex.Common.Setting;
using Lynex.Notification.Common;
using Lynex.Notification.Email.Model;
using Microsoft.AspNet.Identity;

namespace Lynex.Notification.Email
{
    public interface IEmailNotificationService : INotificationService
    {
        
    }

    public class EmailNotificationService : NotificationService<EmailModel>, IEmailNotificationService
    {
        private readonly IEmailNotificationSettings _setting;

        public EmailNotificationService(IEmailNotificationSettings setting)
            : base(setting.Type)
        {
            _setting = setting;
        }



        public override Task SendAsync(IdentityMessage message)
        {
            var item = FormatProvider.GetFormattedModel();

            try
            {
                using (var client = new SmtpClient())
                {
                    client.Port = _setting.Port;
                    client.Host = _setting.Server;
                    client.EnableSsl = true;
                    client.Timeout = 10000;
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(_setting.User, _setting.Password);

                    var mailMessage = new MailMessage(_setting.Sender, message.Destination, message.Subject, message.Body)
                    {
                        IsBodyHtml = item.IsHtml,
                        BodyEncoding = Encoding.UTF8,
                        DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure
                    };

                    client.Send(mailMessage);
                }
                return Task.FromResult(true);
            }
            catch (Exception ex)
            {
                return Task.FromResult(false);
            }
        }
    }
}
