using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.Repository.Interface
{
    public interface ISwitchEventRepository : IRepository<SwitchEvent>
    {
        SwitchEvent AddEvent(SwitchEvent wall);

        void ProcessedEvent(long switchEventId);
    }
}
