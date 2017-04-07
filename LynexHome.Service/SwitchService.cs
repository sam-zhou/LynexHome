using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lynex.Common.Exception;
using LynexHome.Repository.Interface;
using LynexHome.Service.Interface;
using LynexHome.ViewModel;
using Microsoft.AspNet.Identity;

namespace LynexHome.Service
{
    public interface ISwitchService : IService
    {
        List<SwitchViewModel> GetSwitches(string userId, string siteId);

        bool UpdateStatus(string userId, string switchId, bool status);

        bool UpdateStatus(string switchId, string siteId, string serialNumber, bool status);

        bool UpdateOrder(string userId, string switchId, int order);
    }

    public class SwitchService : ISwitchService
    {
        private readonly ISwitchRepository _switchRepository;

        public SwitchService(ISwitchRepository switchRepository)
        {
            _switchRepository = switchRepository;
        }

        public List<SwitchViewModel> GetSwitches(string userId, string siteId)
        {
            var results = _switchRepository.GetSwitches(userId, siteId);

            var output = new List<SwitchViewModel>();

            foreach (var @switch in results)
            {
                output.Add(new SwitchViewModel(@switch));
            }

            return output;

        }

        public bool UpdateStatus(string userId, string switchId, bool status)
        {
            var @switch = _switchRepository.Get(switchId);

            if (@switch.Site.UserId != userId)
            {
                throw new LynexException(string.Format("User {0} does not have permission over Switch {1}", userId, switchId));
            }

            return _switchRepository.UpdateStatus(switchId, status);
        }

        public bool UpdateStatus(string switchId, string siteId, string serialNumber, bool status)
        {
            var @switch = _switchRepository.Get(switchId);

            if (@switch.Site.Id != siteId)
            {
                throw new LynexException(string.Format("Site {0} does not have permission over Switch {1}", siteId, switchId));
            }

            if (@switch.Site.SerialNumber != serialNumber)
            {
                throw new LynexException(string.Format("Site {0} serial number does not match", siteId));
            }

            return _switchRepository.UpdateStatus(switchId, status);
        }

        public bool UpdateOrder(string userId, string switchId, int order)
        {
            return _switchRepository.UpdateOrder(userId, switchId, order);
        }
    }
}
