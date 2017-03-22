common.controller('navigationController', ['$scope', '$location', '$route',
    function ($scope, $location, $route) {

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };


    }
]);