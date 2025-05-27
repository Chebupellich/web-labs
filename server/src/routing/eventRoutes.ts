import { Router } from 'express';
import passport from 'passport';
import EventController from '@controllers/eventController.js';

const eventRouter = Router();

eventRouter.get('/events', EventController.getEvents);

eventRouter.get('/event', EventController.getEvent);

eventRouter.use(passport.authenticate('jwt', { session: false }));

eventRouter.post('/events', EventController.createEvent);

eventRouter.put('/events/:id', EventController.updateEvent);

eventRouter.delete('/events/:id', EventController.deleteEvent);

export default eventRouter;
