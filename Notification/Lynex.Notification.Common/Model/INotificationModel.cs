using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;


namespace Lynex.Notification.Common.Model
{
    public interface INotificationModel
    {
        string Template { get;  }

        string Body { get;  }
    }
}
