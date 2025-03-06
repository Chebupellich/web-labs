"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiErrors_js_1 = require("../errors/apiErrors.js");
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokenService_js_1 = __importDefault(require("./tokenService.js"));
const userDto_js_1 = __importDefault(require("../dtos/userDto.js"));
const config_js_1 = __importDefault(require("../config/config.js"));
class UserService {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userModel_js_1.default.findAll();
            const userDtos = users.map(user => new userDto_js_1.default(user));
            return userDtos;
        });
    }
    createUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield userModel_js_1.default.findOne({ where: { email } });
            if (existingUser) {
                return existingUser;
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            yield userModel_js_1.default.create({
                name,
                email,
                password: hashedPassword,
                failedAttempts: 0,
            });
            return null;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield userModel_js_1.default.findOne({
                where: { email: email },
            });
            if (!existingUser) {
                throw new apiErrors_js_1.AuthorizationError('Incorrect login or password');
            }
            if (existingUser.lockedUntil &&
                new Date() < new Date(existingUser.lockedUntil)) {
                throw new apiErrors_js_1.ForbiddenError(`Account is locked. Try again after ${existingUser.lockedUntil}`);
            }
            const isPasswordsEqual = yield bcrypt_1.default.compare(password, existingUser.password);
            if (!isPasswordsEqual) {
                existingUser.failedAttempts += 1;
                if (existingUser.failedAttempts >= config_js_1.default.auth.maxFailedAttempts) {
                    existingUser.lockedUntil = new Date(Date.now() + config_js_1.default.auth.lockTime);
                    existingUser.failedAttempts = 0;
                }
                yield existingUser.save();
                throw new apiErrors_js_1.AuthorizationError('Incorrect login or password');
            }
            const token = yield tokenService_js_1.default.GenerateToken(existingUser.id);
            const userDto = new userDto_js_1.default(existingUser);
            return {
                user: userDto,
                token: token,
            };
        });
    }
}
exports.default = new UserService();
