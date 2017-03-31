using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Http;
using LynexHome.ApiModel;
using LynexHome.Core;
using LynexHome.Core.Model;
using LynexHome.Repository.Interface;
using LynexHome.Service;
using LynexHome.ViewModel;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;

namespace LynexHome.Web.Api
{
    [Authorize]
    public class SiteController : ApiController
    {
        private readonly LynexUserManager _userManager;
        private readonly ISiteService _siteService;


        public SiteController(LynexUserManager userManager, ISiteService siteService)
        {
            _userManager = userManager;
            _siteService = siteService;
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            Thread.Sleep(2000);

            var userid = User.Identity.GetUserId();

            var sites = _siteService.GetSitesForUserId(userid);

            var obj = new
            {
                Success = true,
                Message = "",
                Results = sites
            };

            return Ok(obj);
        }

        [HttpPost]
        public IHttpActionResult GetSite(QuerySiteModel model)
        {
            Thread.Sleep(2000);

            var userid = User.Identity.GetUserId();

            var result = _siteService.GetSite(model.SiteId, userid);

            var obj = new
            {
                Success = true,
                Message = "",
                Result = result
            };

            return Ok(obj);
        }

        [HttpPost]
        public IHttpActionResult SetAsDefault(QuerySiteModel model)
        {
            Thread.Sleep(2000);

            var userid = User.Identity.GetUserId();

            _siteService.SetDefault(model.SiteId, userid);

            var obj = new
            {
                Success = true,
                Message = "",
            };

            return Ok(obj);
        }


        public IHttpActionResult AddNew(string name)
        {
            
            var site = new Site
            {
                Address = "11 Braceby Close",
                Country = "Australia",
                CreatedDateTime = DateTime.UtcNow,
                Name = name,
                Postcode = "6155",
                State = "Western Australia",
                Suburb = "Willetton",
                UpdatedDateTime = DateTime.UtcNow,
            };

            //_siteService.AddSite(site, User.Identity.GetUserId());

            var obj = new
            {
                Success = true,
                Message = "",
            };

            return Ok(obj);
        }
    }
}