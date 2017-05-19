var app;
(function (app) {
    var directives;
    (function (directives) {
        function spinner() {
            return {
                scope: {
                    message: "@"
                },
                templateUrl: "/views/spinner.html"
            };
        }
        directives.spinner = spinner;
        angular.module("helpfulUi").directive("spinner", spinner);
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=spinner.js.map