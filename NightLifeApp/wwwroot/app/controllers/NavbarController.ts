module app.controllers
{
    import AppHttpService = app.services.AppHttpService;

    export class NavbarController
    {
        http: AppHttpService;

        static $inject = ["AppHttpService"];
        constructor(AppHttpService: AppHttpService)
        {
            this.http = AppHttpService;
        }


    }

    angular.module("NightLife").controller("NavbarController", NavbarController);
}