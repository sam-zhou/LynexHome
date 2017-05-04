"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var deserializable_model_1 = require("./deserializable.model");
var User = (function (_super) {
    __extends(User, _super);
    function User(userObject) {
        var _this = _super.call(this) || this;
        if (userObject) {
            if (userObject.id) {
                _this.id = userObject.id;
            }
            if (userObject.name) {
                _this.name = userObject.name;
            }
            if (userObject.email) {
                _this.email = userObject.email;
            }
            if (userObject.phone) {
                _this.phone = userObject.phone;
            }
        }
        return _this;
    }
    User.prototype.isAuthenticated = function () { return this.id !== null; };
    ;
    return User;
}(deserializable_model_1.Deserializable));
exports.User = User;
//# sourceMappingURL=user.model.js.map