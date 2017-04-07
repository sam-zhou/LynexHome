using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.ViewModel
{
    public class RsaKeyPair
    {
        public string PublicKey { get; set; }

        public string PrivateKey { get; set; }

        public RsaKeyPair(string publicKey, string privateKey)
        {
            PublicKey = publicKey;
            PrivateKey = privateKey;
        }
    }
}
