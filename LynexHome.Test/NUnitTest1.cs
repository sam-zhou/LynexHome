using System;
using NUnit.Framework;

namespace LynexHome.Test
{
    [TestFixture]
    public class NUnitTest1
    {
        [Test]
        public void TestMethod1()
        {
            var t = 1;

            var p = 2;

            t += p;

            Assert.AreEqual(4, t);
        }
    }
}