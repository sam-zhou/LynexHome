using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.Core.Model
{
    public class Switch : BaseEntity
    {
        public virtual string Name { get; set; }

        public virtual bool Status { get; set; }

        public virtual bool X { get; set; }

        public virtual bool Y { get; set; }

        public virtual SwitchType Type { get; set; }

        public virtual DateTime CreatedDateTime { get; set; }

        public virtual DateTime UpdatedDateTime { get; set; }
    }
}
