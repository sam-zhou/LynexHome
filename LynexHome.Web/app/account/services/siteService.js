lynex.factory("siteService", ["$http", 'settings', 'apiService', '$rootScope', function ($http, settings, api, $rootScope) {

    var site = null;

    var siteService = {
        setSelectedSite: function(selectedSite) {
            site = selectedSite;
            //$rootScope.$broadcast('selectedSite', selectedSite);
        },

        getSelectedSite: function() {
            return site;
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
    }


    return siteService;
}]);