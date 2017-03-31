using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lynex.Common.Exception;
using LynexHome.Repository.Interface;
using LynexHome.Service.Interface;
using LynexHome.ViewModel;
using Microsoft.AspNet.Identity;

namespace LynexHome.Service
{
    public interface ISiteService : IService
    {
        List<SiteViewModel> GetSitesForUserId(string userId);

        SiteViewModel GetSite(string siteId, string userId);

        void SetDefault(string siteId, string userId);
    }

    public class SiteService : ISiteService
    {
        private readonly ISiteRepository _siteRepository;

        public SiteService(ISiteRepository siteRepository)
        {
            _siteRepository = siteRepository;
        }

        public List<SiteViewModel> GetSitesForUserId(string userId)
        {
            var sites = _siteRepository.GetUserSites(userId);

            var output = new List<SiteViewModel>();

            foreach (var site in sites)
            {
                var siteViewModel = new SiteViewModel(site);

                if (site.IsDefault)
                {
                    foreach (var @switch in site.Switches)
                    {
                        siteViewModel.SwitchViewModels.Add(new SwitchViewModel(@switch));
                    }

                    foreach (var wall in site.Walls)
                    {
                        siteViewModel.WallViewModels.Add(new WallViewModel(wall));
                    }
                }

                output.Add(siteViewModel);
            }
            return output;
        }

        public SiteViewModel GetSite(string siteId, string userId)
        {
            var site = _siteRepository.Get(siteId);

            if (site == null)
            {
                throw new LynexException(string.Format("Site {0} not exists",siteId));
            }
            else if (site.UserId != userId)
            {
                throw new LynexException(string.Format("User {0} does not have permissions on Site {1}", userId, siteId));
            }
            else
            {
                var output = new SiteViewModel(site);
                foreach (var @switch in site.Switches)
                {
                    output.SwitchViewModels.Add(new SwitchViewModel(@switch));
                }

                foreach (var wall in site.Walls)
                {
                    output.WallViewModels.Add(new WallViewModel(wall));
                }
                return output;
            }
        }

        public void SetDefault(string siteId, string userId)
        {
            _siteRepository.SetDefault(siteId, userId);
        }
    }
}
