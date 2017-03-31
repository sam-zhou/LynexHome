var lynex = angular.module('lynex', ['ngTouch', 'ngDragDrop', 'ngRoute', 'ngCookies', 'ngSanitize', 'ngAnimate', 'common', 'lynex.services']);

// Define Routing for app
lynex.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider.
        when('/controlcenter', {
            templateUrl: '/app/account/views/main.html',
            authRequired: true
        }).
        when('/map', {
            templateUrl: '/app/account/views/map.html',
            authRequired: true
        }).
        otherwise({
            redirectTo: '/controlcenter'
        });

    // this sends the lovely ".ASPXAUTH" cookie.
    $httpProvider.defaults.withCredentials = true;
}
]);


lynex.factory('ajaxInterceptor', ['$cookies', '$q', function ($cookies, $q) {

    var ajaxInterceptor = {
        request: function (config) {
            var cookie = $cookies.phctoken;
            config.headers['.ASPXAUTH'] = cookie;
            return config;
        },
        response: function (response) {

            return response || $q.when(response);
        },
        responseError: function (rejection) {
            // redirect to login if staus is 401 unauthorized

            if (rejection.status === 0) {
                window.location = "/#/?redirectUrl=" + window.encodeURIComponent(document.URL);
            }

            if (rejection.status === 401) {
                window.location = "/#/?redirectUrl=" + window.encodeURIComponent(document.URL);
            }

            return $q.reject();
        }
    };


    return ajaxInterceptor;
}]);


lynex.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('ajaxInterceptor');
}]);


lynex.run(['$rootScope', '$location', '$route', 'userService', '$window', function ($rootScope, $location, $route, userService, $window) {

    var preventNavigation = false;
    var preventNavigationUrl = null;
    var preventNavigationMsg = null;

    $rootScope.allowNavigation = function () {

        if ($rootScope.nfymessage === preventNavigationMsg) {
            $rootScope.ntfyshow = false;
            $rootScope.nfymessage = "";
        }

        preventNavigation = false;
        preventNavigationUrl = null;
        preventNavigationMsg = null;
    };

    $rootScope.preventNavigation = function (message, url) {
        preventNavigation = true;
        preventNavigationUrl = url ? url : $location.absUrl();
        preventNavigationMsg = message;
    }

    var showPreventNavNotification = function () {
        if (preventNavigationMsg) {
            $rootScope.nfyshow = true;
            $rootScope.nfytimeout = false;
            $rootScope.nfydismissable = true;
            $rootScope.timeout = 3000;
            $rootScope.nfytype = "error";
            $rootScope.nfymessage = preventNavigationMsg;
        }
    }

    $rootScope.$on('$routeChangeStart', function (event, newRoute, oldRoute) {
        if (newRoute) {

            if (!newRoute.resolve) {
                newRoute.resolve = {};
            }

            if (newRoute.authRequired) {
                if (newRoute.resolve.isAuthenticated == undefined) {
                    newRoute.resolve.isAuthenticated = userService.userAuthenticatedCheck;
                }
            }

            if ($window.innerWidth <= 767 && $location.path() == "/map") {
                $rootScope.hideFooter = true;
            } else {
                $rootScope.hideFooter = false;
            }

        }


        

    });

    $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {

        // collapse the navigation dropdown when changing views
        $("#navbar-collapse").removeClass("in");

        // hide any errors when changing viewd
        $rootScope.nfyshow = false;

        var nextPath = $location.path();

        if (nextPath === "") {
            // this is the "null" route, so we get the actual redirect instead
            var redirectRoute = $route.routes[null];
            nextPath = redirectRoute.redirectTo;
        };

        var nextRoute = $route.routes[nextPath];

        if (preventNavigation) {
            if (nextRoute.authRequired && $location.absUrl() !== preventNavigationUrl) {
                //checks if the nextRoute contains /profile/
                if ($route.current.originalPath.indexOf('/blocked') > -1 && nextRoute.originalPath.indexOf('/profile/') > -1) {
                    //if it does, allow navigation
                    $rootScope.allowNavigation();
                }
                else {
                    event.preventDefault();
                    window.location = preventNavigationUrl; // force you back to here
                    //alert(_preventNavigationMsg);
                    showPreventNavNotification();
                }
            }
        }
        else {
            $rootScope.allowNavigation();
        }

    });

}]);
