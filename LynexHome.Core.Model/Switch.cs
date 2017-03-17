using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.Core.Model
{
    public partial class Switch : BaseEntity
    {
        public string Name { get; set; }

        public bool Status { get; set; }

        public bool X { get; set; }

        public bool Y { get; set; }

        public SwitchType Type { get; set; }

        public DateTime CreatedDateTime { get; set; }

        public DateTime UpdatedDateTime { get; set; }

        public string SiteId { get; set; }

        public virtual Site Site { get; set; }
    }
}
