common.directive('loginPartial', function () {
	var directive = {};

	directive.restrict = 'E';

	directive.templateUrl = "/app/common/views/loginPartial.html";

	directive.controller = "loginPartialController";

	return directive;

});