const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const generateNewToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: "5d",
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

// const generateNewToken = (payload) => {
//   // console.log(payload)
//   const token = jwt.sign(
//     payload,
//     JWT_SECRET,
//     {
//       expiresIn: "5d",
//     },
//     (err, token) => {
//       if (err) {
//         throw err;
//       }
//       return token;
//     }
//   );
//   console.log(token);
//   return token;
// };
module.exports = {
  generateNewToken,
};
