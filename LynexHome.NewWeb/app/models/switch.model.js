"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var deserializable_model_1 = require("./deserializable.model");
var Switch = (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Switch;
}(deserializable_model_1.Deserializable));
exports.Switch = Switch;
var SwitchType;
(function (SwitchType) {
    SwitchType[SwitchType["Unknown"] = 0] = "Unknown";
    SwitchType[SwitchType["Normal"] = 1] = "Normal";
    SwitchType[SwitchType["PowerMonitoring"] = 2] = "PowerMonitoring";
    SwitchType[SwitchType["TempHumMonitoring"] = 3] = "TempHumMonitoring";
    SwitchType[SwitchType["SafeValtage"] = 4] = "SafeValtage";
})(SwitchType = exports.SwitchType || (exports.SwitchType = {}));
var Icon = (function () {
    function Icon() {
    }
    return Icon;
}());
exports.Icon = Icon;
//# sourceMappingURL=switch.model.js.map