module app.controllers
{
    export class ModalController
    {
        static $inject = ["close"];

        constructor(public close: any)
        {
        }

        closeModal(result: any): void
        {
            this.close(result, 500);
        }
    }

    angular.module("NightLife").controller("ModalController", ModalController);
}