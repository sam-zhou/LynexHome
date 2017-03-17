using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.ViewModel
{
    public class SiteViewModel:BaseEntityViewModel<Site>
    {
        public SiteViewModel(Site data) : base(data)
        {
            Walls = new List<WallViewModel>();
            Switches = new List<SwitchViewModel>();
        }

        public string Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string State { get; set; }

        public string Postcode { get; set; }

        public string Country { get; set; }

        public DateTime UpdatedDateTime { get; set; }

        public DateTime CreatedDateTime { get; set; }

        public IList<WallViewModel> Walls { get; set; }

        public IList<SwitchViewModel> Switches { get; set; } 
    }
}
