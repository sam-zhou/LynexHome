using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Lynex.Common.Crypto;
using LynexHome.Service.Interface;
using LynexHome.ViewModel;
using Newtonsoft.Json;

namespace LynexHome.Service
{
    public interface ICryptoService : IService
    {
        RsaKeyPair GetKeyPair(int length);

        string Encrypt(string plainText, string key);

        string Decrypt(string cypherText, string key);
    }

    public class CryptoService : ICryptoService
    {
        public RsaKeyPair GetKeyPair(int length)
        {
            using (var csp = new RSACryptoServiceProvider(2048))
            {
                var privateKey = csp.ExportParameters(true);
                var publicKey = csp.ExportParameters(false);

                var serializablePrivateKey = new RSAParametersSerializable(privateKey);
                var serializablePublicKey = new RSAParametersSerializable(publicKey);

                return new RsaKeyPair(JsonConvert.SerializeObject(serializablePublicKey), JsonConvert.SerializeObject(serializablePrivateKey));
            }
        }

        //private string GetStringKey(RSAParameters key)
        //{
        //    var stringKey = JsonConvert.SerializeObject(key, );

        //    return stringKey;
        //    ////we need some buffer
        //    //using (var sw = new System.IO.StringWriter())
        //    //{
        //    //    //we need a serializer
        //    //    var xs = new System.Xml.Serialization.XmlSerializer(typeof (RSAParameters));
        //    //    //serialize the key into the stream
        //    //    xs.Serialize(sw, key);
        //    //    //get the string from the stream
        //    //    return sw.ToString();
        //    //}
        //}

        private RSAParameters GetRSAParameters(string stringkey)
        {
            var serializablekey = JsonConvert.DeserializeObject<RSAParametersSerializable>(stringkey);

            return serializablekey.RSAParameters;

            ////get a stream from the string
            //var sr = new System.IO.StringReader(stringkey);
            ////we need a deserializer
            //var xs = new System.Xml.Serialization.XmlSerializer(typeof(RSAParameters));
            ////get the object back from the stream
            //return (RSAParameters)xs.Deserialize(sr);
        }

        public string Encrypt(string plainText, string key)
        {
            var csp = new RSACryptoServiceProvider();
            csp.ImportParameters(GetRSAParameters(key));
            //for encryption, always handle bytes...
            var bytesPlainTextData = Encoding.Unicode.GetBytes(plainText);

            //apply pkcs#1.5 padding and encrypt our data 
            var bytesCypherText = csp.Encrypt(bytesPlainTextData, false);

            //we might want a string representation of our cypher text... base64 will do
            var cypherText = Convert.ToBase64String(bytesCypherText);
            return cypherText;
        }

        public string Decrypt(string cypherText, string key)
        {
            /*
       * some transmission / storage / retrieval
       * 
       * and we want to decrypt our cypherText
       */

            //first, get our bytes back from the base64 string ...
            var bytesCypherText = Convert.FromBase64String(cypherText);

            //we want to decrypt, therefore we need a csp and load our private key
            var csp = new RSACryptoServiceProvider();
            csp.ImportParameters(GetRSAParameters(key));

            //decrypt and strip pkcs#1.5 padding
            var bytesPlainText = csp.Decrypt(bytesCypherText, false);

            //get our original plainText back...
            var plainText = Encoding.Unicode.GetString(bytesPlainText);
            return plainText;
        }
    }
}
