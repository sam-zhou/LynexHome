using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lynex.Common.Exception
{
    public class LynexException: System.Exception
    {
        public LynexException(string message):base(message)
        {
            
        }

        public LynexException(string message, System.Exception exception)
            : base(message, exception)
        {
            
        }

        public LynexException() : base()
        {
            
        }
    }
}
