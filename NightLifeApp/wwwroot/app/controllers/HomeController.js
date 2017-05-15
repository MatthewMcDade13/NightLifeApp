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
            function HomeController($scope, $http, $window, ModalService, AppHttpService) {
                this.$scope = $scope;
                this.$http = $http;
                this.$window = $window;
                this.ModalService = ModalService;
                this.http = AppHttpService;
                this.location = "";
            }
            HomeController.prototype.getBars = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this;
                                return [4 /*yield*/, this.http.getBars(this.location)];
                            case 1:
                                _a.bars = _b.sent();
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
                            case 0: return [4 /*yield*/, this.http.getLastSearch()];
                            case 1:
                                lastSearchResponse = _a.sent();
                                this.$scope.$apply(function () {
                                    _this.location = lastSearchResponse;
                                    if (_this.location !== null) {
                                        _this.getBars();
                                    }
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            };
            HomeController.prototype.subscribeToBar = function (bar) {
                return __awaiter(this, void 0, void 0, function () {
                    var subscribeResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log(bar.id);
                                return [4 /*yield*/, this.http.subscribeToBar(bar.id)];
                            case 1:
                                subscribeResponse = _a.sent();
                                if (subscribeResponse.redirectUrl) {
                                    this.$window.location.href = subscribeResponse.redirectUrl;
                                    return [2 /*return*/];
                                }
                                this.$scope.$apply(function () {
                                    if (subscribeResponse.subbed) {
                                        bar.numberOfPeopleAttending++;
                                    }
                                    else {
                                        bar.numberOfPeopleAttending--;
                                    }
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            };
            HomeController.prototype.showModal = function () {
                var _this = this;
                this.ModalService.showModal({
                    templateUrl: "/views/modal.html",
                    controller: "ModalController",
                    controllerAs: "modal"
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        _this.message = "You said " + result;
                    });
                });
            };
            //Using this to test bars until we can call Google Place Api again
            HomeController.prototype.test = function () {
                this.$http.put("api/bar/sub/" + 10, null)
                    .then(function (response) {
                    var jsonResponse = response.data;
                    console.log(jsonResponse.redirectUrl);
                    if (jsonResponse.redirectUrl) {
                        console.log("redirecting");
                        //this.$window.location.href = jsonResponse.redirectUrl;
                        //return;
                    }
                });
            };
            return HomeController;
        }());
        HomeController.$inject = ["$scope", "$http", "$window", "ModalService", "AppHttpService"];
        controllers.HomeController = HomeController;
        angular.module("NightLife").controller("HomeController", HomeController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=HomeController.js.map