const bcrypt = require("bcrypt");
const prisma = require("../prisma/client");
const jwt = require("../helper/jwt");

module.exports = async (req) => {
  const idToken = req.headers.authorization;
  const { email, password } = jwt.decodeToken(idToken);

  // Finding User
  const user = await prisma.user.findUnique({ where: { email } });

  // if user not present
  if (!user) {
    throw new Error("idToken not valid");
  }

  // Compare hash
  const compareHash = bcrypt.compareSync(password, user.password);

  // if password comarision failed
  if (!compareHash) {
    throw new Error("idToken not valid");
  }

  return { ...user, idToken };
};
