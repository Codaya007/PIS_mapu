const eventService = require("../services/eventService.js");
const NotExist = require('../errors/NotExist')

module.exports = {

    getEventById: async (req, res) => {
            const { id } = req.params;
            const result = await eventService.getEventById(id);

            return res.json(result); 
    },

    getAllEvents: async (req, res) => {
        const { skip = 0, limit = 10, ...where } = req.query;

        const totalCount = await eventService.getCountEvents(where);
        const results = await eventService.getEvents(where, skip, limit);

        return res.json({ totalCount, results });
    },

    createEvent: async (req, res, next) => {
            const newEvent = await eventService.createEvent(req.body);
            return res.json(newEvent);
    },

    updateEvent: async (req, res, next) => {
            const { id } = req.params;
            const updateBlock = await eventService.updateEventById(id, req.body);
            return res.json(updateBlock);
    },

    deleteEvent: async (req, res, next) => {
        const { id } = req.params;
        const deleteBlock = await eventService.deleteEventById(id);

        return res.json(deleteBlock);
    },
};
