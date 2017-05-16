var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var NavbarController = (function () {
            function NavbarController(AppHttpService) {
                this.http = AppHttpService;
            }
            return NavbarController;
        }());
        NavbarController.$inject = ["AppHttpService"];
        controllers.NavbarController = NavbarController;
        angular.module("NightLife").controller("NavbarController", NavbarController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=NavbarController.js.map