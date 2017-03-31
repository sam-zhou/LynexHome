lynex.factory("switchService", ["$http", 'settings', 'apiService', function ($http, settings, api) {

    

    var switchService = {
        getSwitches: function(siteId) {

            return api.postData("switch", "get", { SiteId: siteId });
        },

        updateStatus: function(switchId, status) {

            var updateStatus = {
                SwitchId: switchId,
                Status: status
            };

            return api.postData("switch", "updateStatus", updateStatus);
        },

        updateOrder: function(switchId, order) {

            var updateOrder = {
                SwitchId: switchId,
                Order: order
            };

            return api.postData("switch", "updateOrder", updateOrder);
        }
    }


    return switchService;
}]);