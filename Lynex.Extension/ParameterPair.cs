using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lynex.Extension
{
    public class Parameter
    {
        public string Name { get; set; }

        public string Value { get; set; }

        public Parameter(string name, string value)
        {
            Name = name;
            Value = value;
        }


        public override string ToString()
        {
            return Name + "=" + Value;
        }
    }

    public class ParameterCollection
    {
        private List<Parameter> _parameters;

        public List<Parameter> Parameters
        {
            get
            {
                if (_parameters == null)
                {
                    _parameters = new List<Parameter>();
                }
                return _parameters;
            }
        }

        public ParameterCollection(string message)
        {
            var parameters = message.Split('&');
            foreach (var parameter in parameters)
            {
                var fields = parameter.Split('=').ToList();
                if (fields.Count == 2)
                {
                    Parameters.Add(new Parameter(fields[0], fields[1]));
                }
            }
        }

        public bool VerifyMessage(string secret)
        {
            var md5Parameter = Parameters.FirstOrDefault(q => q.Name == "md5");
            if (md5Parameter != null)
            {
                var clientParameters = Parameters.Where(q => q.Name != "md5").ToList();
                clientParameters.Add(new Parameter("secret",secret));
                var clientParameterStr = GetStringFromParameters(clientParameters);
                var md5 = clientParameterStr.GetMD5();
                if (String.Equals(md5, md5Parameter.Value, StringComparison.CurrentCultureIgnoreCase))
                {
                    return true;
                }
                return false;
            }
            return false;
        }

        private string GetStringFromParameters(IEnumerable<Parameter> parameters)
        {
            var output = string.Empty;

            foreach (var parameter in parameters)
            {
                if (output == string.Empty)
                {
                    output += parameter.ToString();
                }
                else
                {
                    output += ("&" + parameter);
                }
            }
            return output;
        }

        public override string ToString()
        {
            return GetStringFromParameters(Parameters);
        }
    }
}
