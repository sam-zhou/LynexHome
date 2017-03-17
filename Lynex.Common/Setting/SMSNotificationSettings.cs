using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lynex.Common.Setting
{
    public class SMSNotificationSettings : ISMSNotificationSettings
    {
        public string Server { get; private set; }
        public string User { get; private set; }
        public string Password { get; private set; }
        public string Sender { get; private set; }
        public string SenderName { get; private set; }
        public FormatType Type { get; private set; }

        public SMSNotificationSettings(string server, string user, string password, string sender, string senderName, FormatType type = FormatType.Raw)
        {
            Server = server;
            User = user;
            Password = password;
            Sender = sender;
            SenderName = senderName;
            Type = type;
        }
    }
}
