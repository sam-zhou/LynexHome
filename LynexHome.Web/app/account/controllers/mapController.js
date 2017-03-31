lynex.controller('mapController', ['$scope', '$location', '$route', 'switchService', 'userService', 'siteService', 'toolService', 'canvasService',
    function ($scope, $location, $route, switchService, userService, siteService, tools, canvasService) {
        $scope.loading = true;

        canvasService.setDrawType("hand");

        $scope.isDrawType = function (type) {
            return canvasService.getDrawType() === type;
        }

        $scope.setDrawType = function(type) {
            canvasService.setDrawType(type);
        }

        $scope.save = function() {
            
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

            if (selectedSite == null) {
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
                canvasService.drawMap(selectedSite);
                $scope.loading = false;
            }
        }

        init();
    }
]);