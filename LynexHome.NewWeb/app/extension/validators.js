"use strict";
function greaterThan() {
    return function (group) {
        console.log("checking");
        var sH = group.get("sTime").value.hour;
        var sM = group.get("sTime").value.minute;
        var eH = group.get("eTime").value.hour;
        var eM = group.get("eTime").value.minute;
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