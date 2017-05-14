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
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var ScheduleComponent = (function () {
    function ScheduleComponent(switchService, formBuilder) {
        this.switchService = switchService;
        this.formBuilder = formBuilder;
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
    ScheduleComponent.prototype.buildForm = function () {
        this.scheduleForm = this.formBuilder.group({
            'name': [this.selectedSchedule.name, [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(20),
                ]
            ],
            'sTime': [this.selectedSchedule.sTime, [
                    forms_1.Validators.required
                ]],
            'eTime': [this.selectedSchedule.eTime, [
                    forms_1.Validators.required,
                    this.greaterThan
                ]],
            'monday': [this.selectedSchedule.monday],
            'tuesday': [this.selectedSchedule.tuesday],
            'wednesday': [this.selectedSchedule.wednesday],
            'thursday': [this.selectedSchedule.thursday],
            'friday': [this.selectedSchedule.friday],
            'saturday': [this.selectedSchedule.saturday],
            'sunday': [this.selectedSchedule.sunday],
        });
        //this.scheduleForm.valueChanges
        //    .subscribe(data => this.onValueChanged(data));
        //this.onValueChanged(); // (re)set validation messages now
        //console.log(this.selectedSchedule);
    };
    ScheduleComponent.prototype.greaterThan = function (control) {
        if (control && control.parent) {
            if (control.value && control.parent.get("sTime").value) {
                var sH = control.parent.get("sTime").value.hour;
                var sM = control.parent.get("sTime").value.minute;
                var eH = control.value.hour;
                var eM = control.value.minute;
                if (eH < sH || (eH == sH && eM <= sM)) {
                    return {
                        greaterThan: true
                    };
                }
            }
        }
        return null;
    };
    ScheduleComponent.prototype.toggleRepeat = function (date) {
        var oringal = this.scheduleForm.controls[date].value;
        this.scheduleForm.controls[date].setValue(!oringal);
    };
    ScheduleComponent.prototype.init = function () {
        var _this = this;
        this.switchService.getSchedules(this.selectedSwitch.id).then(function (response) {
            _this.schedules = response;
        });
    };
    ScheduleComponent.prototype.selectSchedule = function (schedule) {
        this.selectedSchedule = Object.assign({}, schedule);
        this.buildForm();
    };
    ScheduleComponent.prototype.closeDialog = function () {
        this.selectedSchedule = null;
        this.schedules = null;
        this.close.emit('closed');
    };
    ScheduleComponent.prototype.addNew = function () {
        this.selectedSchedule = new schedule_model_1.Schedule();
        this.selectedSchedule.monday = false;
        this.selectedSchedule.tuesday = false;
        this.selectedSchedule.wednesday = false;
        this.selectedSchedule.thursday = false;
        this.selectedSchedule.friday = false;
        this.selectedSchedule.saturday = false;
        this.selectedSchedule.sunday = false;
        this.selectedSchedule.switchId = this.currentSwitch.id;
        this.buildForm();
    };
    ScheduleComponent.prototype.save = function () {
        var _this = this;
        if (this.scheduleForm.valid) {
            this.isBusy = true;
            this.selectedSchedule.name = this.scheduleForm.get("name").value;
            this.selectedSchedule.sTime = this.scheduleForm.get("sTime").value;
            this.selectedSchedule.eTime = this.scheduleForm.get("eTime").value;
            this.selectedSchedule.monday = this.scheduleForm.get("monday").value;
            this.selectedSchedule.tuesday = this.scheduleForm.get("tuesday").value;
            this.selectedSchedule.wednesday = this.scheduleForm.get("wednesday").value;
            this.selectedSchedule.thursday = this.scheduleForm.get("thursday").value;
            this.selectedSchedule.friday = this.scheduleForm.get("friday").value;
            this.selectedSchedule.saturday = this.scheduleForm.get("saturday").value;
            this.selectedSchedule.sunday = this.scheduleForm.get("sunday").value;
            this.switchService.updateSchedule(this.selectedSchedule, this.selectedSwitch.siteId).then(function (response) {
                if (_this.selectedSchedule.id === 0 || _this.selectedSchedule.id === undefined) {
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
        }
    };
    ScheduleComponent.prototype.delete = function () {
        var _this = this;
        sweetalert2_1.default({
            title: 'Are you sure?',
            text: 'You will not be able to recover this schedule!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(function () {
            console.log("delete", _this.selectedSchedule);
            if (_this.selectedSchedule.id !== 0 && _this.selectedSchedule.id !== undefined) {
                var deletingSwitch = _this.selectedSchedule;
                _this.isBusy = true;
                _this.switchService.deleteSchedule(_this.selectedSchedule).then(function (response) {
                    for (var i = 0; i < _this.schedules.length; i++) {
                        if (_this.schedules[i].id === deletingSwitch.id) {
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
    ScheduleComponent.prototype.updateSwitchActive = function (schedule, event) {
        var _this = this;
        if (!schedule.isBusy) {
            schedule.isBusy = true;
            this.switchService.updateScheduleActive(schedule.id, schedule.switchId, this.selectedSwitch.siteId, !schedule.active).then(function (response) {
                for (var i = 0; i < _this.schedules.length; i++) {
                    if (_this.schedules[i].id === response.id) {
                        _this.schedules[i] = response;
                        schedule.isBusy = false;
                        break;
                    }
                }
            });
        }
        event.stopPropagation();
    };
    ScheduleComponent.prototype.getTime = function (schedule) {
        return this.getNumberTimeString(schedule.sTime.hour) + ":" + this.getNumberTimeString(schedule.sTime.minute) + " - " + this.getNumberTimeString(schedule.eTime.hour) + ":" + this.getNumberTimeString(schedule.eTime.minute);
    };
    ScheduleComponent.prototype.getDayFromBoolean = function (monday, tuesday, wednesday, thursday, friday, saturday, sunday) {
        if (!monday && !tuesday && !wednesday && !thursday && !friday && !saturday && !sunday) {
            return "Once";
        }
        if (monday && tuesday && wednesday && thursday && friday && saturday && sunday) {
            return "Everyday";
        }
        if (monday && tuesday && wednesday && thursday && friday && !saturday && !sunday) {
            return "Weekdays";
        }
        if (!monday && !tuesday && !wednesday && !thursday && !friday && saturday && sunday) {
            return "Weekends";
        }
        return "Weekly";
    };
    ScheduleComponent.prototype.getDayFromSchedule = function (schedule) {
        return this.getDayFromBoolean(schedule.monday, schedule.tuesday, schedule.wednesday, schedule.thursday, schedule.friday, schedule.saturday, schedule.sunday);
    };
    ScheduleComponent.prototype.getDayFromForm = function () {
        if (this.scheduleForm && this.scheduleForm !== null && this.scheduleForm.controls) {
            var monday = this.scheduleForm.controls["monday"].value;
            var tuesday = this.scheduleForm.controls["tuesday"].value;
            var wednesday = this.scheduleForm.controls["wednesday"].value;
            var thursday = this.scheduleForm.controls["thursday"].value;
            var friday = this.scheduleForm.controls["friday"].value;
            var saturday = this.scheduleForm.controls["saturday"].value;
            var sunday = this.scheduleForm.controls["sunday"].value;
            return this.getDayFromBoolean(monday, tuesday, wednesday, thursday, friday, saturday, sunday);
        }
        return "";
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
    __metadata("design:paramtypes", [switch_service_1.SwitchService, forms_1.FormBuilder])
], ScheduleComponent);
exports.ScheduleComponent = ScheduleComponent;
//# sourceMappingURL=schedule.component.js.map