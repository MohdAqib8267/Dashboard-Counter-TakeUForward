import express from "express";
import { createEvent, currentEvent, getEvents,deleteEvent } from "../controllers/eventController.js";

const router = express.Router();

router.post('/event',createEvent);
router.post('/event/:id',createEvent);
router.get('/event',getEvents);
router.post('/current-event',currentEvent);
router.delete('/event/:id',deleteEvent);
// router.put('/event/:id',updateEvent);

export {router as eventRouter};