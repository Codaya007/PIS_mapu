const LostPoint = require("../models/LostPoint");

const findOrCreateBlock = async (blockData) => {
    const { latitude, longitude } = blockData;

    const lostPoint = await LostPoint.findOneAndUpdate(
      { latitude, longitude },
      blockData,
      { upsert: true, new: true }
    );
  
    return lostPoint;
};

module.exports = { findOrCreateBlock };
