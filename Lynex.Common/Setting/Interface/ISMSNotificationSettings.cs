using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lynex.Common.Setting
{
    public interface ISMSNotificationSettings : INotificationSettings
    {
        string Server { get; }

        string User { get; }

        string Password { get; }

        string Sender { get; }

        string SenderName { get; }

        FormatType Type { get; }
    }
}
