var app;
(function (app_1) {
    var app = angular.module("NightLife");
    app.config(function ($routeProvider) {
        $routeProvider.when("/home", {
            controller: "HomeController",
            controllerAs: "home",
            templateUrl: "/views/home.html",
            title: "NightLife - Home"
        });
        $routeProvider.when("/details/:barId/", {
            controller: "BarDetailsController",
            controllerAs: "bar",
            templateUrl: "/views/bardetails.html",
            title: "NightLife - Details"
        });
        $routeProvider.otherwise({ redirectTo: "/home" });
    });
    app.run(['$rootScope', function ($rootScope) {
            $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
                $rootScope.title = current.$$route.title;
            });
        }]);
})(app || (app = {}));
//# sourceMappingURL=config.js.map