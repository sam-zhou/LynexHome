"use strict";
var Deserializable = (function () {
    function Deserializable() {
    }
    Deserializable.prototype.deserialize = function (input) {
        var instance = this;
        for (var prop in input) {
            if (!input.hasOwnProperty(prop)) {
                continue;
            }
            else {
                if (typeof input[prop] === 'object') {
                    instance[prop] = instance[prop].deserialize(input[prop]);
                }
                else {
                    instance[prop] = input[prop];
                }
            }
        }
        return instance;
    };
    return Deserializable;
}());
exports.Deserializable = Deserializable;
//# sourceMappingURL=deserializable.model.js.map