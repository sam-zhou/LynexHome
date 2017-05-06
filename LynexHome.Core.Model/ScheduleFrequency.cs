using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.Core.Model
{
    public enum ScheduleFrequency
    {
        Once = 1,
        Daily = 2,
        Workdays = 3,
        Weekends = 4,
        Weekly = 10,
        Monthly = 20,
        Quaterly = 25,
        Yearly = 30
    }
}
