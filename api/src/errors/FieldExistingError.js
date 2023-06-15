class FieldExistingError extends Error {
    constructor(message) {
      super(message);
      this.name = "FieldExistingError";
    }
  }
  
  module.exports = FieldExistingError;
  