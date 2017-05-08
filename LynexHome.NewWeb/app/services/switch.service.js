"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var api_service_1 = require("./api.service");
require("rxjs/add/operator/map");
var querysitemodel_apimodels_1 = require("../apimodels/querysitemodel.apimodels");
var SwitchService = (function () {
    function SwitchService(apiService) {
        this.apiService = apiService;
        this.switches = [];
    }
    SwitchService.prototype.getSwitches = function (siteId) {
        var _this = this;
        var siteQueryModel = new querysitemodel_apimodels_1.QuerySiteModel();
        siteQueryModel.SiteId = siteId;
        var promise = this.apiService.postData("switch", "get", siteQueryModel)
            .then(function (response) {
            var results = response.results;
            _this.switches = results;
            return results;
        });
        return promise;
    };
    ;
    SwitchService.prototype.updateStatus = function (switchId, status) {
        var updateStatus = {
            SwitchId: switchId,
            Status: status
        };
        return this.apiService.postData("switch", "updateStatus", updateStatus).then(function (response) { return response.results; });
    };
    ;
    SwitchService.prototype.updateOrder = function (switchId, order, siteId, clientWebSocketId) {
        var updateOrder = {
            SwitchId: switchId,
            Order: order,
            ClientWebSocketId: clientWebSocketId,
            SiteId: siteId
        };
        return this.apiService.postData("switch", "updateOrder", updateOrder);
    };
    SwitchService.prototype.updateScheduleActive = function (scheduleId, switchId, siteId, active) {
        var schedule = {
            Id: scheduleId,
            SwitchId: switchId,
            Active: active,
            SiteId: siteId
        };
        return this.apiService.postData("switch", "updateScheduleActive", schedule).then(function (response) { return response.results; });
    };
    SwitchService.prototype.getSchedules = function (switchId) {
        var scheduleEnquire = {
            SwitchId: switchId
        };
        return this.apiService.postData("switch", "getSchedules", scheduleEnquire).then(function (response) { return response.results; });
    };
    SwitchService.prototype.updateSwitch = function (theSwitch) {
        var switchModel = {
            Id: theSwitch.id,
            Name: theSwitch.name,
            Type: theSwitch.type,
            IconId: theSwitch.iconId,
            ChipId: theSwitch.chipId,
            SiteId: theSwitch.siteId
        };
        return this.apiService.postData("switch", "updateSwitch", switchModel).then(function (response) { return response.results; });
    };
    SwitchService.prototype.updateSchedule = function (schedule, siteId) {
        var scheduleModel = {
            Id: schedule.id,
            Name: schedule.name,
            StartTime: schedule.startTime,
            Length: schedule.length,
            Monday: schedule.monday,
            Tuesday: schedule.tuesday,
            Wednesday: schedule.wednesday,
            Thursday: schedule.thursday,
            Friday: schedule.friday,
            Saturday: schedule.saturday,
            Sunday: schedule.sunday,
            Frequency: schedule.frequency,
            SwitchId: schedule.switchId,
            STime: {
                Hour: schedule.sTime.hour,
                Minute: schedule.sTime.minute
            },
            ETime: {
                Hour: schedule.eTime.hour,
                Minute: schedule.eTime.minute
            },
            SiteId: siteId
        };
        return this.apiService.postData("switch", "updateSchedule", scheduleModel).then(function (response) { return response.results; });
    };
    SwitchService.prototype.deleteSchedule = function (schedule) {
        var scheduleModel = {
            Id: schedule.id,
            Name: schedule.name,
            StartTime: schedule.startTime,
            Length: schedule.length,
            Monday: schedule.monday,
            Tuesday: schedule.tuesday,
            Wednesday: schedule.wednesday,
            Thursday: schedule.thursday,
            Friday: schedule.friday,
            Saturday: schedule.saturday,
            Sunday: schedule.sunday,
            Frequency: schedule.frequency,
            SwitchId: schedule.switchId
        };
        return this.apiService.postData("switch", "deleteSchedule", scheduleModel).then(function (response) { return response.results; });
    };
    return SwitchService;
}());
SwitchService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], SwitchService);
exports.SwitchService = SwitchService;
//# sourceMappingURL=switch.service.js.map