using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lynex.Common.Extension;
using LynexHome.Core.Model;

namespace LynexHome.ViewModel
{
    public class SwitchViewModel : BaseEntityViewModel<Switch>
    {
        public SwitchViewModel(Switch data) : base(data)
        {
        }

        public string Id { get; set; }


        public string Name { get; set; }

        public bool Status { get; set; }

        public int X { get; set; }

        public int Y { get; set; }

        public int Order { get; set; }

        public SwitchType Type { get; set; }

        public DateTime CreatedDateTime { get; set; }

        public DateTime UpdatedDateTime { get; set; }
    }
}
