using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lynex.Extension
{
    public static class StringExtension
    {
        public static string GenerateMACAddress()
        {
            var sBuilder = new StringBuilder();
            var r = new Random();
            for (var i = 0; i < 6; i++)
            {
                var number = r.Next(0, 255);
                var b = Convert.ToByte(number);
                if (i == 0)
                {
                    b = SetBit(b, 6); //--> set locally administered
                    b = UnsetBit(b, 7); // --> set unicast 
                }
                sBuilder.Append(number.ToString("X2"));
            }
            return sBuilder.ToString().ToUpper();
        }

        private static byte SetBit(byte b, int bitNumber)
        {
            if (bitNumber < 8 && bitNumber > -1)
            {
                return (byte)(b | (byte)(0x01 << bitNumber));
            }
            else
            {
                throw new InvalidOperationException(
                "Der Wert für BitNumber " + bitNumber + " war nicht im zulässigen Bereich! (BitNumber = (min)0 - (max)7)");
            }
        }

        private static byte UnsetBit(byte b, int bitNumber)
        {
            if (bitNumber < 8 && bitNumber > -1)
            {
                return (byte)(b | (byte)(0x00 << bitNumber));
            }
            else
            {
                throw new InvalidOperationException(
                "Der Wert für BitNumber " + bitNumber + " war nicht im zulässigen Bereich! (BitNumber = (min)0 - (max)7)");
            }
        }

        public static string CreateMD5(string input)
        {
            // Use input string to calculate MD5 hash
            using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
            {
                var inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
                var hashBytes = md5.ComputeHash(inputBytes);

                // Convert the byte array to hexadecimal string
                var sb = new StringBuilder();
                for (var i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("X2"));
                }
                return sb.ToString();
            }
        }
    }
}
