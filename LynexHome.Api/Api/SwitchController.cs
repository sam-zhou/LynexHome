﻿using System.Linq;
using System.Threading;
using System.Web.Http;
using LynexHome.ApiModel;
using LynexHome.Core;
using LynexHome.Service;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;

namespace LynexHome.Api.Api
{
    [Authorize]
    public class SwitchController : ApiController
    {
        private readonly LynexUserManager _userManager;
        private readonly IAuthenticationManager _anthenticationManager;
        private readonly ISwitchService _switchService;


        public SwitchController(LynexUserManager userManager, IAuthenticationManager anthenticationManager, ISwitchService switchService)
        {
            _userManager = userManager;
            _anthenticationManager = anthenticationManager;
            _switchService = switchService;
        }

        [HttpPost]
        public IHttpActionResult Get(QuerySiteModel model)
        {
            //Thread.Sleep(2000);
            var userid = User.Identity.GetUserId();

            var switches = _switchService.GetSwitches(userid, model.SiteId).OrderBy(q => q.Order);

            var obj = new
            {
                Success = true,
                Message = "",
                Results = switches
            };
            return Ok(obj);
        }

        [HttpPost]
        public IHttpActionResult UpdateStatus(SwitchStatusModel model)
        {
            //Thread.Sleep(2000);

            var result = _switchService.UpdateStatus(User.Identity.GetUserId(), model.SwitchId, model.Status);

            var obj = new
            {
                Success = true,
                Message = "",
                Result = result,
            };

            return Ok(obj);
        }

        [HttpPost]
        public IHttpActionResult UpdateOrder(SwitchOrderModel model)
        {
            //Thread.Sleep(2000);

            var result = _switchService.UpdateOrder(User.Identity.GetUserId(), model.SwitchId, model.Order);

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