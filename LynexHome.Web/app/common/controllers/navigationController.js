common.controller('navigationController', ['$scope', '$location', '$route', '$window',
    function ($scope, $location, $route, $window) {

        $scope.isActive = function (viewLocation) {

            return viewLocation === $location.path();
        };
    }
]);