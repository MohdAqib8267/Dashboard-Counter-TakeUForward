import express from "express";
import { createEvent, currentEvent, getEvents, updateEvent } from "../controllers/eventController.js";

const router = express.Router();

router.post('/event',createEvent);
router.get('/event',getEvents);
router.post('/current-event',currentEvent);
router.put('/event/:id',updateEvent);

export {router as eventRouter};