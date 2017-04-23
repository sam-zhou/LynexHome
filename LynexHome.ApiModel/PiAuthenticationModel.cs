using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.ApiModel
{
    public class PiAuthenticationModel: IPiRequestModel
    {
        public string AuthType { get; set; }

        public string RequestType { get; set; }

        public string Rnd { get; set; }

        public string SiteId { get; set; }

        public string Code { get; set; }
    }
}
