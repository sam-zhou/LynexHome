using LynexHome.ApiModel;
using Newtonsoft.Json;

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
            var switchUpdatedModel = JsonConvert.DeserializeObject<SwitchUpdatedModel>(message);

            

        }

    }
}
