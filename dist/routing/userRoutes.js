"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = __importDefault(require("../controllers/userController.js"));
const userRouter = (0, express_1.default)();
userRouter.get('/users', userController_js_1.default.getUsers);
exports.default = userRouter;
