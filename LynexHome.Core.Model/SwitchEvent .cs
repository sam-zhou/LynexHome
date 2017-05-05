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
    public partial class SwitchEvent : BaseEntity<long>
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public override long Id { get; set; }

        

        [Required]
        public bool Status { get; set; }

        [Required]
        public bool Live { get; set; }

        [Required, DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [SqlDefaultValue("GETUTCDATE()")]
        public DateTime CreatedDateTime { get; set; }

        [Required]
        public bool Processed { get; set; }

        public DateTime? ProcessedDateTime { get; set; }


        public virtual Switch Switch { get; set; }

        public virtual Site Site { get; set; }

        [Required]
        public string SwitchId { get; set; }

        [Required]
        public string SiteId { get; set; }
    }
}
