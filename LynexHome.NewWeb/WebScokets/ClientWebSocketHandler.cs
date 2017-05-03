using LynexHome.ApiModel;
using LynexHome.ApiModel.WebScoket;
using LynexHome.Core;
using LynexHome.Core.Model;
using Newtonsoft.Json;
using System.Data.Entity;

namespace LynexHome.NewWeb.WebScokets
{
    public sealed class ClientWebSocketHandler : LynexWebSocketHandler
    {
        public ClientWebSocketHandler(string siteId)
            : base(siteId, false)
        {
            
        }

        public override void OnMessage(string message)
        {
            var websocketMessage = JsonConvert.DeserializeObject<WebSocketMessage>(message);

            if (websocketMessage != null) {
                var updatingSwitch = websocketMessage.Message;

                using (var dbcontext = new LynexDbContext()) {
                    var @switch = dbcontext.Set<Switch>().Find(updatingSwitch.id.ToString());

                    if (@switch != null) {
                        @switch.Status = (bool)updatingSwitch.status;

                        dbcontext.Entry(@switch).State = EntityState.Modified;
                        dbcontext.Set<Switch>().Attach(@switch);
                        dbcontext.Entry(@switch).Property("Status").IsModified = true;
                        dbcontext.SaveChanges();
                        WebSocketSession.Broadcast(JsonConvert.SerializeObject(updatingSwitch));
                    }
                }
            }

        }

    }
}
