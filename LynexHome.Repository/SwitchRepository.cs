using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lynex.Common.Exception;
using LynexHome.Core;
using LynexHome.Core.Model;
using LynexHome.Repository.Interface;

namespace LynexHome.Repository
{
    public class SwtichRepository : BaseRepository, ISwitchRepository
    {
        public SwtichRepository(LynexDbContext dbContext)
            : base(dbContext)
        {
        }

        public IQueryable<Switch> GetUserSwitches(string userId)
        {
            var output = DbContext.Set<Switch>().Where(q => q.Site.UserId == userId);
            
            return output;
        } 

        public void AddSwitch(Switch theSwitch, string siteId)
        {
            var site = DbContext.Set<Site>().Find(siteId);

            if (site != null)
            {
                site.Switches.Add(theSwitch);
                DbContext.SaveChanges();
            }
            else
            {
                throw new LynexException(string.Format("Site {0} does not exists", siteId));
            }
            
        }

        public void UpdateSwitch(Switch theSwitch)
        {
            var existSwitch = DbContext.Set<Switch>().Find(theSwitch.Id);

            if (existSwitch != null)
            {

                DbContext.SaveChanges();
            }
            else
            {
                throw new LynexException(string.Format("Switch {0} does not exists", theSwitch.Id));
            }
            
        }


        public void DeleteSwitch(string switchId)
        {
            var existSwitch = DbContext.Set<Switch>().Find(switchId);

            if (existSwitch != null)
            {
                DbContext.Set<Switch>().Remove(existSwitch);
                DbContext.SaveChanges();
            }
            else
            {
                throw new LynexException(string.Format("Switch {0} does not exists", switchId));
            }
            
        }
    }
}
