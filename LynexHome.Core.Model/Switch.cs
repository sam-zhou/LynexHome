using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model.Attributes;

namespace LynexHome.Core.Model
{
    public partial class Switch : BaseEntity
    {
        public Switch()
        {
            SwitchEvents = new HashSet<SwitchEvent>();
        }

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
        public string ChipId { get; set; }


        public int Order { get; set; }

        [Required, DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [SqlDefaultValue("GETUTCDATE()")]
        public DateTime CreatedDateTime { get; set; }

        [Required, DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [SqlDefaultValue("GETUTCDATE()")]
        public DateTime UpdatedDateTime { get; set; }


        public string SiteId { get; set; }

        public virtual Site Site { get; set; }

        [Required]
        public int IconId { get; set; }

        public virtual Icon Icon { get; set; }

        public string IconName
        {
            get { return Icon.Name; }
        }

        public string IconUrl
        {
            get { return Icon.Url; }
        }



        public virtual ICollection<SwitchEvent> SwitchEvents { get; set; }
    }
}
