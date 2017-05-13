var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var HomeController = (function () {
            function HomeController($http) {
                this.$http = $http;
                this.location = "";
            }
            HomeController.prototype.getBars = function () {
                var _this = this;
                this.$http.get("api/search/nearby?location=" + this.location)
                    .then(function (response) {
                    _this.bars = response.data;
                });
            };
            return HomeController;
        }());
        HomeController.$inject = ["$http"];
        controllers.HomeController = HomeController;
        angular.module("NightLife").controller("HomeController", HomeController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=HomeController.js.map