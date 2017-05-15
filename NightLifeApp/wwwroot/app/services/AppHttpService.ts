module app.services
{
    import Bar = app.models.Bar;

    export class AppHttpService
    {
        static $inject = ["$http"]

        constructor(public $http: angular.IHttpService)
        {
        }

        async getBars(location: string): Promise<Array<Bar>>
        {
           return this.$http.get(`api/search/nearby?location=${location}`)
                .then(response => {
                     return <Array<Bar>>response.data;
                });
        }

        async getLastSearch(): Promise<string>
        {
            return this.$http.get("api/search/last")
                .then(response => {
                    let json: any = response.data;
                    return json.lastSearch;
                });
        }

        async subscribeToBar(barId: number): Promise<any>
        {
           return this.$http.put(`api/bar/sub/${barId}`, null)
                .then(response => {
                    return response.data;
                });
        }
    }

    angular.module("NightLife").service("AppHttpService", AppHttpService);
}