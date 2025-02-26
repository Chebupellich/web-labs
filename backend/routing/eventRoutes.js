import Router from "express"
import EventController from "../controllers/eventController.js"
import passport from "passport"

const eventRouter = new Router()


eventRouter.get('/events', EventController.getEvents)

eventRouter.get('/events/:eventId', EventController.getEvent)


eventRouter.use(passport.authenticate('jwt', { session: false }))

eventRouter.post('/events', EventController.createEvent)

eventRouter.put('/events/:eventId', EventController.updateEvent)

eventRouter.delete('/events/:eventId', EventController.deleteEvent)


export default eventRouter