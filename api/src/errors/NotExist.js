class NotExist extends Error {
    constructor(message) {
      super(message);
      this.name = "NotExist";
    }
  }
  
  module.exports = NotExist;
  