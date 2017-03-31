using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
            return _switchRepository.UpdateStatus(userId, switchId, status);
        }

        public bool UpdateOrder(string userId, string switchId, int order)
        {
            return _switchRepository.UpdateOrder(userId, switchId, order);
        }
    }
}
