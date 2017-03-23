lynex.factory("switchService", ["$http", 'settings', 'apiService', function ($http, settings, api) {

    

    var switchService = {
        getSwitches: function () {

            return api.getData("switch", "get");
        }
    }


    return switchService;
}]);