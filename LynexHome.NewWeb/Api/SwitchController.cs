using System.Linq;
using System.Web.Http;
using LynexHome.ApiModel;
using LynexHome.Core;
using LynexHome.Service;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Newtonsoft.Json;
using LynexHome.NewWeb.WebScokets;
using LynexHome.ApiModel.WebScoket;

namespace LynexHome.NewWeb.Api
{
    [Authorize]
    public class SwitchController : ApiController
    {
        private readonly LynexUserManager _userManager;
        private readonly IAuthenticationManager _anthenticationManager;
        private readonly ISwitchService _switchService;
        private readonly ISiteService _siteService;


        public SwitchController(LynexUserManager userManager, IAuthenticationManager anthenticationManager, ISwitchService switchService, ISiteService siteService)
        {
            _userManager = userManager;
            _anthenticationManager = anthenticationManager;
            _switchService = switchService;
            _siteService = siteService;
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

            var @switch = _switchService.GetSimplifiedSwitch(User.Identity.GetUserId(), model.SwitchId);

            var client = LynexWebSocketHandler.GetWebSocketSession(@switch.SiteId);
            if (client != null)
            {
                client.Broadcast(JsonConvert.SerializeObject(@switch));
            }
            

            var obj = new
            {
                Success = true,
                Message = "",
                Results = result,
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

            var client = LynexWebSocketHandler.GetWebSocketSession(model.SiteId);
            if (client != null)
            {
                var webSocketMessage = new WebSocketMessage(WebSocketMessageType.WebSwitchOrderUpdate);
                webSocketMessage.BroadcastType = WebSocketBroadcastType.All;
                webSocketMessage.ClientId = model.ClientWebSocketId;
                webSocketMessage.Message = model;
                client.Broadcast(JsonConvert.SerializeObject(webSocketMessage));
            }

            return Ok(obj);
        }
    }
}