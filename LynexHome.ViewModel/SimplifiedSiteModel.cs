using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.ViewModel
{
    public class SimplifiedSiteModel : BaseEntityViewModel<Site>
    {
        public SimplifiedSiteModel()
        {
            SwitchViewModels = new List<SimplifiedSwitchModel>();

        }

        public SimplifiedSiteModel(Site data)
            : base(data)
        {
            SwitchViewModels = new List<SimplifiedSwitchModel>();
        }

        public string Id { get; set; }

        public IList<SimplifiedSwitchModel> SwitchViewModels { get; set; }
    }
}
