using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Web.WebSockets;

namespace LynexHome.Web.WebScokets
{
    public static class WebSocketConnectionManager
    {
        private static ConcurrentDictionary<string, WebSocketCollection> _sockets = new ConcurrentDictionary<string, WebSocketCollection>();

        public static WebSocketCollection GetSocketById(string id)
        {
            return _sockets.FirstOrDefault(p => p.Key == id).Value;
        }

        public static ConcurrentDictionary<string, WebSocketCollection> GetAll()
        {
            return _sockets;
        }

        public static string GetId(WebSocketCollection socket)
        {
            return _sockets.FirstOrDefault(p => p.Value == socket).Key;
        }
        public static void AddSocket(string siteId, WebSocketCollection socketCollection)
        {
            _sockets.TryAdd(siteId, socketCollection);
        }

        public static void RemoveSocket(string id)
        {
            WebSocketCollection socket;
            _sockets.TryRemove(id, out socket);
        }
    }
}
