using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.Core.Model
{
    public partial class Wall : BaseEntity
    {
        public int StartX { get; set; }

        public int StartY { get; set; }

        public int EndX { get; set; }

        public int EndY { get; set; }

        public WallType Type { get; set; }

        public DateTime CreatedDateTime { get; set; }

        public DateTime UpdatedDateTime { get; set; }

        public string SiteId { get; set; }

        public virtual Site Site { get; set; }
    }
}
