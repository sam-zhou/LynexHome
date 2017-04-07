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
    public class WallController : ApiController
    {
        private readonly LynexUserManager _userManager;
        private readonly IAuthenticationManager _anthenticationManager;
        private readonly IWallService _wallService;


        public WallController(LynexUserManager userManager, IAuthenticationManager anthenticationManager, IWallService wallService)
        {
            _userManager = userManager;
            _anthenticationManager = anthenticationManager;
            _wallService = wallService;
        }


        [HttpPost]
        public IHttpActionResult UpdateWall(WallUpdateModel model)
        {
            _wallService.UpdateWall(model, User.Identity.GetUserId());

            return Ok();
        }

        [HttpPost]
        public IHttpActionResult CreateWall(WallUpdateModel model)
        {
            var result = _wallService.CreateWall(model);

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