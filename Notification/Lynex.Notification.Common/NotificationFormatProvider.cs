using System;
using Lynex.Common;
using Lynex.Notification.Common.Model;
using Microsoft.AspNet.Identity;

namespace Lynex.Notification.Common
{
    public interface INotificationFormatProvider<out TModel> where TModel : class, INotificationModel
    {
        TModel GetFormattedModel();
    }

    public class NotificationFormatProvider<TModel> : INotificationFormatProvider<TModel> where TModel : class, INotificationModel
    {
        private readonly ITemplateProvider _templateProvider;

        public NotificationFormatProvider(FormatType formatType)
        {
            _templateProvider = new TemplateProvider(typeof(TModel), formatType);          
        }

        public TModel GetFormattedModel()
        {
            var template = _templateProvider.GetTemplate();
            var output = (TModel)Activator.CreateInstance(typeof(TModel), template);
            return output;
        }
    }
}
