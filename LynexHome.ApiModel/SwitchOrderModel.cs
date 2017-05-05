using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.ApiModel
{
    public class SwitchOrderModel
    {
        public string SwitchId { get; set; }

        public string SiteId { get; set; }

        public int Order { get; set; }

        public string ClientWebSocketId { get; set; }
    }
}
