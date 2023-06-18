const Event = require("../models/Event");
const FieldExistingError = require('../errors/FieldExistingError')
const NotExist = require('../errors/NotExist')
const ValidationError = require("../errors/ValidationError");
const { isValidObjectId } = require("mongoose");

const createEvent = async (eventData) => {
    const existingEvent = await Event.findOne({ "name": eventData.name });
    if (existingEvent) throw new FieldExistingError(`El evento ya existe`)
    const event = await Event.create(eventData);

    return event;
};

const getEvents = async (where = {}, skip, limit) => {
    const events = await Event.find(where).skip(skip).limit(limit);

    return events;
};

const getEventByName = async (name) => {
    const event = await Event.findOne({ "name": name });
    if (!event) throw new NotExist("El evento no se encontro");

    return event;
};

const getEventById = async (_id) => {
    if (!isValidObjectId(_id)) throw new ValidationError("El id debe ser un ObjectId");
    const event = await Event.findOne({ _id });
    if (!event) throw new NotExist("El evento no se encontro");

    return event;
};

const getCountEvents = async (where = {}) => {
    return await Event.count(where);
};

const updateEventById = async (_id, eventData) => {
    let existingEvent = await getEventById(_id)
    existingEvent = await Event.updateOne({ _id }, eventData);

    return existingEvent;
};

const deleteEventById = async (_id) => {
    if (!isValidObjectId(_id)) throw new ValidationError("El id debe ser un ObjectId");
    const deletedEvent = await Event.findByIdAndRemove(_id);
    if (!deletedEvent) throw new ValidationError("El evento no existe");

    return deletedEvent;
};

module.exports = { createEvent, getEvents, getEventByName, getEventById, getCountEvents, updateEventById, deleteEventById };
