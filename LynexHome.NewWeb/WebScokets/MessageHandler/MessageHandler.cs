using Newtonsoft.Json;

namespace LynexHome.NewWeb.WebScokets.MessageHandler
{
    public abstract class MessageHandler<TIn> :IMessageHandler
    {
        protected string SiteId { get; private set; }

        protected MessageHandler(string siteId)
        {
            SiteId = siteId;
        }


        protected abstract string ProcessMessage(TIn model);


        public string ProcessMessage(string message)
        {
            var model = JsonConvert.DeserializeObject<TIn>(message);
            if (model != null)
            {
                return ProcessMessage(model);
            }
            return "Can not deserialize object to " + typeof (TIn).FullName;
        }
    }
}
