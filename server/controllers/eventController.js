import { db } from "../config/prismaConfig.js";

export const createEvent = async (req, res) => {
  const { link, description, startTimer, endTimer, status } = req.body;
  console.log(req.body)
  try {
    if (!link || !description || !startTimer || !endTimer) {
      return res.status(400).json({ error: "something is missing..." });
    }
    //check event overlapping
    const checkOverLapping = await db.event.findFirst({
      where: {
        OR: [
          {
            startTimer: {
              lte : endTimer
            },
            endTimer:{
                gte: startTimer
            }
          },
        ],
      },
    });
    if(checkOverLapping){
        return res.status(409).json({
            error:'Event is already exist at this time frame.',
            overlappingEvent:{
                startTimer: checkOverLapping.startTimer,
                endTimer: checkOverLapping.endTimer
            }
        })
    }
    // Create the event if no overlap is found
    const response = await db.event.create({
      data: { link, description, startTimer, endTimer, status },
    });
    
    res.json({ success: true, data: response });
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

export const updateEvent = async (req, res) => {
  const { link, description, startTimer, endTimer, status } = req.body;
  const { id } = req.params;
  console.log(id, link, description, startTimer, endTimer, status);
  try {
    const response = await db.event.update({
      where: {
        id: id,
      },
      data: {
        link,
        description,
        startTimer,
        endTimer,
        status,
      },
    });

    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
