using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.ComponentModel;
using Lynex.Extension.Enum;

namespace LynexHome.Core.Model
{
    public enum SwitchType
    {
        [Description("Normal")]
        Normal = 1,

        [Description("PowerMonitoring")]
        PowerMonitoring = 2,

        [Description("TempHumMonitoring")]
        TempHumMonitoring = 3,

        [Description("Safe Valtage")]
        SafeValtage = 4,

        [RuntimeOnly]
        Unknown = 0
    }
}
