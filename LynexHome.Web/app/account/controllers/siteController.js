lynex.controller('siteController', ['$scope', '$location', '$route', 'switchService', 'userService', 'siteService', 'toolService',
    function ($scope, $location, $route, switchService, userService, siteService, tools) {

        $scope.loading = true;

        $scope.getSiteName = function () {
            if ($scope.selectedSite) {
                var suffix = $scope.selectedSite.isDefault ? "(Default)" : "";
                return $scope.selectedSite.name + suffix;
            }
            return "Please Select";
        }

        var init = function () {
            siteService.getSites().then(function (data) {
                if (data.success) {
                    $scope.sites = data.results;
                    angular.forEach($scope.sites, function (value, key) {
                        value.isBusy = false;
                        value.edit = false;

                        if (value.isDefault) {
                            $scope.selectedSite = value;
                            $scope.switches = value.switchViewModels;
                        }

                    });
                }

                $scope.loading = false;
            });
        }

        $scope.setDefault = function () {
            if ($scope.selectedSite) {
                $scope.loading = true;
                siteService.setDefault($scope.selectedSite.id).then(function (data) {
                    init();
                });
            }
        }

        init();
    }
]);