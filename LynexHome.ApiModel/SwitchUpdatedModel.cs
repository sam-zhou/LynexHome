using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.ApiModel
{
    public class SwitchUpdatedModel: PiRequestModel
    {
        public string ChipId { get; set; }

        public bool Status { get; set; }
    }
}
