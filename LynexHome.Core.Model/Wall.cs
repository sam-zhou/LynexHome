using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.Core.Model
{
    public class Wall : BaseEntity
    {
        public virtual int StartX { get; set; }

        public virtual int StartY { get; set; }

        public virtual int EndX { get; set; }

        public virtual int EndY { get; set; }

        public virtual WallType Type { get; set; }

        public virtual DateTime CreatedDateTime { get; set; }

        public virtual DateTime UpdatedDateTime { get; set; }
    }
}
