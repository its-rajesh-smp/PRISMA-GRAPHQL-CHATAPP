const bcrypt = require("bcrypt");
const prisma = require("../../prisma/client");
const jwt = require("../../helper/jwt");

exports.Query = {
  /* -------------------------------------------------------------------------- */
  /*                                  GET USER                                  */
  /* -------------------------------------------------------------------------- */
  getUser: async (_, __, context) => {
    const idToken = context.req.headers.authorization;

    const { email, password } = jwt.decodeToken(idToken);

    // Finding User
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        InvitationRecived: {
          include: {
            reciver: true,
            sender: true,
          },
        },
        InvitationSended: {
          include: {
            reciver: true,
            sender: true,
          },
        },
      },
    });

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
  },
};

exports.Mutation = {
  /* -------------------------------------------------------------------------- */
  /*                               CREATE NEW USER                              */
  /* -------------------------------------------------------------------------- */
  createUser: async (_, { createUserInput }) => {
    const { email, password } = createUserInput;

    // Check If User Already present
    const isPresent = await prisma.user.findUnique({
      where: { email },
    });

    // If Aleady User Exist thorow an error
    if (isPresent) {
      throw new Error("User already exists");
    }

    // creating hashPassword
    const hash = bcrypt.hashSync(password, Number(process.env.SALT));

    // Creating The User
    const user = await prisma.user.create({
      data: {
        ...createUserInput,
        password: hash,
      },
    });

    // Creating idToken
    const idToken = jwt.createJwtToken({ email, password });

    return { ...user, idToken };
  },

  /* -------------------------------------------------------------------------- */
  /*                                 LOGIN USER                                 */
  /* -------------------------------------------------------------------------- */
  registerUser: async (_, { email, password }) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // if User not present
    if (!user) {
      throw new Error("User Not exists");
    }

    // Compare hash
    const compareHash = bcrypt.compareSync(password, user.password);

    // if password comarision failed
    if (!compareHash) {
      throw new Error("Password not matched");
    }

    // Creating idToken
    const idToken = jwt.createJwtToken({ email, password });

    return { ...user, idToken };
  },
};
