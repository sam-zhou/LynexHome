using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.ViewModel
{
    public class WebSocketResultViewModel
    {
        public int StatusCode { get; set; }

        public string Message { get; set; }

        public object Result { get; set; }

    }
}
