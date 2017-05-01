common.factory("apiService", ["$http", 'settings', function ($http, settings) {

    var uri = settings.apiUri;

    var apiService = {
        url: uri,

        postData: function (controller, action, data) {
            return $http(
            {
                url: uri + '/' + controller + "/" + action,
                method: "POST",
                cache: false,
                data: data,
            }).then(function (response) {
                return response.data;
            });
        },
        getData: function (controller, action, data) {
            return $http(
            {
                url: uri + '/' + controller + "/" + action,
                method: "GET",
                cache: false,
                data: data ? JSON.stringify(data) : null,
            }).then(function (response) {
                return response.data;
            });
        },

        getDataWithParams: function (controller, action, params) {

            var paramNameValues = getParamValues(params);

            return $http(
            {
                url: uri + '/' + controller + "/" + action + '/' + paramNameValues,
                method: "GET",
                cache: false,
            }).then(function (response) {
                return response.data;
            });
        },

        createParam: function (name, value) {
            var obj = {};
            obj.name = name;
            obj.value = value;
            return obj;
        },
    }

    function getParamValues(param) {

        if (!param)
            return "";

        var paramValues = "";

        if (Array.isArray(param)) {
            // we will look for name and value properties
            for (var i = 0; i < param.length; i++) {
                var p = param[i];
                if (p) {
                    if (p.name !== undefined && p.value !== undefined) {

                        if (paramValues !== "") {
                            paramValues += "&";
                        }

                        //quote strings
                        if (typeof (p.value) === 'string')
                            p.value = '"' + p.value + '"';

                        paramValues += p.name + "=" + p.value;
                    }
                }
            }

            if (paramValues !== "") {
                paramValues = "?" + paramValues;
            }

        } else {
            paramValues = param; // single value
        }

        return paramValues;
    }

    return apiService;
}]);