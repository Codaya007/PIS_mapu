const Event = require("../models/Event");
const FieldExistingError = require('../errors/FieldExistingError')
const NotExist = require('../errors/NotExist')

const createEvent = async (eventData) => {
    const existingEvent = await getEventByName(eventData.name)
    if (existingEvent) {
        throw new FieldExistingError(`El evento ya existe`)
    }

    const event = await Event.create(eventData);

    return event;
};

const getEvents = async (where = {}, skip, limit) => {
    const events = await Event.find(where).skip(skip).limit(limit);

    return events;
};

const getEventByName = async (name) => {
    const event = await Event.findOne({ "name": name });
    
    return event;
};

const getCountEvent = async (where = {}) => {
    return await Event.count(where);
};

const updateEventByName = async (name, eventData) => {
    const existingEvent = await getEventByName(name)
    if (existingEvent == null) {
        throw new NotExist(`El evento ${name} no existe`)
    }

    const event = await Event.findOneAndUpdate({ "name": name }, eventData, { new: true });

    return event;
};

const deleteEventByName = async (name) => {
    const event = await Event.deleteOne({ "name": name });

    return event;
};

module.exports = {createEvent, getEvents, getEventByName, getCountEvent, updateEventByName, deleteEventByName};
