var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var ModalController = (function () {
            function ModalController(close) {
                this.close = close;
            }
            ModalController.prototype.closeModal = function (result) {
                this.close(result, 500);
            };
            return ModalController;
        }());
        ModalController.$inject = ["close"];
        controllers.ModalController = ModalController;
        angular.module("NightLife").controller("ModalController", ModalController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=ModalController.js.map