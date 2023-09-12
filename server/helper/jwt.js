const jwt = require("jsonwebtoken");

module.exports = {
  createJwtToken: (data) => {
    return jwt.sign(data, process.env.SECRET);
  },
  decodeToken: (idToken) => {
    try {
      return jwt.verify(idToken, process.env.SECRET);
    } catch (error) {
      throw new Error("invalid idToken");
    }
  },
};
