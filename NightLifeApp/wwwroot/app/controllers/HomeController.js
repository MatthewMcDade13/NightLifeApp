var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var HomeController = (function () {
            function HomeController($http, $window) {
                this.$http = $http;
                this.$window = $window;
                this.location = "";
            }
            HomeController.prototype.getBars = function () {
                var _this = this;
                this.$http.get("api/search/nearby?location=" + this.location)
                    .then(function (response) {
                    _this.bars = response.data;
                });
            };
            HomeController.prototype.getLastSearch = function () {
                var _this = this;
                this.$http.get("api/search/last")
                    .then(function (response) {
                    var json = response.data;
                    _this.location = json.lastSearch;
                    if (_this.location !== null) {
                        _this.getBars();
                    }
                });
            };
            HomeController.prototype.subscribeToBar = function (bar) {
                var _this = this;
                console.log(bar.id);
                this.$http.put("api/bar/sub/" + bar.id, null)
                    .then(function (response) {
                    var jsonResponse = response.data;
                    //TODO: This is redirecting seemingly everytime this method is called,
                    //Find out why
                    if (jsonResponse.redirectUrl) {
                        _this.$window.location.href = jsonResponse.redirectUrl;
                        return;
                    }
                    if (jsonResponse.subbed) {
                        bar.numberOfPeopleAttending++;
                    }
                    else {
                        bar.numberOfPeopleAttending--;
                    }
                });
            };
            HomeController.prototype.test = function () {
                this.$http.put("api/bar/sub/" + 10, null)
                    .then(function (response) {
                    var jsonResponse = response.data;
                    console.log(jsonResponse.redirectUrl);
                    if (jsonResponse.redirectUrl) {
                        console.log("redirecting");
                        //this.$window.location.href = jsonResponse.redirectUrl;
                        //return;
                    }
                });
            };
            return HomeController;
        }());
        HomeController.$inject = ["$http", "$window"];
        controllers.HomeController = HomeController;
        angular.module("NightLife").controller("HomeController", HomeController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=HomeController.js.map