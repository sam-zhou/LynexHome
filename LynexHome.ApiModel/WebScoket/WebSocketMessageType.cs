using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.ApiModel.WebScoket
{
    public enum WebSocketMessageType
    {
        Unknown = 0,

        PiAuthentication = 100,
        PiSiteStatus = 101,
        PiSwitchStatusUpdate = 102,
        PiLiveSwitches = 103,
        PiSwitchLiveUpdate = 104, 

        WebSwitchStatusUpdate = 200,
        WebSwitchLiveUpdate = 201,
        WebSiteEnquire = 202,
        WebSwitchOrderUpdate = 203,
        WebSwitchTimerUpdate = 204,
        WebSwitchSettingUpdate = 205,




        Error = 400,
    }
}
