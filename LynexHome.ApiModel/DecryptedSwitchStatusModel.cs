using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.ApiModel
{
    public class DecryptedSwitchStatusModel
    {
        public DateTime TimeStamp { get; set; }

        public string SwitchId { get; set; }

        public string SerialNumber { get; set; }

        public string Mac { get; set; }

        public bool Status { get; set; }
    }
}
