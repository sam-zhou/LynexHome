using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.Repository.Interface
{
    public interface ISiteRepository : IRepository<Site>
    {
        void AddSite(Site site, string userId);

        void UpdateSite(Site site);

        void DeleteSite(string siteId);

        IList<Site> GetUserSites(string userId);

        void SetDefault(string siteId, string userId);
    }
}
