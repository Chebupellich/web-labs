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
const userService_js_1 = __importDefault(require("../services/userService.js"));
class UserController {
    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Get a list of users
     *     description: Fetch a list of all users in the system.
     *     responses:
     *       200:
     *         description: A list of users
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     *       500:
     *         description: Internal server error
     */
    static getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService_js_1.default.getUsers();
                res.status(200).json(users);
            }
            catch (e) {
                next(e);
            }
        });
    }
    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Create a new user
     *     description: Create a new user by providing the necessary details (name and email).
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The name of the user
     *               email:
     *                 type: string
     *                 description: The email of the user
     *     responses:
     *       201:
     *         description: User created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       400:
     *         description: Bad request, missing fields or user already exists
     *       500:
     *         description: Internal server error
     */
    static registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                if (!name || !email || !password) {
                    res.status(400).json({
                        message: 'invalid input. required fields: name, email, password',
                    });
                    return;
                }
                const existingUser = yield userService_js_1.default.createUser(name, email, password);
                if (existingUser) {
                    res.status(400).json({ message: 'user already exists' });
                    return;
                }
                res.status(201).json({ message: 'registration successful' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(400).json({
                        message: 'invalid input. required fields: email, password',
                    });
                    return;
                }
                const userData = yield userService_js_1.default.login(email, password);
                res.status(200).json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = UserController;
