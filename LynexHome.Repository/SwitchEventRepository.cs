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
    public class SwitchEventRepository : BaseRepository<SwitchEvent>, ISwitchEventRepository
    {
        public SwitchEventRepository(DbContext dbContext)
            : base(dbContext)
        {
        }


        public SwitchEvent AddEvent(SwitchEvent switchEvent)
        {
            try
            {
                var @switch = DbContext.Set<Switch>().Find(switchEvent.SwitchId);

                

                if (@switch != null)
                {
                    if (@switch.SwitchEvents.Any())
                    {

                        DbContext.Set<SwitchEvent>().RemoveRange(@switch.SwitchEvents);
                        //foreach (var theSwitchEvent in @switch.SwitchEvents)
                        //{
                        //    theSwitchEvent.Status = true;
                        //    switchEvent.CreatedDateTime = DateTime.UtcNow;
                        //    DbContext.Entry(switchEvent).State = EntityState.Modified;
                        //    DbContext.Set<SwitchEvent>().Attach(switchEvent);
                        //    DbContext.Entry(switchEvent).Property("Status").IsModified = true;
                        //    DbContext.Entry(switchEvent).Property("CreatedDateTime").IsModified = true;
                        //}
                        DbContext.SaveChanges();
                    }

                    @switch.SwitchEvents.Add(switchEvent);
                    DbContext.SaveChanges();
                    return switchEvent;
                }
                else
                {
                    throw new LynexException(string.Format("Switch {0} does not exists", switchEvent.SwitchId));
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void ProcessedEvent(long switchEventId)
        {
            var switchEvent = DbContext.Set<SwitchEvent>().Find(switchEventId);

            if (switchEvent != null)
            {
                //switchEvent.Processed = true;
                //switchEvent.ProcessedDateTime = DateTime.UtcNow;
                //DbContext.Entry(switchEvent).State = EntityState.Modified;
                //DbContext.Set<SwitchEvent>().Attach(switchEvent);
                //DbContext.Entry(switchEvent).Property("Processed").IsModified = true;
                //DbContext.Entry(switchEvent).Property("ProcessedDateTime").IsModified = true;
                DbContext.Set<SwitchEvent>().Remove(switchEvent);
                DbContext.SaveChanges();
            }
            else
            {
                throw new LynexException(string.Format("SwitchEvent {0} does not exists", switchEventId));
            }
        }
    }
}
