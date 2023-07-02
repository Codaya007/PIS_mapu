const LostPoint = require("../models/LostPoint");

const findOrCreateLostPoint = async (lostPointData) => {
    const { latitude, length } = lostPointData;

    const lostPoint = await LostPoint.findOneAndUpdate(
      { latitude, length },
      lostPointData,
      { upsert: true, new: true }
    );
  
    return lostPoint;
};

module.exports = { findOrCreateLostPoint };
