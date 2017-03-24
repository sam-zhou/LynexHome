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
    public class SwitchController : ApiController
    {
        private readonly LynexUserManager _userManager;
        private readonly ISiteRepository _siteRepository;
        private readonly IAuthenticationManager _anthenticationManager;
        private readonly ISwitchService _switchService;


        public SwitchController(LynexUserManager userManager, ISiteRepository siteRepository, IAuthenticationManager anthenticationManager, ISwitchService switchService)
        {
            _userManager = userManager;
            _siteRepository = siteRepository;
            _anthenticationManager = anthenticationManager;
            _switchService = switchService;
        }

        [HttpGet]
        public IHttpActionResult Get()
        {

            var userid = User.Identity.GetUserId();


            var user = _userManager.FindById(userid);

            if (user != null)
            {
                var switches = _switchService.GetSwitchesForUserId(userid);

                var obj = new
                {
                    Success = true,
                    Message = "",
                    Results = switches
                };

                return Ok(obj);
            }


            return BadRequest();
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




            _siteRepository.AddSite(site, User.Identity.GetUserId());



            var obj = new
            {
                Success = true,
                Message = "",
            };

            return Ok(obj);



        }

        [HttpPost]
        public IHttpActionResult UpdateStatus(SwitchStatusModel model)
        {
            Thread.Sleep(2000);

            var result = _switchService.UpdateStatus(User.Identity.GetUserId(), model.SwitchId, model.Status);

            var obj = new
            {
                Success = true,
                Message = "",
                Result = result,
            };

            return Ok(obj);
        }
    }
}