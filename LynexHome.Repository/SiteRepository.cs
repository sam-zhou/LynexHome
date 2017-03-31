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
    public class SiteRepository: BaseRepository<Site>, ISiteRepository
    {
        public SiteRepository(DbContext dbContext)
            : base(dbContext)
        {
        }

        public void AddSite(Site site, string userId)
        {
            var user = DbContext.Set<User>().Find(userId);

            if (user != null)
            {
                user.Sites.Add(site);
                DbContext.SaveChanges();
            }
            else
            {
                throw new LynexException(string.Format("User {0} does not exists", userId));
            }
            
        }

        public void UpdateSite(Site site)
        {
            var existSite = DbContext.Set<Site>().Find(site.Id);

            if (existSite != null)
            {
                existSite.Name = site.Name;
                existSite.Postcode = site.Postcode;
                existSite.State = site.State;
                existSite.Suburb = site.Suburb;
                existSite.Address = site.Address;
                DbContext.SaveChanges();

            }
            else
            {
                throw new LynexException(string.Format("Site {0} does not exists", site.Id));
            }
            
        }


        public void DeleteSite(string siteId)
        {
            var existSite = DbContext.Set<Site>().Find(siteId);

            if (existSite != null)
            {
                DbContext.Set<Site>().Remove(existSite);
                DbContext.SaveChanges();
            }
            else
            {
                throw new LynexException(string.Format("Site {0} does not exists", siteId));
            }
            
        }

        public IList<Site> GetUserSites(string userId)
        {
            var user = DbContext.Set<User>().Find(userId);

            if (user != null)
            {
                return user.Sites.OrderBy(q => q.CreatedDateTime).ToList();
            }
            else
            {
                throw new LynexException(string.Format("User {0} does not exists", userId));
            }
            
        }

        public void SetDefault(string siteId, string userId)
        {
            var user = DbContext.Set<User>().Find(userId);

            if (user != null)
            {
                if (user.Sites.All(q => q.Id != siteId))
                {
                    throw new LynexException(string.Format("Site {0} does not belongs to user {1}", siteId, userId));
                }

                foreach (var site in user.Sites)
                {
                    if (site.Id != siteId)
                    {
                        if (site.IsDefault)
                        {
                            site.IsDefault = false;
                            DbContext.Entry(site).State = EntityState.Modified;
                            DbContext.Set<Site>().Attach(site);
                            DbContext.Entry(site).Property("IsDefault").IsModified = true;
                        }
                    }
                    else
                    {
                        if (!site.IsDefault)
                        {
                            site.IsDefault = true;
                            DbContext.Entry(site).State = EntityState.Modified;
                            DbContext.Set<Site>().Attach(site);
                            DbContext.Entry(site).Property("IsDefault").IsModified = true;
                        }
                    }
                }
                DbContext.SaveChanges();
            }
            else
            {
                throw new LynexException(string.Format("User {0} does not exists", userId));
            }
        }
    }
}
