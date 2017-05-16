module app.controllers
{
    import AppHttpService = app.services.AppHttpService;
    import NightLifeUser = app.models.NightLifeUser;

    export class NavbarController
    {
        http: AppHttpService;
        currentUser: NightLifeUser;
        isUserLoggedIn: boolean;

        static $inject = [ "$scope", "AppHttpService"];
        constructor(
            public $scope: angular.IScope,
            AppHttpService: AppHttpService)
        {
            this.http = AppHttpService;

            this.isUserLoggedIn = false;
            console.log("In ctor");
        }

        async getCurrentUser(): Promise<void>
        {
            console.log("getting current user");
            let userResponse: NightLifeUser = await this.http.getCurrentUser();

            this.$scope.$apply(() => {
                this.currentUser = userResponse;
            });
        }

        async getUserIsAuthenticated(): Promise<void>
        {
            let authResponse: boolean = await this.http.getUserIsAuthenticated();

            this.$scope.$apply(() => {
                this.isUserLoggedIn = authResponse;
            });
        }


    }

    angular.module("NightLife").controller("NavbarController", NavbarController);
}