lynex.factory("siteService", ["$http", 'settings', 'apiService', '$rootScope', 'dataStorageService', function ($http, settings, api, $rootScope, dataStorageService) {

    var siteService = {
        setSelectedSite: function(selectedSite) {
            dataStorageService.setSelectedSite(selectedSite);
            //$rootScope.$broadcast('selectedSite', selectedSite);
        },

        getSelectedSite: function() {
            return dataStorageService.getSelectedSite();
        },

        getSites: function() {
            return api.getData("site", "get");
        },

        setDefault: function (siteId) {

            return api.postData("site", "SetAsDefault", { SiteId: siteId });
        },


        getSite: function (siteId) {

            return api.postData("site", "getSite", { SiteId: siteId });
        },

        saveMap: function (siteId, walls) {

            var param = {
                Id: siteId,
                WallViewModels: [
                ]
            };

            angular.forEach(walls, function(value, key) {

                if (value.isDirty) {
                    param.WallViewModels.push({
                        X: Math.round(value.x),
                        Y: Math.round(value.y),
                        Length: value.length,
                        Angle: value.angle,
                        Id: value.id,
                        SiteId: siteId,
                        IsDirty: true,
                        IsDelete: value.isDelete,
                        Type: value.type
                    });
                }


            });


            return api.postData("site", "saveMap", param);
        },

        deleteWall: function (wallId, siteId) {
            var deleteWallModel = {
                WallId: wallId,
                SiteId: siteId
            };

            return api.postData("site", "DeleteWall", deleteWallModel);
        }
    }


    return siteService;
}]);