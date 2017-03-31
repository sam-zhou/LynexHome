lynex.directive("siteMap", ["canvasService", function (canvasService) {
    return {
        restrict: "A",
        link: function (scope, element, attributes) {
            canvasService.init(element, attributes);
        }
    };
}]);