lynex.factory("switchService", ["$http", 'settings', 'apiService', function ($http, settings, api) {

    

    var switchService = {
        getSwitches: function () {

            return api.getData("switch", "get");
        },

        updateStatus: function (switchId, status) {

            var updateStatus = {
                SwitchId: switchId,
                Status: status
            };

            return api.postData("switch", "updateStatus", updateStatus);
        }
    }


    return switchService;
}]);