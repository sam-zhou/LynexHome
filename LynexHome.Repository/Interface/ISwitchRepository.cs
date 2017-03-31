using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.Repository.Interface
{
    public interface ISwitchRepository : IRepository<Switch>
    {
        IList<Switch> GetSwitches(string userId, string siteId);

        void AddSwitch(Switch theSwitch, string siteId);

        void UpdateSwitch(Switch theSwitch);

        void DeleteSwitch(string switchId);

        bool UpdateStatus(string userId, string switchId, bool status);

        bool UpdateOrder(string userId, string switchId, int order);
    }
}
