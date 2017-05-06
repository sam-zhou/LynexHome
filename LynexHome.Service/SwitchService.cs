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

        List<ScheduleViewModel> GetSchedules(string userId, string switchId);

        ScheduleViewModel AddSchedule(string userId, ScheduleViewModel model);
        ScheduleViewModel UpdateSchedule(string userId, ScheduleViewModel model);

        void DeleteSchedule(string userId, ScheduleViewModel model);
    }

    public class SwitchService : ISwitchService
    {
        private readonly ISwitchRepository _switchRepository;
        private readonly IScheduleRepository _scheduleRepository;
        private readonly ISwitchEventRepository _switchEventRepository;

        public SwitchService(ISwitchRepository switchRepository, IScheduleRepository scheduleRepository,ISwitchEventRepository switchEventRepository)
        {
            _switchRepository = switchRepository;
            _scheduleRepository = scheduleRepository;
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

        public List<ScheduleViewModel> GetSchedules(string userId, string switchId)
        {
            //var result = _scheduleRepository.GetSchedules(switchId);
            var @switch = _switchRepository.Get(switchId);
            if (@switch.Site.UserId == userId)
            {
                var output = new List<ScheduleViewModel>();
                var schedules = @switch.Schedules;
                foreach (var schedule in schedules)
                {
                    output.Add(new ScheduleViewModel(schedule));
                }
                return output;
            }
            else
            {
                throw new LynexException(string.Format("User {0} does not have permission on switch {1}", userId,
                    switchId));
            }
        }

        public ScheduleViewModel AddSchedule(string userId, ScheduleViewModel model)
        {
            var @switch = _switchRepository.Get(model.SwitchId);

            if (@switch == null)
            {
                throw new LynexException(string.Format("Switch {0} does not exist", model.SwitchId));
            }

            if (@switch.Site.UserId != userId)
            {
                throw new LynexException(string.Format("User {0} does not have permission on Switch {1}", userId,
                    model.SwitchId));
            }

            var schedule = new Schedule();
            schedule.SwitchId = model.SwitchId;
            schedule.Name = model.Name;
            schedule.Length = model.Length;
            schedule.StartTime = model.StartTime;
            schedule.Monday = model.Monday;
            schedule.Tuesday = model.Tuesday;
            schedule.Wednesday = model.Wednesday;
            schedule.Thursday = model.Thursday;
            schedule.Friday = model.Friday;
            schedule.Saturday = model.Saturday;
            schedule.Sunday = model.Sunday;
            schedule.Frequency = model.Frequency;

            _scheduleRepository.Add(schedule);
            _scheduleRepository.Save();

            return new ScheduleViewModel(schedule);
        }

        public ScheduleViewModel UpdateSchedule(string userId, ScheduleViewModel model)
        {
            Schedule schedule = null;
            if (model.Id != 0)
            {
                schedule = _scheduleRepository.Get(model.Id);
            }

            if (schedule == null)
            {
                throw new LynexException(string.Format("Schedule {0} does not exist", model.Id));
            }


            if (schedule.Switch.Site.UserId != userId)
            {
                throw new LynexException(string.Format("User {0} does not have permission on Schedule {1}", userId,
                    model.Id));
            }

            schedule.Name = model.Name;
            schedule.Length = model.Length;
            schedule.StartTime = model.StartTime;
            schedule.Monday = model.Monday;
            schedule.Tuesday = model.Tuesday;
            schedule.Wednesday = model.Wednesday;
            schedule.Thursday = model.Thursday;
            schedule.Friday = model.Friday;
            schedule.Saturday = model.Saturday;
            schedule.Sunday = model.Sunday;
            schedule.Frequency = model.Frequency;

            _scheduleRepository.Update(schedule);
            _scheduleRepository.Save();


            return new ScheduleViewModel(schedule);

        }

        public void DeleteSchedule(string userId, ScheduleViewModel model)
        {
            Schedule schedule = null;
            if (model.Id != 0)
            {
                schedule = _scheduleRepository.Get(model.Id);
            }

            if (schedule == null)
            {
                throw new LynexException(string.Format("Schedule {0} does not exist", model.Id));
            }


            if (schedule.Switch.Site.UserId != userId)
            {
                throw new LynexException(string.Format("User {0} does not have permission on Schedule {1}", userId,
                    model.Id));
            }

            

            _scheduleRepository.Delete(schedule);
            _scheduleRepository.Save();

        }
    }
}
