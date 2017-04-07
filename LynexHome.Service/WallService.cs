using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lynex.Common.Exception;
using LynexHome.ApiModel;
using LynexHome.Core.Model;
using LynexHome.Repository.Interface;
using LynexHome.Service.Interface;
using LynexHome.ViewModel;
using Microsoft.AspNet.Identity;

namespace LynexHome.Service
{
    public interface IWallService : IService
    {
        WallViewModel GetWall(string wallId);

        void UpdateWall(WallUpdateModel wall, string userId);

        WallViewModel CreateWall(WallUpdateModel wall);

        void DeleteWall(WallUpdateModel wall, string userId);
    }

    public class WallService : IWallService
    {
        private readonly IWallRepository _wallRepository;

        public WallService(IWallRepository wallRepository)
        {
            _wallRepository = wallRepository;
        }

        public WallViewModel GetWall(string wallId)
        {
            var theWall = _wallRepository.Get(wallId);
            if (theWall != null)
            {
                return new WallViewModel(theWall);
            }
            return null;
        }

        public void UpdateWall(WallUpdateModel wall, string userId)
        {
            var theWall = _wallRepository.Get(wall.WallId);
            if (theWall != null)
            {
                if (theWall.SiteId != wall.SiteId)
                {
                    throw new LynexException(string.Format("Wall {0} does not belong to Site {1}", wall.WallId, wall.SiteId));
                }

                if (theWall.Site.UserId != userId)
                {
                    throw new LynexException(string.Format("User {0} does not have permission on Wall {1}", userId, wall.WallId));
                }

                theWall.X = wall.X;
                theWall.Y = wall.Y;
                theWall.Length = wall.Length;
                theWall.Angle = wall.Angle;
                theWall.Type = wall.Type;
                _wallRepository.UpdateWall(theWall);
                _wallRepository.Save();
            }
            else
            {
                throw new LynexException(string.Format("Wall {0} does not exist", wall.WallId));
            }
        }

        public WallViewModel CreateWall(WallUpdateModel wall)
        {
            var theWall = new Wall();
            theWall.X = wall.X;
            theWall.Y = wall.Y;
            theWall.Length = wall.Length;
            theWall.Angle = wall.Angle;
            theWall.Type = wall.Type;
            theWall.CreatedDateTime = DateTime.UtcNow;
            theWall.UpdatedDateTime = DateTime.UtcNow;
            return new WallViewModel(_wallRepository.AddWall(theWall, wall.SiteId));
        }

        public void DeleteWall(WallUpdateModel wall, string userId)
        {
            var theWall = _wallRepository.Get(wall.WallId);
            if (theWall != null)
            {
                if (theWall.SiteId != wall.SiteId)
                {
                    throw new LynexException(string.Format("Wall {0} does not belong to Site {1}", wall.WallId, wall.SiteId));
                }

                if (theWall.Site.UserId != userId)
                {
                    throw new LynexException(string.Format("User {0} does not have permission on Wall {1}", userId, wall.WallId));
                }

                _wallRepository.Delete(theWall);
                _wallRepository.Save();
            }
            else
            {
                throw new LynexException(string.Format("Wall {0} does not exist", wall.WallId));
            }
        }
    }
}
