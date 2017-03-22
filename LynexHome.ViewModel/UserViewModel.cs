using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.ViewModel
{
    [DataContract]
    public class UserViewModel : BaseEntityViewModel<User>
    {
        public UserViewModel(string username)
        {
            Name = username;
        }

        public UserViewModel(User user) : base(user)
        {

        }

        [DataMember]
        public string Id { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Email { get; set; }

        [DataMember]
        public string Phone { get; set; }

        public static UserViewModel Guest
        {
            get { return new UserViewModel("Guest"); }
        }
    }
}
