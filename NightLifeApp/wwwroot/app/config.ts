module app {

    export interface IRouteParams extends angular.route.IRouteParamsService
    {
        barId: number | string;
    }

    export interface INightLifeRoute extends angular.route.IRoute {
        title: string;
    }

    export interface IAppRootService extends angular.IRootScopeService
    {
        title: string;
    }
    

    var app = angular.module("NightLife");

    app.config(($routeProvider: angular.route.IRouteProvider) => {

        $routeProvider.when("/home", <INightLifeRoute>{
            controller: "HomeController",
            controllerAs: "home",
            templateUrl: "/views/home.html",
            title: "NightLife - Home"
        });

        $routeProvider.when("/details/:barId/", <INightLifeRoute>{
            controller: "BarDetailsController",
            controllerAs: "bar",
            templateUrl: "/views/bardetails.html",
            title: "NightLife - Details"
        });

        $routeProvider.otherwise({ redirectTo: "/home" });
    });


    app.run(['$rootScope', function ($rootScope: IAppRootService) {

        $rootScope.$on("$routeChangeSuccess", function (event: any, current: any, previous: any) {
            $rootScope.title = current.$$route.title;
        });
    }]);
}