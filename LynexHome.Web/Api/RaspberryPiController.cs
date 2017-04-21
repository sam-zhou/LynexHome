using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.WebSockets;
using Lynex.Extension;
using LynexHome.ApiModel;
using LynexHome.Core;
using LynexHome.Core.Model;
using LynexHome.Repository.Interface;
using LynexHome.Service;
using LynexHome.ViewModel;
using LynexHome.Web.WebScokets;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System.Collections.Concurrent;
using Microsoft.Web.WebSockets;
using Newtonsoft.Json;


namespace LynexHome.Web.Api
{
    [AllowAnonymous]
    public class RaspberryPiController : ApiController
    {
        private readonly ISiteService _siteService;
        private readonly ICryptoService _cryptoService;
        private readonly ISwitchService _switchService;
        private readonly WebSocketSessionCollection _wsSessionCollection;


        public RaspberryPiController(ISiteService siteService, ICryptoService cryptoService, ISwitchService switchService, WebSocketSessionCollection wsSessionCollection)
        {
            _siteService = siteService;
            _cryptoService = cryptoService;
            _switchService = switchService;
            _wsSessionCollection = wsSessionCollection;
        }

        [HttpPost]
        public IHttpActionResult GetKeyPair(KeyPairGenerateModel model)
        {
            var keyPair = _cryptoService.GetKeyPair(model.Length);

            var obj = new
            {
                Success = true,
                Message = "",
                PublicKey = keyPair.PublicKey,
                PrivateKey = keyPair.PrivateKey
            };
            return Ok(obj);
        }

        [HttpPost]
        public IHttpActionResult EncryptMessage(EncryptMessageModel model)
        {
            var cypherText = _cryptoService.Encrypt(model.Message, model.Key);
            var obj = new
            {
                Success = true,
                Message = "",
                Result = cypherText
            };
            return Ok(obj);
        }


        [HttpPost]
        public IHttpActionResult GetSwitchStatuses(SwitchEnquireModel model)
        {
            var serverSecret = _siteService.GetSecret(model.SiteId);

            var decryptedSerialNumber = _cryptoService.Decrypt(model.EncryptedSerialNumber, serverSecret);

            var result = _siteService.GetSiteBySerialNumber(model.SiteId, decryptedSerialNumber);

            var obj = new
            {
                Success = true,
                Message = "",
                Result = result
            };
            return Ok(obj);
        }

        [HttpPost]
        public IHttpActionResult UpdateStatus(EncryptedSwitchStatusModel model)
        {
            var serverSecret = _siteService.GetSecret(model.SiteId);

            var message = _cryptoService.Decrypt(model.Message, serverSecret);

            var item = JsonConvert.DeserializeObject<DecryptedSwitchStatusModel>(message);

            var result =_switchService.UpdateStatus(item.SwitchId, model.SiteId, item.SerialNumber, item.Status);

            var obj = new
            {
                Success = true,
                Message = "",
                Result = result
            };

            return Ok(obj);
        }

        [HttpGet]
        public HttpResponseMessage WebSocket(string siteId, string salt, string md5)
        {
            if (HttpContext.Current.IsWebSocketRequest)
            {
                var secret = _siteService.GetSecret(siteId);
                var queryStr = "siteid=" + siteId + "&salt=" + salt + "&secret=" + secret;
                var calculatedMd5 = queryStr.GetMD5();
                if (string.Equals(md5,calculatedMd5, StringComparison.CurrentCultureIgnoreCase))
                {
                    HttpContext.Current.AcceptWebSocketRequest(new PiWebSocketHandler(siteId));
                }
                else
                {
                    return new HttpResponseMessage(HttpStatusCode.Unauthorized);
                }
            }
            return new HttpResponseMessage(HttpStatusCode.SwitchingProtocols);
        }
    }
}