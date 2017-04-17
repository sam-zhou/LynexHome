using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lynex.Common.Exception;
using LynexHome.Core.Model;
using LynexHome.Repository.Interface;
using LynexHome.Service.Interface;
using LynexHome.ViewModel;
using Microsoft.AspNet.Identity;

namespace LynexHome.Service
{
    public interface ISwitchService : IService
    {
        List<SwitchViewModel> GetSwitches(string userId, string siteId);

        SwitchViewModel GetSwitch(string userId, string switchId);

        SimplifiedSwitchModel GetSimplifiedSwitch(string userId, string switchId);

        bool UpdateStatus(string userId, string switchId, bool status);

        bool UpdateStatus(string switchId, string siteId, string serialNumber, bool status);

        bool UpdateOrder(string userId, string switchId, int order);
    }

    public class SwitchService : ISwitchService
    {
        private readonly ISwitchRepository _switchRepository;
        private readonly ISwitchEventRepository _switchEventRepository;

        public SwitchService(ISwitchRepository switchRepository, ISwitchEventRepository switchEventRepository)
        {
            _switchRepository = switchRepository;
            _switchEventRepository = switchEventRepository;
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

        public SimplifiedSwitchModel GetSimplifiedSwitch(string userId, string switchId)
        {
            var result = _switchRepository.Get(switchId);

            if (result.Site.UserId == userId)
            {
                return new SimplifiedSwitchModel(result);
            }

            throw new LynexException(string.Format("User does not have permission on Switch {0}", switchId));

        }

        public SwitchViewModel GetSwitch(string userId, string switchId)
        {
            var result = _switchRepository.Get(switchId);

            if (result.Site.UserId == userId)
            {
                return new SwitchViewModel(result);
            }

            throw new LynexException(string.Format("User does not have permission on Switch {0}", switchId));

        }

        public bool UpdateStatus(string userId, string switchId, bool status)
        {
            var @switch = _switchRepository.Get(switchId);

            if (@switch.Site.UserId != userId)
            {
                throw new LynexException(string.Format("User {0} does not have permission over Switch {1}", userId, switchId));
            }

            var switchEvent = new SwitchEvent
            {
                Processed = false,
                Status = status,
                SwitchId = switchId,
                SiteId = @switch.SiteId
            };

            //_switchEventRepository.AddEvent(switchEvent);

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
