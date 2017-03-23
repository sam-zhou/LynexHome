using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using LynexHome.Core;
using LynexHome.Core.Model;
using LynexHome.Repository.Interface;
using LynexHome.ViewModel;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;

namespace LynexHome.Web.Api
{
    [Authorize]
    public class SwitchController : ApiController
    {
        private readonly LynexUserManager _userManager;
        private readonly ISiteRepository _siteRepository;
        private readonly IAuthenticationManager _anthenticationManager;


        public SwitchController(LynexUserManager userManager, ISiteRepository siteRepository, IAuthenticationManager anthenticationManager)
        {
            _userManager = userManager;
            _siteRepository = siteRepository;
            _anthenticationManager = anthenticationManager;
        }

        [HttpGet]
        // GET api/Me
        public IHttpActionResult Get()
        {

            var userid = User.Identity.GetUserId();


            var user = _userManager.FindById(userid);

            if (user != null && user.Sites.Any())
            {
                var results = new List<SwitchViewModel>();

                foreach (var site in user.Sites)
                {
                    foreach (var theSwitch in site.Switches)
                    {
                        results.Add(new SwitchViewModel(theSwitch));
                    }
                }

                var obj = new
                {
                    Success = true,
                    Message = "",
                    Results = results
                };

                return Ok(obj);
            }


            return BadRequest();
        }


        // GET api/Me
        public IHttpActionResult AddNew(string name)
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



            var obj = new
            {
                Success = true,
                Message = "",
            };

            return Ok(obj);



        }
    }
}