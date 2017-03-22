using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.Repository.Interface
{
    public interface ISwitchRepository
    {
        void AddSwitch(Switch theSwitch, string siteId);

        void UpdateSwitch(Switch theSwitch);

        void DeleteSwitch(string switchId);
    }
}
