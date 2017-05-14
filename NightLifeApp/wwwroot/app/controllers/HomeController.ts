module app.controllers
{
    import Bar = app.models.Bar;

    export class HomeController
    {
        bars: any;
        location: string;
            
        static $inject = ["$http", "$window"];

        constructor(public $http: angular.IHttpService, public $window: angular.IWindowService)
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

        getLastSearch()
        {
            this.$http.get("api/search/last")
                .then(response => {
                    let json: any = response.data;
                    this.location = json.lastSearch;

                    if (this.location !== null)
                    {
                        this.getBars();
                    }
                });           
        }

        subscribeToBar(bar: Bar)
        {
            console.log(bar.id);

            this.$http.put(`api/bar/sub/${bar.id}`, null)
                .then(response => {
                    let jsonResponse: any = response.data;

                    //TODO: This is redirecting seemingly everytime this method is called,
                    //Find out why
                    if (jsonResponse.redirectUrl)
                    {
                        this.$window.location.href = jsonResponse.redirectUrl;
                        return;
                    }

                    if (jsonResponse.subbed)
                    {
                        bar.numberOfPeopleAttending++;
                    }
                    else
                    {
                        bar.numberOfPeopleAttending--;
                    }
                });
        }

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