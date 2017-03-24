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

namespace LynexHome.Repository
{
    public class SwtichRepository : BaseRepository<Switch>, ISwitchRepository
    {
        public SwtichRepository(DbContext dbContext)
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

        public bool UpdateStatus(string userId, string switchId, bool status)
        {
            var theSwitch = DbContext.Set<Switch>().Find(switchId);

            if (theSwitch != null)
            {
                if (theSwitch.Site.UserId == userId)
                {
                    if (theSwitch.Status != status)
                    {
                        theSwitch.Status = status;
                        DbContext.Entry(theSwitch).State = EntityState.Modified;
                        DbContext.Set<Switch>().Attach(theSwitch);

                        DbContext.Entry(theSwitch).Property("Status").IsModified = true;
                        DbContext.SaveChanges();
                    }
                    return status;
                }
                else
                {
                    throw new LynexException(string.Format("User {0} does not permission to operate Switch {1}", userId, switchId));
                }
                
            }
            else
            {
                throw new LynexException(string.Format("Switch {0} does not exists", switchId));
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
