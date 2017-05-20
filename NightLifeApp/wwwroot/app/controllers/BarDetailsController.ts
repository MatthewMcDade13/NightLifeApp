module app.controllers
{
    import AppHttpService = app.services.AppHttpService;
    import IRouteParams = app.IRouteParams;
    import Bar = app.models.Bar;
    import BarDetails = app.models.BarDetails;
    import BarReview = app.models.BarReview;

    export class BarDetailsController
    {
        static $inject = [ "$scope", "$routeParams", "$sce", "AppHttpService"]

        googleMapsUrl: string;
        barId: number | string;
        isBusy: boolean;
        currentBar: Bar;
        barDetails: BarDetails;
        barReviews: Array<BarReview>;

        constructor(
            public $scope: angular.IScope,
            public route: IRouteParams,
            public $sce: angular.ISCEService,
            public http: AppHttpService)
        {
            this.googleMapsUrl = "";
            this.currentBar = null;
            this.barDetails = null;
            this.barReviews = null;
            this.isBusy = false;
            this.barId = route.barId;
        }

        async getBar(): Promise<void>
        {
            this.isBusy = true;
            let barResponse = await this.http.getBarById(this.route.barId);

            //TODO: Remove this after finding bug
            if (barResponse === null)
            {
                console.log("Bar response:");
                console.log(barResponse);
            }

            this.$scope.$apply(() => {
                this.currentBar = barResponse;
                this.buildGoogleMapsUrl();
            });

            await this.getBarDetails();
        }

        private async getBarDetails(): Promise<void>
        {
            //TODO: See if we can catch bar not loading properly on bardetails page while still in development
            //If not, remove this try catch block or at least add some data to display error in HTML
            try
            {
                var barDetailsResponse = await this.http.getBarDetails(this.currentBar.placeId);
            }
            catch (exception)
            {
                console.log("exception:");
                console.log(exception);
                console.log("bar id in route:");
                console.log(this.route.barId);
                console.log("current bar");
                console.log(this.currentBar);
            }                        

            this.$scope.$apply(() => {
                this.barDetails = barDetailsResponse;
                this.barReviews = this.barDetails.reviews;
                this.isBusy = false;
            });
        }

        private buildGoogleMapsUrl(): void
        {
            this.googleMapsUrl =
                this.$sce.trustAsResourceUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyBHRvkSXOKkaQODQpLKa_-NG3DMEL7xNMc&q=${this.currentBar.address}`);
        }
    }

    angular.module("NightLife").controller("BarDetailsController", BarDetailsController);
}