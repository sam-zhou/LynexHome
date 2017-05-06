using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.Repository.Interface
{
    public interface IScheduleRepository : IRepository<Schedule>
    {
        List<Schedule> GetSchedules(string switchId);
    }
}
