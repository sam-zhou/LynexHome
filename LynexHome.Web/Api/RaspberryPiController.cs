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
        private readonly WebSocketHandlerManager _wsHandlerManager;


        public RaspberryPiController(ISiteService siteService, ICryptoService cryptoService, ISwitchService switchService, WebSocketHandlerManager wsHandlerManager)
        {
            _siteService = siteService;
            _cryptoService = cryptoService;
            _switchService = switchService;
            _wsHandlerManager = wsHandlerManager;
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
        public HttpResponseMessage WebSocket(string siteId)
        {
            if (HttpContext.Current.IsWebSocketRequest)
            {
                HttpContext.Current.AcceptWebSocketRequest(new WsHandler(siteId));
            }
            return new HttpResponseMessage(HttpStatusCode.SwitchingProtocols);


            
        }


        private async Task ProcessWSMessage1(AspNetWebSocketContext context)
        {
            var socket = context.WebSocket;

            while (true)
            {
                var buffer = new ArraySegment<byte>(new byte[1024]);
                var result = await socket.ReceiveAsync(
                    buffer, CancellationToken.None);
                if (socket.State == WebSocketState.Open)
                {
                    var userMessage = Encoding.UTF8.GetString(
                        buffer.Array, 0, result.Count);

                    try
                    {
                        var model = JsonConvert.DeserializeObject<SwitchEnquireModel>(userMessage);

                        using (var dbContext = new LynexDbContext())
                        {
                            var site = await dbContext.Set<Site>().FindAsync(model.SiteId);

                            var decryptedSerialNumber = _cryptoService.Decrypt(model.EncryptedSerialNumber, site.Secret);

                            if (decryptedSerialNumber == site.SerialNumber)
                            {
                                var siteModel = new SimplifiedSiteModel(site);

                                foreach (var @switch in site.Switches)
                                {
                                    siteModel.SwitchViewModels.Add(new SimplifiedSwitchModel(@switch));
                                }

                                userMessage = JsonConvert.SerializeObject(siteModel);
                            }
                            else
                            {
                                userMessage = "Serial Number does not match";
                            }
                        }

                        
                        
                    }
                    catch (Exception ex)
                    {
                        userMessage = "Does not support";
                    }
                    

                    
                    buffer = new ArraySegment<byte>(
                        Encoding.UTF8.GetBytes(userMessage));
                    await socket.SendAsync(
                        buffer, WebSocketMessageType.Text, true, CancellationToken.None);
                }
                else
                {
                    break;
                }
            }
        }
    }
}