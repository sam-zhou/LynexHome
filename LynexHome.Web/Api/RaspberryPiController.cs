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
using Newtonsoft.Json;

namespace LynexHome.Web.Api
{
    [AllowAnonymous]
    public class RaspberryPiController : ApiController
    {
        private readonly ISiteService _siteService;
        private readonly ICryptoService _cryptoService;
        private readonly ISwitchService _switchService;


        public RaspberryPiController(ISiteService siteService, ICryptoService cryptoService, ISwitchService switchService)
        {
            _siteService = siteService;
            _cryptoService = cryptoService;
            _switchService = switchService;
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
    }
}