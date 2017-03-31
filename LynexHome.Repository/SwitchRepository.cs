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

        public IList<Switch> GetSwitches(string userId, string siteId)
        {
            var site = DbContext.Set<Site>().Find(siteId);

            if (site == null)
            {
                throw new LynexException(string.Format("Site {0} does not exists", siteId));
            }
            else if (site.UserId != userId)
            {
                throw new LynexException(string.Format("User {0} does not match Site {1}", userId, siteId));
            }
            else
            {
                return site.Switches.ToList();

            }
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

        public bool UpdateOrder(string userId, string switchId, int order)
        {
            
            var theSwitch = DbContext.Set<Switch>().Find(switchId);

            if (theSwitch != null)
            {
                if (theSwitch.Order != order)
                {
                    if (theSwitch.Site.UserId == userId)
                    {
                        var switches = theSwitch.Site.Switches.OrderBy(q => q.Order).ToList();

                        if (order > theSwitch.Order)
                        {
                            for (var i = theSwitch.Order + 1; i <= order; i++)
                            {
                                switches[i].Order = switches[i].Order - 1;
                                DbContext.Entry(switches[i]).State = EntityState.Modified;
                                DbContext.Set<Switch>().Attach(switches[i]);
                                DbContext.Entry(switches[i]).Property("Order").IsModified = true;
                            }
                        }
                        else
                        {
                            for (var i = order; i <= theSwitch.Order - 1; i++)
                            {
                                switches[i].Order = switches[i].Order + 1;
                                DbContext.Entry(switches[i]).State = EntityState.Modified;
                                DbContext.Set<Switch>().Attach(switches[i]);
                                DbContext.Entry(switches[i]).Property("Order").IsModified = true;
                            }
                        }


                        theSwitch.Order = order;
                        DbContext.Entry(theSwitch).State = EntityState.Modified;
                        DbContext.Set<Switch>().Attach(theSwitch);
                        DbContext.Entry(theSwitch).Property("Order").IsModified = true;
                        DbContext.SaveChanges();
                        return true;
                    }
                    else
                    {
                        throw new LynexException(string.Format("User {0} does not permission to operate Switch {1}",
                            userId, switchId));
                    }
                }
                else
                {
                    return true;
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
