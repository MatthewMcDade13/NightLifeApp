module app.directives
{

    export function spinner(): angular.IDirective
    {
        return {
            scope: {
                message: "@"
            },
            templateUrl: "/views/spinner.html"
        };
    }

    angular.module("helpfulUi").directive("spinner", spinner);
}