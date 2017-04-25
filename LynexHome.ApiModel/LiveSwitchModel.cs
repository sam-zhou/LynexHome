using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.ApiModel
{
    public class LiveSwitchModel : PiRequestModel
    {
        public List<SwitchStatusModel> LiveSwitches { get; set; }
    }
}
