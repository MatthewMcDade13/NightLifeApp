var app;
(function (app) {
    var services;
    (function (services) {
        var StyleService = (function () {
            function StyleService() {
            }
            StyleService.prototype.setRSVPButtonStyle = function (currentUser, bars) {
                for (var i = 0; i < bars.length; i++) {
                    if (bars[i].users.findIndex(function (u) { return u.email === currentUser.email; }) === -1) {
                        bars[i].RSVPButtonStyle = "btn-success";
                        bars[i].RSVPButtonText = "Im Going!";
                    }
                    else {
                        bars[i].RSVPButtonStyle = "btn-danger";
                        bars[i].RSVPButtonText = "Im Not Going.";
                    }
                }
            };
            StyleService.prototype.setDefaultRSVPButtonStyle = function (bars) {
                for (var i = 0; i < bars.length; i++) {
                    bars[i].RSVPButtonStyle = "btn-primary";
                    bars[i].RSVPButtonText = "RSVP";
                }
            };
            return StyleService;
        }());
        services.StyleService = StyleService;
        angular.module("NightLife").service("StyleService", StyleService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=StyleService.js.map