using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.Core.Model
{
    public class BaseEntity<TKey>
    {
        public virtual TKey Id { get; set; }
    }

    public class BaseEntity : BaseEntity<string>
    {
        public BaseEntity()
        {
            Id = Guid.NewGuid().ToString();
        } 
    }
}
