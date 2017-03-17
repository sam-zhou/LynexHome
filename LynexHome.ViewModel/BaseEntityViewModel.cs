using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.ViewModel
{
    public class BaseEntityViewModel<TEntity, TKey> where TEntity : BaseEntity<TKey>
    {

        public BaseEntityViewModel(TEntity data)
        {
            var convertProperties = TypeDescriptor.GetProperties(typeof(TEntity)).Cast<PropertyDescriptor>().ToList();
            var entityProperties = TypeDescriptor.GetProperties(GetType()).Cast<PropertyDescriptor>().ToList();

            

            foreach (var entityProperty in entityProperties)
            {
                var property = entityProperty;
                var convertProperty = convertProperties.FirstOrDefault(prop => prop.Name == property.Name);
                if (convertProperty != null)
                {
                    convertProperty.SetValue(this, Convert.ChangeType(entityProperty.GetValue(data), convertProperty.PropertyType));
                }
            }
        }
    }

    public class BaseEntityViewModel<TEntity> : BaseEntityViewModel<TEntity, string> where TEntity : BaseEntity
    {
        public BaseEntityViewModel(TEntity data) : base(data)
        {
        }
    }
}
