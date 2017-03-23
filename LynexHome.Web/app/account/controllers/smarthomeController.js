lynex.controller('smarthomeController', ['$scope', '$location', '$route', 'switchService',
    function ($scope, $location, $route, switchService) {

        $scope.text = "111111111";

        $scope.loading = true;

        $scope.switchClass = function(value) {
            if (value) {
                return "on";
            }
            return "off";
        }

        switchService.getSwitches().then(function(data) {
            if (data.success) {
                $scope.switches = data.results;
                console.log(data);
            }

            $scope.loading = false;
        });

    }
]);