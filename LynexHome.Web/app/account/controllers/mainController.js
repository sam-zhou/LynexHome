lynex.controller('mainController', ['$scope', '$location', '$route', 'switchService', 'userService', 'siteService', 'toolService','$rootScope',
    function ($scope, $location, $route, switchService, userService, siteService, tools, $rootScope) {
        var preventingClick = false;
        $scope.draggingSwitch = null;
        $scope.loading = true;

        $scope.getSiteName = function() {
            if ($scope.selectedSite) {
                var suffix = $scope.selectedSite.isDefault ? "(Default)" : "";
                return $scope.selectedSite.name + suffix;
            }
            return "Please Select";
        }

        var init = function () {

            var selectedSite = siteService.getSelectedSite();
            console.log("selectedSite:");
            
            siteService.getSites().then(function (data) {
                if (data.success) {
                    console.log(data.results);

                    $scope.sites = data.results;

                    if (selectedSite !== null && selectedSite !== undefined) {
                        angular.forEach($scope.sites, function (value, key) {
                            value.isBusy = false;
                            value.edit = false;

                            if (selectedSite.id === value.id) {
                                console.log(value);
                                $scope.selectedSite = value;
                                $scope.switches = value.switchViewModels;
                            }


                        });
                    }
                    

                    if ($scope.selectedSite === undefined || $scope.selectedSite === null) {
                        angular.forEach($scope.sites, function (value, key) {
                            value.isBusy = false;
                            value.edit = false;

                            if (value.isDefault) {
                                $scope.selectedSite = value;
                                $scope.switches = value.switchViewModels;
                            }

                        });
                    }
                }

                $scope.loading = false;
            });
        }


        $scope.setDefault = function() {
            if ($scope.selectedSite) {
                $scope.loading = true;
                siteService.setDefault($scope.selectedSite.id).then(function (data) {
                    init();
                });
            }
        }

        $scope.gotoMap = function() {
            $location.path("/map");
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
            
            if (!preventingClick) {
                if (!theSwitch.isBusy && theSwitch.id) {
                    theSwitch.isBusy = true;
                    switchService.updateStatus(theSwitch.id, !theSwitch.status).then(function(data) {
                        theSwitch.status = data.result;
                        theSwitch.isBusy = false;
                    });
                }
            } else {
                theSwitch.isBusy = false;
                preventingClick = false;
            }

        }



        $scope.dropCallback = function (event, ui, theSwitch, index) {
            if ($scope.draggingSwitch != null) {

                switchService.updateOrder($scope.draggingSwitch.id, index).then(function(data) {
                    $scope.draggingSwitch.isBusy = false;
                    $scope.draggingSwitch = null;
                });
            }
            tools.log('Order Changed: ' + $scope.draggingSwitch.name + ", from index: " + $scope.draggingSwitch.order + " to index:" + index);
            
        };

        $scope.dragStopCallback = function (event, ui, theSwitch, index) {
            preventingClick = true;
            $scope.draggingSwitch = theSwitch;
            theSwitch.isBusy = true;
            tools.log('stopCallback: ' + theSwitch.name + ", index:" + index);
        };

        $scope.selectSite = function (site) {
            $scope.selectedSite = site;
            $scope.switches = null;
            $scope.loading = true;
            siteService.setSelectedSite(site);
            switchService.getSwitches(site.id).then(function (data) {
                if (data.success) {
                    $scope.switches = data.results;
                    angular.forEach($scope.switches, function (value, key) {
                        value.isBusy = false;
                        value.edit = false;
                    });
                    tools.log($scope.switches);
                }

                $scope.loading = false;
            });
        }


        

        init();

    }
]);