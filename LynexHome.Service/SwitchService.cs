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
        List<SwitchViewModel> GetSwitchesForUserId(string userId);

        bool UpdateStatus(string userId, string switchId, bool status);
    }

    public class SwitchService : ISwitchService
    {
        private readonly ISwitchRepository _switchRepository;

        public SwitchService(ISwitchRepository switchRepository)
        {
            _switchRepository = switchRepository;
        }

        public List<SwitchViewModel> GetSwitchesForUserId(string userId)
        {
            var results = _switchRepository.GetUserSwitches(userId);

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
    }
}
