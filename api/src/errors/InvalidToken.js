class InvalidToken extends Error {
    constructor(message) {
      super(message);
      this.name = "InvalidToken";
      this.status = 498;
    }
  }
  
module.exports = InvalidToken;