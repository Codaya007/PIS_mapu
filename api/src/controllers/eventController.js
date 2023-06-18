const eventService = require("../services/eventService.js");
const NotExist = require('../errors/NotExist')

module.exports = {

    getEventById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await eventService.getEventById(id);

            return res.json(result);

        } catch (error) {
            if (error instanceof NotExist) {
                return res.status(404).json({ error: error.message })
            } else {
                return res.status(400).json({ error: error.message })
            }
        }
    },

    getEventByName: async (req, res) => {
        try {
            const name = req.query.name;
            const result = await eventService.getEventByName(name);

            return res.json(result);
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    },

    getAllEvents: async (req, res) => {
        const { skip = 0, limit = 10, ...where } = req.query;

        const totalCount = await eventService.getCountEvents(where);
        const results = await eventService.getEvents(where, skip, limit);

        return res.json({ totalCount, results });
    },

    createEvent: async (req, res, next) => {
        try {
            const newEvent = await eventService.createEvent(req.body);
            return res.json(newEvent);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    updateEvent: async (req, res, next) => {
        try {
            const { id } = req.params;
            const updateBlock = await eventService.updateEventById(id, req.body);
            return res.json(updateBlock);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    deleteEvent: async (req, res, next) => {
        const { id } = req.params;
        const deleteBlock = await eventService.deleteEventById(id);

        return res.json(deleteBlock);
    },
};
