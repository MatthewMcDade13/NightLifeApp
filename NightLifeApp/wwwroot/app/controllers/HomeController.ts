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
            this.bars = await this.http.getBars(this.location);
            //this.$http.get(`api/search/nearby?location=${this.location}`)
            //    .then(response => {
            //        this.bars = response.data;
            //    });
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
            //this.$http.get("api/search/last")
            //    .then(response => {
            //        let json: any = response.data;
            //        this.location = json.lastSearch;

            //        if (this.location !== null)
            //        {
            //            this.getBars();
            //        }
            //    });           
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

            //this.$http.put(`api/bar/sub/${bar.id}`, null)
            //    .then(response => {
            //        let jsonResponse: any = response.data;

            //        if (jsonResponse.redirectUrl)
            //        {
            //            this.$window.location.href = jsonResponse.redirectUrl;
            //            return;
            //        }

            //        if (jsonResponse.subbed)
            //        {
            //            bar.numberOfPeopleAttending++;
            //        }
            //        else
            //        {
            //            bar.numberOfPeopleAttending--;
            //        }
            //    });
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

        //Using this to test bars until we can call Google Place Api again
        test()
        {
            this.$http.put(`api/bar/sub/${10}`, null)
                .then(response => {
                    let jsonResponse: any = response.data;

                    console.log(jsonResponse.redirectUrl);
                    if (jsonResponse.redirectUrl) {
                        console.log("redirecting");
                        //this.$window.location.href = jsonResponse.redirectUrl;
                        //return;
                    }
                });
        }
    }

    angular.module("NightLife").controller("HomeController", HomeController);
}