const ApiError = require('../errors/api-error');
const EventModel = require('../models/event-model');
const userModel = require('../models/user-model');

class EventController {

    /**
     * @swagger
     * /events:
     *   get:
     *     summary: Получить все события
     *     tags: [Events]
     *     parameters:
     *       - name: category
     *         in: query
     *         description: Категория событий
     *         required: false
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Список событий
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Event'
     *       400:
     *         description: Ошибка запроса
     */
    async getEvents(req, res, next) {
        try {
            const { category } = req.body;
            const filter = {};

            if (category) {
                filter.category = category;
            }

            const events = await EventModel.findAll({
                where: filter,
                include: [{
                    model: require('../models/user-model'),
                    attributes: ['id', 'name']
                }]
            });

            if (!events || events.length == 0) {
                return next(ApiError.BadRequest('event not found'));
            }

            return res.json(events);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /events/{id}:
     *   get:
     *     summary: Получить событие по ID
     *     tags: [Events]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID события
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Детали события
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Event'
     *       400:
     *         description: Событие не найдено
     */
    async getEvent(req, res, next) {
        try {
            const { id } = req.params;

            const event = await EventModel.findOne({
                where: { id },
                include: [{
                    model: require('../models/user-model'),
                    attributes: ['id', 'name']
                }]
            });

            if (!event) {
                return next(ApiError.BadRequest('event not found'));
            }

            return res.json(event);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /events:
     *   post:
     *     summary: Создать новое событие
     *     tags: [Events]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Event'
     *     responses:
     *       201:
     *         description: Событие успешно создано
     *       400:
     *         description: Ошибка в запросе
     */
    async createEvent(req, res, next) {
        try {
            const { title, description, date, createdBy, category } = req.body;

            if (!title || !date || !createdBy || !category) {
                return next(ApiError.badRequest('title, date, createdBy, and category are required'));
            }

            const validCategories = ['концерт', 'лекция', 'выставка'];
            if (!validCategories.includes(category)) {
                return next(ApiError.BadRequest('invalid category'));
            }

            const user = await userModel.findOne({ where: { id: createdBy } });
            if (!user) {
                return next(ApiError.BadRequest('user not found'));
            }

            const eventDate = new Date(date);
            if (isNaN(eventDate.getTime())) {
                return next(ApiError.badRequest('wrong date format'));
            }

            const newEvent = await EventModel.create({
                title,
                description,
                date,
                createdBy,
                category
            });

            return res.status(201).json(newEvent);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /events/{id}:
     *   put:
     *     summary: Обновить событие по ID
     *     tags: [Events]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID события
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Event'
     *     responses:
     *       200:
     *         description: Событие обновлено
     *       400:
     *         description: Ошибка запроса
     *       404:
     *         description: Событие не найдено
     */
    async updateEvent(req, res, next) {
        try {
            const { id } = req.params;
            const { title, description, date, createdBy, category } = req.body;

            const event = await EventModel.findOne({ where: { id } });
            if (!event) {
                return next(ApiError.BadRequest('event not found'));
            }

            if (category) {
                const validCategories = ['концерт', 'лекция', 'выставка'];
                if (!validCategories.includes(category)) {
                    return next(ApiError.BadRequest('invalid category'));
                }
                event.category = category;
            }

            event.title = title || event.title;
            event.description = description || event.description;
            event.date = date || event.date;
            event.createdBy = createdBy || event.createdBy;

            await event.save();

            return res.json(event);
        } catch (e) {
            next(e);
        }
    }

    /**
     * @swagger
     * /events/{id}:
     *   delete:
     *     summary: Удалить событие по ID
     *     tags: [Events]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID события
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Событие удалено
     *       400:
     *         description: Ошибка запроса
     */
    async deleteEvent(req, res, next) {
        try {
            const { id } = req.params;

            const event = await EventModel.findOne({ where: { id } });

            if (!event) {
                return next(ApiError.BadRequest('event not found'));
            }

            await event.destroy();

            return res.status(200).send();
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new EventController();
