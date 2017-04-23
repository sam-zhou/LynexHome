using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.ApiModel
{
    public interface IPiRequestModel
    {
        string RequestType { get; set; }
    }

    public class PiRequestModel: IPiRequestModel
    {
        public string RequestType { get; set; }
    }
}
