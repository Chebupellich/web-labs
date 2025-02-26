import Router from "express"
import EventController from "../controllers/eventController.js"

const eventRouter = new Router()

eventRouter.get('/events', EventController.getEvents)

eventRouter.get('/events/:eventId', EventController.getEvent)

eventRouter.post('/events', EventController.createEvent)

eventRouter.put('/events/:eventId', EventController.updateEvent)

eventRouter.delete('/events/:eventId', EventController.deleteEvent)


export default eventRouter