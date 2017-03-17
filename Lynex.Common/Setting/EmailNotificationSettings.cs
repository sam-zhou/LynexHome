using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lynex.Common.Setting
{
    public class EmailNotificationSettings: IEmailNotificationSettings
    {
        public string Server { get; private set; }
        public int Port { get; private set; }
        public string User { get; private set; }
        public string Password { get; private set; }
        public string Sender { get; private set; }
        public FormatType Type { get; private set; }

        public EmailNotificationSettings(string server, int port, string user, string password, string sender,
            FormatType type = FormatType.Html)
        {
            Server = server;
            Port = port;
            User = user;
            Password = password;
            Sender = sender;
            Type = type;
        }
    }
}
