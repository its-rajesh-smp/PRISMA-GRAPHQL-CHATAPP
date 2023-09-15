const authorization = require("../../middlewares/authorization");
const prisma = require("../../prisma/client");

exports.Query = {
  getUserChats: async (_, __, { req }) => {
    const { id } = await authorization(req);
    const members = await prisma.member.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true,
        chat: {
          include: {
            // Take A member not the current user i have to show if it is not a groupChat
            members: {
              where: {
                userId: { not: id },
              },
              take: 1,
              // Include The Actual User to get the name,photo etc
              include: {
                user: true,
              },
            },
            // Fetch The Last Message To Show as Latest Message
            messages: {
              orderBy: {
                createdAt: "desc",
              },
              take: 1,
              include: {
                sender: true,
              },
            },
          },
        },
      },
    });

    console.log(members);

    return members;
  },
};
