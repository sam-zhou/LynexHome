lynex.controller('smarthomeController', ['$scope', '$location', '$route', 'switchService', 'userService',
    function ($scope, $location, $route, switchService, userService) {


        $scope.text = "111111111";

        $scope.loading = true;

        $scope.switchClass = function(value) {
            if (value) {
                return "on";
            }
            return "off";
        }


        $scope.addNewSwitch = function() {
            $scope.switches.push({
                isBusy: false,
                name: "New Switch",
                order: 0,
                status: false,
                type: 1,
                x: 0,
                y: 0,
                edit: true
            });
        }

        $scope.clickSwitch = function (theSwitch) {
            if (!theSwitch.isBusy && theSwitch.id) {
                theSwitch.isBusy = true;
                switchService.updateStatus(theSwitch.id, !theSwitch.status).then(function (data) {
                    theSwitch.status = data.result;
                    theSwitch.isBusy = false;
                });
            }
        }

        switchService.getSwitches().then(function(data) {
            if (data.success) {
                $scope.switches = data.results;
                angular.forEach($scope.switches, function (value, key) {
                    value.isBusy = false;
                    value.edit = false;
                });
                console.log($scope.switches);
            }

            $scope.loading = false;
        });

    }
]);