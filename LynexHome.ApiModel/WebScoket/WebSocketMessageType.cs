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
        SwitchStatusUpdate = 1,
        SwitchLiveUpdate = 2,
        SiteEnquire = 3,
    }

    
}
