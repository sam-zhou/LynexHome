using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lynex.Common.Exception;
using LynexHome.ApiModel;
using LynexHome.Core.Model;
using LynexHome.Repository.Interface;
using LynexHome.Service.Interface;
using LynexHome.ViewModel;
using Microsoft.AspNet.Identity;

namespace LynexHome.Service
{
    public interface IWebSocketClientService : IService
    {
        
    }

    public class WebSocketClientService : IWebSocketClientService
    {
    }
}
