common.factory('dataStorageService', [

    function () {
        $.jStorage.reInit();

        // define keys here
        var userIdKey = "UserId";
        var selectedSiteKey = "selectedSite";


        // not to delete
        var persistKeys = [
            userIdKey
        ];

        // clears on logout and new login
        var sensitiveKeys = [
            selectedSiteKey

        ];

        var userKeys = [
            selectedSiteKey
        ];

        function clear(keys) {
            for (var i = 0; i < keys.length; i++) {
                $.jStorage.deleteKey(keys[i]);
            }
        }

        var dataStorageService = {

            initForUser: function (userId) {
                var lastUserId = $.jStorage.get(userIdKey, -1);

                if (lastUserId != userId) {
                    clear(userKeys);
                    clear(sensitiveKeys);
                }

                $.jStorage.set(userIdKey, userId);
            },

            clearSensitiveData: function () {
                clear(sensitiveKeys);
            },

            getSelectedSite: function () {
                return $.jStorage.get(selectedSiteKey, undefined);
            },

            setSelectedSite: function (data) {
                $.jStorage.set(selectedSiteKey, data);
            },

        };

        return dataStorageService;
    }
]);