"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_js_1 = __importDefault(require("../controllers/eventController.js"));
const passport_1 = __importDefault(require("passport"));
const eventRouter = (0, express_1.Router)();
eventRouter.get('/events', eventController_js_1.default.getEvents);
eventRouter.get('/events/:eventId', eventController_js_1.default.getEvent);
eventRouter.use(passport_1.default.authenticate('jwt', { session: false }));
eventRouter.post('/events', eventController_js_1.default.createEvent);
eventRouter.put('/events/:eventId', eventController_js_1.default.updateEvent);
eventRouter.delete('/events/:eventId', eventController_js_1.default.deleteEvent);
exports.default = eventRouter;
