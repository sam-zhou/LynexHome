using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.ViewModel
{
    public abstract class BaseEntityViewModel<TEntity>
    {

        protected BaseEntityViewModel()
        {
            
        }

        protected BaseEntityViewModel(TEntity data)
        {
            var entityProperties = TypeDescriptor.GetProperties(typeof(TEntity)).Cast<PropertyDescriptor>().ToList();
            var convertProperties = TypeDescriptor.GetProperties(GetType()).Cast<PropertyDescriptor>().ToList();

            

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
}
