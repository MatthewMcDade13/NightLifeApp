module app.controllers
{
    import AppHttpService = app.services.AppHttpService;
    import NightLifeUser = app.models.NightLifeUser;

    export class ModalController
    {
        usersAttending: Array<NightLifeUser>;

        barId: number;

        http: AppHttpService;

        static $inject = ["$scope", "$location", "close", "barId", "AppHttpService"];

        constructor(
            public $scope: angular.IScope,
            public location: angular.ILocationService,
            public close: any, barId: number,
            AppHttpService: AppHttpService)
        {
            this.http = AppHttpService;
            
            this.barId = barId;

            this.getListOfUsersAttending();
        }

        closeModal(): void
        {
            this.close(this.barId, 200);
        }

        private async getListOfUsersAttending(): Promise<void>
        {
            let userListResponse: Array<NightLifeUser> = await this.http.getListOfUsersAttending(this.barId);

            this.$scope.$apply(() => {
                this.usersAttending = userListResponse;
                console.log(this.usersAttending);
            });
        }
    }

    angular.module("NightLife").controller("ModalController", ModalController);
}