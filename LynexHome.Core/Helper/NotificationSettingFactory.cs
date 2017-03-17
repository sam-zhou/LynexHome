using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;
using Lynex.Common.Setting;
using Lynex.Notification.SMS;

namespace LynexHome.Core.Helper
{
    public static class NotificationSettingFactory
    {
        public static ISMSNotificationSettings GetSMSNotificationSettings()
        {
            return new SMSNotificationSettings(WebConfigurationManager.AppSettings["SMSServer"],
                WebConfigurationManager.AppSettings["SMSUser"], WebConfigurationManager.AppSettings["SMSPassword"],
                WebConfigurationManager.AppSettings["SMSSender"], WebConfigurationManager.AppSettings["SMSSenderName"]);
        }

        public static IEmailNotificationSettings GetEmailNotificationSettings()
        {
            return new EmailNotificationSettings(WebConfigurationManager.AppSettings["EmailServer"],
                int.Parse(WebConfigurationManager.AppSettings["EmailPort"]),
                WebConfigurationManager.AppSettings["EmailUser"], WebConfigurationManager.AppSettings["EmailPassword"],
                WebConfigurationManager.AppSettings["EmailSender"]);
        }
    }
}
