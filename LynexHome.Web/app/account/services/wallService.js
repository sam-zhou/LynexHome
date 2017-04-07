lynex.factory("wallService", ["$http", 'settings', 'apiService', '$rootScope', function ($http, settings, api, $rootScope) {

    var wallService = {
        updateWall: function(wallId, x, y, length, angle, siteId) {
            var updateWallModel = {
                WallId: wallId,
                X: Math.round(x),
                Y: Math.round(y),
                Length: length,
                Angle: angle,
                SiteId: siteId
            };

            return api.postData("wall", "updateWall", updateWallModel);
        },

        createWall: function (siteId, x, y, length, angle) {
            var createWallModel = {
                SiteId: siteId,
                X: x,
                Y: y,
                Length: length,
                Angle: angle
            };

            return api.postData("wall", "updateWall", createWallModel);
        },
    }


    return wallService;
}]);