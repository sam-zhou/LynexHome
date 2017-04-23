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
    public partial class Icon : BaseEntity<int>
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public override int Id { get; set; }
        
        [Required]
        public string Url { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
