module app.controllers
{
    export class HomeController
    {
        bars: any;
        location: string;
            
        static $inject = ["$http"];

        constructor(public $http: angular.IHttpService)
        {
            this.location = "";
        }

        getBars()
        {
            this.$http.get(`api/search/nearby?location=${this.location}`)
                .then(response => {
                    this.bars = response.data;
                });
        }
    }

    angular.module("NightLife").controller("HomeController", HomeController);
}