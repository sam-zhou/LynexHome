using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.Web.WebScokets.MessageHandler
{
    public interface IMessageHandler
    {
        string ProcessMessage(string message);
    }
}
