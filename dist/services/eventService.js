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
const eventModel_js_1 = __importDefault(require("../models/eventModel.js"));
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const categoryModel_js_1 = __importDefault(require("../models/categoryModel.js"));
const apiErrors_js_1 = require("../errors/apiErrors.js");
class EventService {
    static getEvents(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield eventModel_js_1.default.findAll({
                where: categoryId ? { categoryId } : { categoryId: null },
                include: [
                    {
                        model: categoryModel_js_1.default,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: userModel_js_1.default,
                        attributes: ['id', 'name'],
                    },
                ],
            });
            return events;
        });
    }
    static getEvent(eventId, eventTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (eventId) {
                filter.id = eventId;
            }
            if (eventTitle && eventTitle.trim() !== '') {
                filter.title = eventTitle;
            }
            const event = yield eventModel_js_1.default.findOne({
                where: filter,
                include: [
                    {
                        model: userModel_js_1.default,
                        attributes: ['id', 'name'],
                    },
                ],
            });
            return event || {};
        });
    }
    static createEvent(title, description, date, createdBy, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (categoryId) {
                const category = yield categoryModel_js_1.default.findOne({
                    where: { id: categoryId },
                });
                if (!category) {
                    throw new apiErrors_js_1.NotFoundError(`category ${categoryId} not exists`);
                }
            }
            const newEvent = yield eventModel_js_1.default.create({
                title,
                description,
                date,
                createdBy,
                categoryId,
            });
            return newEvent;
        });
    }
    static updateEvent(eventId, title, description, date, createdBy, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield eventModel_js_1.default.findOne({ where: { id: eventId } });
            if (!event) {
                throw new apiErrors_js_1.NotFoundError('requested user not found');
            }
            if (categoryId) {
                const category = yield categoryModel_js_1.default.findOne({
                    where: { id: categoryId },
                });
                if (!category) {
                    throw new apiErrors_js_1.NotFoundError(`category ${categoryId} not exists`);
                }
            }
            event.id = Number(eventId) || event.id;
            event.title = title || event.title;
            event.description = description || event.description;
            event.date = date || event.date;
            event.createdBy = createdBy || event.createdBy;
            event.categoryId = categoryId || event.categoryId;
            yield event.save();
            return event;
        });
    }
    static deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield eventModel_js_1.default.findOne({ where: { id } });
            if (!event) {
                return null;
            }
            const deleteRes = yield event.destroy();
            return deleteRes;
        });
    }
}
exports.default = EventService;
