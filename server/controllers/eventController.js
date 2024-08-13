import { db } from "../config/prismaConfig.js";

export const createEvent = async (req, res) => {
    const { link, description, startTimer, endTimer, status } = req.body;
    const { id } = req.params;
  
    try {
      if (!link || !description || !startTimer || !endTimer) {
        return res.status(400).json({ error: "Something is missing..." });
      }
  
      
      const startTime = new Date(startTimer);
      const endTime = new Date(endTimer);
  
      // Check for overlapping events
      const checkOverLapping = await db.event.findFirst({
        where: {
          OR: [
            {
              startTimer: {
                lte: endTime,
              },
              endTimer: {
                gte: startTime,
              },
            },
          ],
          NOT: {
            id: id || undefined, 
          },
        },
      });
  
      if (checkOverLapping) {
        return res.status(409).json({
          error: "Event already exists in this time frame.",
          overlappingEvent: {
            startTimer: checkOverLapping.startTimer,
            endTimer: checkOverLapping.endTimer,
          },
        });
      }
  
      let response;
      if (id) {
        // Update the event if id is provided
        response = await db.event.update({
          where: { id: id },
          data: { link, description, startTimer: startTime, endTimer: endTime, status },
        });
      } else {
        // Create the event if no id is provided
        response = await db.event.create({
          data: { link, description, startTimer: startTime, endTimer: endTime, status },
        });
      }
  
      res.status(200).json({ success: true, data: response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  };
  

export const getEvents = async (req, res) => {
  try {
    const response = await db.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json({ success: true, data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const currentEvent = async (req, res) => {
  const { now } = req.body;
  console.log(now);
  try {
    const response = await db.event.findFirst({
      where: {
        startTimer: {
          lte: now, // startTimer <= now
        },
        endTimer: {
          gte: now, // endTimer >= now
        },
        status: true,
      },
      orderBy: {
        startTimer: "asc",
      },
    });
    return res.json({ success: true, data: response });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};


