"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor(model) {
        var _a, _b, _c, _d;
        this.id = (_a = model.id) !== null && _a !== void 0 ? _a : 0;
        this.name = (_b = model.name) !== null && _b !== void 0 ? _b : '';
        this.email = (_c = model.email) !== null && _c !== void 0 ? _c : '';
        this.createdAt = (_d = model.createdAt) !== null && _d !== void 0 ? _d : new Date();
    }
}
exports.default = UserDto;
