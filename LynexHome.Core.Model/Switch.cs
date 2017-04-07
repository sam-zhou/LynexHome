using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.Core.Model
{
    public partial class Switch : BaseEntity
    {

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        public bool Status { get; set; }

        [Required]
        public int X { get; set; }

        [Required]
        public int Y { get; set; }

        [Required]
        public SwitchType Type { get; set; }

        [StringLength(20)]
        public string Mac { get; set; }


        public int Order { get; set; }

        [Required]
        public DateTime CreatedDateTime { get; set; }

        [Required]
        public DateTime UpdatedDateTime { get; set; }


        public string SiteId { get; set; }

        public virtual Site Site { get; set; }
    }
}
