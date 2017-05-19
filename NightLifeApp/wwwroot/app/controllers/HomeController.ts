module app.controllers
{
    import Bar = app.models.Bar;
    import AppHttpService = app.services.AppHttpService;

    export class HomeController
    {
        bars: Array<Bar>;
        location: string;
        center: string;
        isUserLoggedIn: boolean;
        isBusy: boolean;

        http: AppHttpService;
            
        static $inject = ["$scope", "$http", "$window", "ModalService" ,"AppHttpService"];

        constructor(
            public $scope: angular.IScope,
            public $http: angular.IHttpService,
            public $window: angular.IWindowService,
            public ModalService: any,
            AppHttpService: AppHttpService)
        {
            this.http = AppHttpService;
            this.location = "";
            this.isUserLoggedIn = false;
            this.isBusy = false;
            this.center = "center";
        }
       
        clearResults()
        {
            if (this.location === "")
            {
                this.bars = null;
                this.center = "center";
            }
        }

        async getUserIsAuthenticated(): Promise<void>
        {
            let userResponse = await this.http.getUserIsAuthenticated();

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

            this.center = null;
            this.isBusy = true;

            let barResult: Array<Bar> = await this.http.getBars(this.location);
            
            this.$scope.$apply(() => {                
                this.bars = barResult;
                console.log(this.bars);
                this.isBusy = false;
            });
        }

        async getLastSearch(): Promise<void>
        {

            let lastSearchResponse = await this.http.getLastSearch();

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
                //this.$window.location.href = rsvpResponse.redirectUrl;
                return;
            }

            this.$scope.$apply(() => {
                if (rsvpResponse.subbed)
                {
                    bar.numberOfPeopleAttending++;
                }
                else
                {
                    bar.numberOfPeopleAttending--;
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
                modal.close.then((barId) => {

                    //Let modal close, then reroute to page we want
                    this.$window.location.href = `/#!/details/${barId}/`;
                });
            });
        }
    }

    angular.module("NightLife").controller("HomeController", HomeController);
}