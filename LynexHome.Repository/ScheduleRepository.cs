using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lynex.Common.Exception;
using LynexHome.Core;
using LynexHome.Core.Model;
using LynexHome.Repository.Interface;
using System.Linq.Expressions;

namespace LynexHome.Repository
{
    public class ScheduleRepository : BaseRepository<Schedule>, IScheduleRepository
    {
        public ScheduleRepository(DbContext dbContext)
            : base(dbContext)
        {
        }

        public List<Schedule> GetSchedules(string switchId)
        {
            return DbContext.Set<Schedule>().Where(q => q.SwitchId == switchId).ToList();
        }
    }
}
