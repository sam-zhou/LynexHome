using System;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using LynexHome.Core;
using LynexHome.Core.Model;
using LynexHome.Repository.Interface;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace LynexHome.Web.Controllers
{
    [Authorize]
    public class MeController : ApiController
    {
        private readonly LynexUserManager _userManager;
        private readonly ISiteRepository _siteRepository;


        public MeController(LynexUserManager userManager, ISiteRepository siteRepository)
        {
            _userManager = userManager;
            _siteRepository = siteRepository;
        }


        // GET api/Me
        public bool Get(string name)
        {
            
            var site = new Site
            {
                Address = "11 Braceby Close",
                Country = "Australia",
                CreatedDateTime = DateTime.UtcNow,
                Name = name,
                Postcode = "6155",
                State = "WA",
                Suburb = "Willetton",
                UpdatedDateTime = DateTime.UtcNow,
            };




            _siteRepository.AddSite(site, User.Identity.GetUserId());



            return true;



        }
    }
}