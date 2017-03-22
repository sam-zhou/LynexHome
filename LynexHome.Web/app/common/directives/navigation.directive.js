common.directive('navigation', function () {
    var directive = {};

    directive.restrict = 'E';

    directive.templateUrl = "/app/common/views/navigation.html";

    directive.controller = "navigationController";

    return directive;

});