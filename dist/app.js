"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const express_1 = __importStar(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = require("swagger-ui-express");
const logger_js_1 = require("./utils/logger.js");
const config_js_1 = __importDefault(require("./config/config.js"));
const db_js_1 = require("./config/db.js");
const eventRoutes_js_1 = __importDefault(require("./routing/eventRoutes.js"));
const userRoutes_js_1 = __importDefault(require("./routing/userRoutes.js"));
const errorMiddleware_js_1 = __importDefault(require("./middleware/errorMiddleware.js"));
const swaggerConf_js_1 = __importDefault(require("./utils/swaggerConf.js"));
const passport_1 = __importDefault(require("passport"));
const authMiddleware_js_1 = require("./middleware/authMiddleware.js");
const authRouter_js_1 = __importDefault(require("./routing/authRouter.js"));
const app = (0, express_1.default)();
(0, authMiddleware_js_1.passportConfig)(passport_1.default);
app.use('/api-docs', swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(swaggerConf_js_1.default));
app.use((0, express_rate_limit_1.default)(config_js_1.default.server.rateLimiter));
app.use((0, express_1.json)());
app.use((0, cors_1.default)(config_js_1.default.server.cors));
app.use(passport_1.default.initialize());
app.use(logger_js_1.loggerMiddleware);
app.use(authRouter_js_1.default);
app.use(userRoutes_js_1.default);
app.use(eventRoutes_js_1.default);
app.use(errorMiddleware_js_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_js_1.connectDB)();
        app.listen(config_js_1.default.server.port, () => console.log(`Server run on ${config_js_1.default.server.port}`));
    }
    catch (e) {
        console.log(e);
    }
});
start();
