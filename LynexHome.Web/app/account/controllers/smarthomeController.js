lynex.controller('smarthomeController', ['$scope', '$location', '$route', 'switchService',
    function ($scope, $location, $route, switchService) {

        $scope.text = "111111111";


        switchService.getSwitches().then(function(data) {
            console.log(data);
        });

    }
]);