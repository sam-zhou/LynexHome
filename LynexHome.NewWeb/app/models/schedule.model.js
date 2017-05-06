"use strict";
var Schedule = (function () {
    function Schedule() {
        this.sTime = new ScheduleTime();
        this.eTime = new ScheduleTime();
    }
    return Schedule;
}());
exports.Schedule = Schedule;
var ScheduleTime = (function () {
    function ScheduleTime() {
        this.hour = 0;
        this.minute = 0;
    }
    return ScheduleTime;
}());
exports.ScheduleTime = ScheduleTime;
var ScheduleFrequency;
(function (ScheduleFrequency) {
    ScheduleFrequency[ScheduleFrequency["Once"] = 1] = "Once";
    ScheduleFrequency[ScheduleFrequency["Daily"] = 2] = "Daily";
    ScheduleFrequency[ScheduleFrequency["Workdays"] = 3] = "Workdays";
    ScheduleFrequency[ScheduleFrequency["Weekends"] = 4] = "Weekends";
    ScheduleFrequency[ScheduleFrequency["Weekly"] = 10] = "Weekly";
    ScheduleFrequency[ScheduleFrequency["Monthly"] = 20] = "Monthly";
    ScheduleFrequency[ScheduleFrequency["Quaterly"] = 25] = "Quaterly";
    ScheduleFrequency[ScheduleFrequency["Yearly"] = 30] = "Yearly";
})(ScheduleFrequency = exports.ScheduleFrequency || (exports.ScheduleFrequency = {}));
//# sourceMappingURL=schedule.model.js.map