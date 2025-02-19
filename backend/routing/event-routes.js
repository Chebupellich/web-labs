const { Router } = require('express')
const eventRouter = new Router()

const eventController = require('../controllers/event-controller')

eventRouter.get('/events', eventController.getEvents)

eventRouter.get('/events/:id', eventController.getEvent)

eventRouter.post('/events', eventController.createEvent)

eventRouter.put('/events/:id', eventController.updateEvent)

eventRouter.delete('/events/:id', eventController.deleteEvent)


module.exports = eventRouter