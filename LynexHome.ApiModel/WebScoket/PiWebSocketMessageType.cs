using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.ApiModel.WebScoket
{
    public enum PiWebSocketMessageType
    {
        Unknown = 0,
        Authentication = 1,
        SiteStatus = 2,
        SwitchUpdate = 3,
        LiveSwitches = 4,
    }
}
