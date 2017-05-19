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
            this.barId = route.barId;
        }

        async getBar(): Promise<void>
        {
            let barResponse = await this.http.getBarById(this.route.barId);
            
            this.$scope.$apply(() => {
                this.currentBar = barResponse;                
                this.buildGoogleMapsUrl();
            });

            await this.getBarDetails();
        }

        private async getBarDetails(): Promise<void>
        {
            let barDetailsResponse = await this.http.getBarDetails(this.currentBar.placeId);

            this.$scope.$apply(() => {
                this.barDetails = barDetailsResponse;
                this.barReviews = this.barDetails.reviews;
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