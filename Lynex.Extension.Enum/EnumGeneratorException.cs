using System;
using System.Runtime.Serialization;

namespace Lynex.Extension.Enum
{
    [Serializable]
    public class EnumGeneratorException : Exception
    {
        public EnumGeneratorException() : base() { }

        public EnumGeneratorException(string message): base(message) { }

        public EnumGeneratorException(string message, Exception innerException): base(message, innerException) { }

        public EnumGeneratorException(SerializationInfo serializationInfo, StreamingContext streamingContext) : base(serializationInfo, streamingContext) { }
    }
}
