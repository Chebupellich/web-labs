import { Router } from 'express';
import passport from 'passport';
import EventController from '@controllers/eventController';

const eventRouter = Router();

eventRouter.get('/events', EventController.getEvents);

eventRouter.get('/event', EventController.getEvent);

eventRouter.get('/category', EventController.getCategories);

eventRouter.use(passport.authenticate('jwt', { session: false }));

eventRouter.post('/events', EventController.createEvent);

eventRouter.put('/events/:eventId', EventController.updateEvent);

eventRouter.delete('/events/:eventId', EventController.deleteEvent);

eventRouter.post('/category', EventController.createCategory);

export default eventRouter;
