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
var switch_service_1 = require("../services/switch.service");
var switch_model_1 = require("../models/switch.model");
var schedule_model_1 = require("../models/schedule.model");
var sweetalert2_1 = require("sweetalert2");
var ScheduleComponent = (function () {
    function ScheduleComponent(switchService) {
        this.switchService = switchService;
        this.selectedSwitch = null;
        this.selectedSchedule = null;
        this.schedules = null;
        this.isBusy = false;
        this.close = new core_1.EventEmitter();
    }
    Object.defineProperty(ScheduleComponent.prototype, "currentSwitch", {
        get: function () {
            return this.selectedSwitch;
        },
        set: function (theSwitch) {
            this.selectedSwitch = theSwitch;
            if (this.selectedSwitch != null) {
                this.init();
            }
        },
        enumerable: true,
        configurable: true
    });
    ScheduleComponent.prototype.init = function () {
        var _this = this;
        this.switchService.getSchedules(this.selectedSwitch.id).then(function (response) {
            _this.schedules = response;
            console.log(_this.schedules);
        });
    };
    ScheduleComponent.prototype.selectSchedule = function (schedule) {
        this.selectedSchedule = Object.assign({}, schedule);
        console.log(this.selectedSchedule);
    };
    ScheduleComponent.prototype.closeDialog = function () {
        this.selectedSchedule = null;
        this.schedules = null;
        this.close.emit('closed');
    };
    ScheduleComponent.prototype.addNew = function () {
        this.selectedSchedule = new schedule_model_1.Schedule();
        this.selectedSchedule.switchId = this.currentSwitch.id;
    };
    ScheduleComponent.prototype.save = function (theSchedule) {
        var _this = this;
        this.isBusy = true;
        this.switchService.updateSchedule(theSchedule).then(function (response) {
            if (theSchedule.id === 0 || theSchedule.id === undefined) {
                _this.schedules.push(response);
            }
            else {
                for (var i = 0; i < _this.schedules.length; i++) {
                    if (_this.schedules[i].id === response.id) {
                        _this.schedules[i] = response;
                        break;
                    }
                }
            }
            _this.isBusy = false;
        });
    };
    ScheduleComponent.prototype.delete = function (theSchedule) {
        var _this = this;
        sweetalert2_1.default({
            title: 'Are you sure?',
            text: 'You will not be able to recover this schedule!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(function () {
            console.log("delete", theSchedule);
            if (theSchedule.id !== 0 && theSchedule.id !== undefined) {
                _this.isBusy = true;
                _this.switchService.deleteSchedule(theSchedule).then(function (response) {
                    for (var i = 0; i < _this.schedules.length; i++) {
                        if (_this.schedules[i].id === theSchedule.id) {
                            _this.schedules.splice(i, 1);
                            _this.isBusy = false;
                            break;
                        }
                    }
                });
            }
            _this.selectedSchedule = null;
        }, function (dismiss) {
            //// dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            //if (dismiss === 'cancel' || dismiss === 'close') {
            //    this.closeDialog();
            //}
        });
    };
    ScheduleComponent.prototype.getNumberTimeString = function (input) {
        if (input < 10 && input >= 0) {
            return "0" + input;
        }
        else if (input > 10) {
            return input.toString();
        }
        return "00";
    };
    ScheduleComponent.prototype.getTime = function (schedule) {
        return this.getNumberTimeString(schedule.sTime.hour) + ":" + this.getNumberTimeString(schedule.sTime.minute) + " - " + this.getNumberTimeString(schedule.eTime.hour) + ":" + this.getNumberTimeString(schedule.eTime.minute);
    };
    ScheduleComponent.prototype.getDay = function (schedule) {
        switch (schedule.frequency) {
            case schedule_model_1.ScheduleFrequency.Once:
                return "Once";
            case schedule_model_1.ScheduleFrequency.Daily:
                return "Everyday";
            case schedule_model_1.ScheduleFrequency.Workdays:
                return "Workdays";
            case schedule_model_1.ScheduleFrequency.Weekends:
                return "Weekends";
            case schedule_model_1.ScheduleFrequency.Weekly:
                var output = "";
                if (schedule.monday) {
                    output += ",Mon";
                }
                if (schedule.tuesday) {
                    output += ",Tue";
                }
                if (schedule.wednesday) {
                    output += ",Wed";
                }
                if (schedule.thursday) {
                    output += ",Thu";
                }
                if (schedule.friday) {
                    output += ",Fri";
                }
                if (schedule.saturday) {
                    output += ",Sat";
                }
                if (schedule.sunday) {
                    output += ",Sun";
                }
                return output.substring(1);
        }
        return "Unknown";
    };
    return ScheduleComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ScheduleComponent.prototype, "close", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", switch_model_1.Switch),
    __metadata("design:paramtypes", [switch_model_1.Switch])
], ScheduleComponent.prototype, "currentSwitch", null);
ScheduleComponent = __decorate([
    core_1.Component({
        selector: 'schedule',
        templateUrl: 'views/schedule.component.html',
        styleUrls: ['css/schedule.component.css'],
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [switch_service_1.SwitchService])
], ScheduleComponent);
exports.ScheduleComponent = ScheduleComponent;
//# sourceMappingURL=schedule.component.js.map