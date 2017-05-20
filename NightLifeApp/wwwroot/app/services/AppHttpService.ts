module app.services
{
    import Bar = app.models.Bar;
    import BarDetails = app.models.BarDetails;
    import NightLifeUser = app.models.NightLifeUser;

    export class AppHttpService
    {
        static $inject = ["$http"]

        constructor(public $http: angular.IHttpService)
        {
        }

        async getUserIsAuthenticated(): Promise<boolean>
        {
            return this.$http.get("/api/user/isAuth")
                .then(response => {
                    let authResponse: any = response.data;
                    return authResponse.isLoggedIn;
                });
        }

        async getCurrentUser(): Promise<NightLifeUser>
        {
            return this.$http.get("/api/user/getUser")
                .then(response => {
                    return <NightLifeUser>response.data;
                });
        }

        async getBars(location: string): Promise<Array<Bar>>
        {
           return this.$http.get(`/api/search/nearby?location=${location}`)
                .then(response => {
                     return <Array<Bar>>response.data;
                });
        }

        async getBarById(barId: number|string): Promise<Bar>
        {
            return this.$http.get(`/api/bar/getbar/${barId}`)
                .then(response => {

                    return <Bar>response.data;
                });
        }

        async getBarDetails(placeId: string): Promise<BarDetails>
        {
            return this.$http.get(`/api/bar/details/${placeId}`)
                .then(response => {
                    return <BarDetails>response.data;
                });
        }

        async getLastSearch(): Promise<string>
        {
            return this.$http.get("/api/search/last")
                .then(response => {
                    let json: any = response.data;
                    return json.lastSearch;
                });
        }

        async rsvpToBar(barId: number): Promise<any>
        {
           return this.$http.put(`/api/bar/sub/${barId}`, null)
                .then(response => {
                    return response.data;
                });
        }

        async getListOfUsersAttending(barId: number): Promise<Array<NightLifeUser>>
        {
            return this.$http.get(`/api/bar/getusers/${barId}`)
                .then(response => {
                    return <Array<NightLifeUser>>response.data;
                });
        }
    }

    angular.module("NightLife").service("AppHttpService", AppHttpService);
}