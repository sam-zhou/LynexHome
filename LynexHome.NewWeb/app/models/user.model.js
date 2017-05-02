"use strict";
var User = (function () {
    function User(userObject) {
        if (userObject) {
            if (userObject.id) {
                this.id = userObject.id;
            }
            if (userObject.name) {
                this.name = userObject.name;
            }
            if (userObject.email) {
                this.email = userObject.email;
            }
            if (userObject.phone) {
                this.phone = userObject.phone;
            }
        }
    }
    User.prototype.isAuthenticated = function () { return this.id !== null; };
    ;
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.model.js.map