var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var HomeController = (function () {
            function HomeController($scope, $http, $window, ModalService, AppHttpService, style) {
                this.$scope = $scope;
                this.$http = $http;
                this.$window = $window;
                this.ModalService = ModalService;
                this.style = style;
                this.http = AppHttpService;
                this.location = "";
                this.isUserLoggedIn = false;
                this.isBusy = false;
                this.currentUser = null;
                this.centerCssClass = "center";
            }
            HomeController.prototype.clearResults = function () {
                if (this.location === "") {
                    this.bars = null;
                    this.centerCssClass = "center";
                }
            };
            HomeController.prototype.getPageData = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.isBusy = true;
                                return [4 /*yield*/, this.getUserIsAuthenticated()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, this.getCurrentUser()];
                            case 2:
                                _a.sent();
                                this.isBusy = false;
                                this.getLastSearch();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            HomeController.prototype.getUserData = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.getUserIsAuthenticated();
                        this.getCurrentUser();
                        return [2 /*return*/];
                    });
                });
            };
            HomeController.prototype.getCurrentUser = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    var currentUserResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.http.getCurrentUser()];
                            case 1:
                                currentUserResponse = _a.sent();
                                this.$scope.$apply(function () {
                                    _this.currentUser = currentUserResponse;
                                    console.log(_this.currentUser);
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            };
            HomeController.prototype.getUserIsAuthenticated = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    var userResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.http.getUserIsAuthenticated()];
                            case 1:
                                userResponse = _a.sent();
                                this.$scope.$apply(function () {
                                    _this.isUserLoggedIn = userResponse;
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            };
            HomeController.prototype.getBars = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    var barResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (this.location === "") {
                                    this.bars = null;
                                    return [2 /*return*/];
                                }
                                this.centerCssClass = null;
                                this.isBusy = true;
                                return [4 /*yield*/, this.http.getBars(this.location)];
                            case 1:
                                barResult = _a.sent();
                                this.$scope.$apply(function () {
                                    _this.bars = barResult;
                                    console.log(_this.bars);
                                    //Make sure we have gotten data from User Api successfully before we style buttons,
                                    //If for some reason we did not, just use a default style
                                    if (_this.currentUser !== null) {
                                        _this.style.setRSVPButtonStyle(_this.currentUser, _this.bars);
                                    }
                                    else {
                                        _this.style.setDefaultRSVPButtonStyle(_this.bars);
                                    }
                                    _this.isBusy = false;
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            };
            HomeController.prototype.getLastSearch = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    var lastSearchResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("getting last search");
                                return [4 /*yield*/, this.http.getLastSearch()];
                            case 1:
                                lastSearchResponse = _a.sent();
                                this.$scope.$apply(function () {
                                    _this.location = lastSearchResponse;
                                    console.log("location: " + _this.location);
                                    if (_this.location !== null) {
                                        _this.getBars();
                                    }
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            };
            HomeController.prototype.rsvpToBar = function (bar) {
                return __awaiter(this, void 0, void 0, function () {
                    var rsvpResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.http.rsvpToBar(bar.id)];
                            case 1:
                                rsvpResponse = _a.sent();
                                if (rsvpResponse.redirectUrl) {
                                    return [2 /*return*/];
                                }
                                this.$scope.$apply(function () {
                                    if (rsvpResponse.subbed) {
                                        bar.numberOfPeopleAttending++;
                                        bar.RSVPButtonStyle = "btn-danger";
                                        bar.RSVPButtonText = "Im Not Going.";
                                    }
                                    else {
                                        bar.numberOfPeopleAttending--;
                                        bar.RSVPButtonStyle = "btn-success";
                                        bar.RSVPButtonText = "Im Going!";
                                    }
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            };
            HomeController.prototype.showRSVPModal = function (bar) {
                var _this = this;
                this.ModalService.showModal({
                    templateUrl: "/views/modal.html",
                    controller: "ModalController",
                    controllerAs: "modal",
                    inputs: {
                        barId: bar.id
                    }
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (barId) {
                        //Let modal close, then reroute to page we want
                        _this.$window.location.href = "/#!/details/" + barId + "/";
                    });
                });
            };
            return HomeController;
        }());
        HomeController.$inject = ["$scope", "$http", "$window", "ModalService", "AppHttpService", "StyleService"];
        controllers.HomeController = HomeController;
        angular.module("NightLife").controller("HomeController", HomeController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=HomeController.js.map