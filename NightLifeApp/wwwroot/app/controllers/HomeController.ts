module app.controllers
{
    import Bar = app.models.Bar;
    import AppHttpService = app.services.AppHttpService;

    export class HomeController
    {
        bars: Array<Bar>;
        location: string;
        message: string;

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
        }

        async getBars(): Promise<void>
        {
            let barResult: Array<Bar> = await this.http.getBars(this.location);

            this.$scope.$apply(() => {
                this.bars = barResult;
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

        async subscribeToBar(bar: Bar): Promise<void>
        {
            console.log(bar.id);


            let subscribeResponse: any = await this.http.subscribeToBar(bar.id);

            if (subscribeResponse.redirectUrl)
            {
                this.$window.location.href = subscribeResponse.redirectUrl;
                return;
            }

            this.$scope.$apply(() => {
                if (subscribeResponse.subbed)
                {
                    bar.numberOfPeopleAttending++;
                }
                else
                {
                    bar.numberOfPeopleAttending--;
                }
            });
        }

        showModal(): void
        {
            this.ModalService.showModal({

                templateUrl: "/views/modal.html",
                controller: "ModalController",
                controllerAs: "modal"

            }).then(modal => {

                modal.element.modal();
                modal.close.then(result => {
                    this.message = "You said " + result;
                });
            });
        }
    }

    angular.module("NightLife").controller("HomeController", HomeController);
}