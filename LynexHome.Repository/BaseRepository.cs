using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace LynexHome.Repository
{
    public interface IRepository
    {
        void Save();
    }


    public interface IRepository<T> : IRepository where T : class
    {
        IQueryable<T> GetAll();
        T Get(object identity);
        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        void Delete(T entity);
        void Edit(T entity);
        void Update(T entity);
    }

    public abstract class BaseRepository<T> : IRepository<T> where T : class
    {
        protected readonly DbContext DbContext;

        protected BaseRepository(DbContext dbContext)
        {
            DbContext = dbContext;
        }
        public virtual IQueryable<T> GetAll()
        {

            IQueryable<T> query = DbContext.Set<T>();
            return query;
        }

        public T Get(object identity)
        {
            return DbContext.Set<T>().Find(identity);
        }

        public IQueryable<T> FindBy(Expression<Func<T, bool>> predicate)
        {

            IQueryable<T> query = DbContext.Set<T>().Where(predicate);
            return query;
        }

        public virtual void Add(T entity)
        {
            DbContext.Set<T>().Add(entity);
        }

        public virtual void Delete(T entity)
        {
            DbContext.Set<T>().Remove(entity);
        }

        public virtual void Edit(T entity)
        {
            DbContext.Entry(entity).State = EntityState.Modified;
        }



        public virtual void Update(T entity)
        {

            var entityProperties = entity.GetType().GetProperties();

            DbContext.Entry(entity).State = EntityState.Modified;
            DbContext.Set<T>().Attach(entity);

            foreach (var ep in entityProperties)
            {
                if (ep.Name != "Id")
                {
                    try
                    {
                        DbContext.Entry(entity).Property(ep.Name).IsModified = true;
                    }
                    catch (Exception ex)
                    {

                    }
                    
                }
                
            }
        }

        public virtual void Save()
        {
            DbContext.SaveChanges();
        }
    }
}
