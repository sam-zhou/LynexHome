"use strict";
function greaterThan(firstControlName, secondControlName) {
    return function (group) {
        console.log("checking");
        var sH = group.controls[firstControlName].value.hour;
        var sM = group.controls[firstControlName].value.minute;
        var eH = group.controls[secondControlName].value.hour;
        var eM = group.controls[secondControlName].value.minute;
        if (eH < sH || (eH == sH && eM <= sM)) {
            console.log("failed");
            return {
                greaterThan: true
            };
        }
        console.log("sucessed");
        return null;
    };
}
exports.greaterThan = greaterThan;
//# sourceMappingURL=validators.js.map