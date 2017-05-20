module app.controllers
{
    import Bar = app.models.Bar;
    import NightLifeUser = app.models.NightLifeUser;
    import AppHttpService = app.services.AppHttpService;
    import StyleService = app.services.StyleService;

    export class HomeController
    {
        bars: Array<Bar>;
        currentUser: NightLifeUser;
        location: string;
        centerCssClass: string;
        isUserLoggedIn: boolean;
        isBusy: boolean;

        http: AppHttpService;
            
        static $inject = ["$scope", "$http", "$window", "ModalService", "AppHttpService", "StyleService"];

        constructor(
            public $scope: angular.IScope,
            public $http: angular.IHttpService,
            public $window: angular.IWindowService,
            public ModalService: any,
            AppHttpService: AppHttpService,
            public style: StyleService)
        {
            this.http = AppHttpService;
            this.location = "";
            this.isUserLoggedIn = false;
            this.isBusy = false;
            this.currentUser = null;
            this.centerCssClass = "center";
            this.currentUser = null;
        }
       
        clearResults()
        {
            if (this.location === "")
            {
                this.bars = null;
                this.centerCssClass = "center";
            }
        }

        async getPageData(): Promise<void>
        {

            this.isBusy = true;
            await this.getUserIsAuthenticated();
            await this.getCurrentUser();

            this.isBusy = false;
            this.getLastSearch();
        }

        async getUserData(): Promise<void>
        {
            this.getUserIsAuthenticated();
            this.getCurrentUser();
        }

        private async getCurrentUser(): Promise<void>
        {
            let currentUserResponse: NightLifeUser = await this.http.getCurrentUser();

            this.$scope.$apply(() => {
                this.currentUser = currentUserResponse;
            });
        }

        private async getUserIsAuthenticated(): Promise<void>
        {
            let userResponse: boolean = await this.http.getUserIsAuthenticated();

            this.$scope.$apply(() => {
                this.isUserLoggedIn = userResponse;
            });
        }

        async getBars(): Promise<void>
        {
            if (this.location === "")
            {
                this.bars = null;
                return;
            }

            this.centerCssClass = null;
            this.isBusy = true;

            let barResult: Array<Bar> = await this.http.getBars(this.location);
            
            this.$scope.$apply(() => {                
                this.bars = barResult;

                //Make sure we have gotten data from User Api successfully before we style buttons,
                //If for some reason we did not, just use a default style
                if (this.currentUser !== null)
                {
                    this.style.setRSVPButtonStyle(this.currentUser, this.bars);
                }
                else
                {
                    this.style.setDefaultRSVPButtonStyle(this.bars);
                }

                this.isBusy = false;
            });

            
        }

        async getLastSearch(): Promise<void>
        {
            let lastSearchResponse: string = await this.http.getLastSearch();

            this.$scope.$apply(() => {
                this.location = lastSearchResponse;

                if (this.location !== null)
                {
                    this.getBars();
                }
            });       
        }

        async rsvpToBar(bar: Bar): Promise<void>
        {
            let rsvpResponse: any = await this.http.rsvpToBar(bar.id);

            if (rsvpResponse.redirectUrl)
            {
                return;
            }

            this.$scope.$apply(() => {
                if (rsvpResponse.subbed)
                {
                    bar.numberOfPeopleAttending++;
                    bar.RSVPButtonStyle = "btn-danger";
                    bar.RSVPButtonText = "Im Not Going."
                }
                else
                {
                    bar.numberOfPeopleAttending--;
                    bar.RSVPButtonStyle = "btn-success";
                    bar.RSVPButtonText = "Im Going!";
                }
            });
        }
        
        showRSVPModal(bar: Bar): void
        {
            this.ModalService.showModal({

                templateUrl: "/views/modal.html",
                controller: "ModalController",
                controllerAs: "modal",
                inputs: {
                    barId: bar.id
                }

            }).then(modal => {

                modal.element.modal();
                modal.close.then((barId: number) => {

                    //Let modal close, then reroute to page we want
                    this.$window.location.href = `/#!/details/${barId}/`;
                });
            });
        }
    }

    angular.module("NightLife").controller("HomeController", HomeController);
}