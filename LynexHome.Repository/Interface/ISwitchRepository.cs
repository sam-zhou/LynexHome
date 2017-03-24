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
        IQueryable<Switch> GetUserSwitches(string userId);

        void AddSwitch(Switch theSwitch, string siteId);

        void UpdateSwitch(Switch theSwitch);

        void DeleteSwitch(string switchId);

        bool UpdateStatus(string userId, string switchId, bool status);
    }
}
