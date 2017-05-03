using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.ApiModel.WebScoket
{
    public enum WebSocketMessageType
    {
        PiAuthentication = 100,
        PiSiteStatus = 101,
        PiSwitchStatusUpdate = 102,
        PiLiveSwitches = 103,

        WebSwitchStatusUpdate = 200,
        WebSwitchLiveUpdate = 201,
        WebSiteEnquire = 202,
    }
}
