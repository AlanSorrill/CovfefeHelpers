"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperTest = void 0;
function HelperTest() { }
exports.HelperTest = HelperTest;
String.prototype.replaceAt = function (index, textToInsert) {
    return this.substr(0, index) + textToInsert + this.substr(index + textToInsert.length);
};
Map.prototype.toArray = function () {
    if (this == null || this.size == 0) {
        return [];
    }
    let out = [];
    this.forEach((val, key) => {
        out.push(val);
    });
    return out;
};
Map.prototype.toArrayWithKeys = function () {
    let out = [];
    this.forEach((val, key) => {
        out.push([key, val]);
    });
    return out;
};
Array.prototype.random = function () {
    return this[Math.round(Math.random() * (this.length - 1))];
};
Array.prototype.toSubArrays = function (subArrayLength) {
    let out = [];
    let current = [];
    for (let i = 0; i < this.length; i++) {
        if (current.length < subArrayLength) {
            current.push(this[i]);
        }
        else {
            out.push(current);
            current = [this[i]];
        }
    }
    if (current.length > 0) {
        out.push(current);
    }
    return out;
};
Array.prototype.toMap = function (indexKey) {
    let out = new Map();
    let current;
    for (let i = 0; i < this.length; i++) {
        current = this[i];
        out.set(current[indexKey], current); //; = current;
    }
    return out;
};
Array.prototype.removeInPlace = function (shouldKeep) {
    let count = 0;
    for (let i = 0; i < this.length; i++) {
        if (!shouldKeep(this[i], i)) {
            this.splice(i, 1);
            count++;
        }
    }
    return count;
};
Array.prototype.pushAll = function (arr) {
    if (arr == null || typeof arr == 'undefined') {
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        this.push(arr[i]);
    }
};
if (typeof String.prototype.replaceAll == 'undefined') {
    String.prototype.replaceAll = function (a, b) {
        return this.split(a).join(b);
    };
}
if (typeof Array.prototype.first == 'undefined') {
    console.log('Shimming array.first');
    Object.defineProperty(Array.prototype, "first", {
        get: function first() {
            return this.length == 0 ? null : this[0];
        }
    });
}
if (typeof Array.prototype.last == 'undefined') {
    console.log('Shimming array.last');
    Object.defineProperty(Array.prototype, "last", {
        get: function last() {
            return this.length == 0 ? null : this[this.length - 1];
        }
    });
}
//# sourceMappingURL=UtilityHelpers.js.map