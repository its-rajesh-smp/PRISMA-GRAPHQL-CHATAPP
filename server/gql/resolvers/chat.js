const authorization = require("../../middlewares/authorization");
const prisma = require("../../prisma/client");

exports.Query = {
  getUserChats: async (_, __, { req }) => {
    const { id } = await authorization(req);

    const chatUsers = await prisma.chatUser.findMany({
      where: {
        userId: id,
      },
      include: {
        chat: {
          include: {
            users: {
              take: 1,
              where: {
                NOT: {
                  userId: id,
                },
              },
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return chatUsers;
  },
};
