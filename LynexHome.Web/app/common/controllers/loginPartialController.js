common.controller('loginPartialController', ['$scope', '$location', '$route', 'userService', 'toolService',
    function ($scope, $location, $route, userService, tools) {
        var isAuthenticated = false;

        userService.GetUser().then(function (data) {
            tools.log(data);
            $scope.user = data;
            isAuthenticated = true;
        });


        $scope.isUserLoggedIn = function() {
            return isAuthenticated;
        }

        $scope.logout = function() {
            userService.logout();
        }
        
    }
]);