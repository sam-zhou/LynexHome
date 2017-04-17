using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model.Attributes;

namespace LynexHome.Core.Model
{
    public partial class Wall : BaseEntity
    {
        public int X { get; set; }

        public int Y { get; set; }

        public double Length { get; set; }

        public int Angle { get; set; }

        public WallType Type { get; set; }

        [Required, DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [SqlDefaultValue("GETUTCDATE()")]
        public DateTime CreatedDateTime { get; set; }

        [Required, DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [SqlDefaultValue("GETUTCDATE()")]
        public DateTime UpdatedDateTime { get; set; }

        public string SiteId { get; set; }

        public virtual Site Site { get; set; }
    }
}
