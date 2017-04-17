lynex.controller('mapController', ['$scope', '$location', '$route', 'switchService', 'userService', 'siteService', 'toolService', 'canvasService', '$window',
    function ($scope, $location, $route, switchService, userService, siteService, tools, canvasService, $window) {
        $scope.loading = true;

        canvasService.setDrawType('mouse');

        $scope.isDropDown = function() {
            return $window.innerWidth > 767;
        }

        $scope.isDrawType = function (type) {
            return canvasService.getDrawType() === type;
        }

        $scope.setDrawType = function(type) {
            canvasService.setDrawType(type);
        }

        $scope.save = function() {
            canvasService.save();
        }

        $scope.zoomIn = function() {
            canvasService.zoomIn();
        }

        $scope.zoomOut = function() {
            canvasService.zoomOut();
        }

        $scope.deleteSelection = function () {
            canvasService.deleteSelection();
        }

        var init = function () {
            

            var selectedSite = siteService.getSelectedSite();

            if (selectedSite === undefined || selectedSite === null) {
                siteService.getSites().then(function(data) {
                    if (data.success) {
                        $scope.sites = data.results;
                        angular.forEach($scope.sites, function(value, key) {
                            value.isBusy = false;
                            value.edit = false;

                            if (value.isDefault) {
                                selectedSite = value;
                                siteService.setSelectedSite(value);
                                canvasService.drawMap(selectedSite);
                            }

                        });
                    }

                    $scope.loading = false;
                });
            } else {
                //console.log("Seleceted Site");
                //console.log(selectedSite);
                siteService.getSite(selectedSite.id).then(function(data) {
                    if (data.success) {
                        selectedSite = data.result;
                        canvasService.drawMap(selectedSite);
                        $scope.loading = false;
                    }
                });
                
                
            }
        }

        init();
    }
]);