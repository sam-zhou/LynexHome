using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lynex.Common.Setting
{
    public interface IEmailNotificationSettings : INotificationSettings
    {
        string Server { get; }

        int Port { get; }

        string User { get; }

        string Password { get; }

        string Sender { get; }

        FormatType Type { get; }
    }
}
