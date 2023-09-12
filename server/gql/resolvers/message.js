const authorize = require("../../middlewares/authorization");
const prisma = require("../../prisma/client");

exports.Mutation = {
  createMessage: async (_, { body, chat }, { req }) => {
    const { id } = await authorize(req);

    const message = await prisma.message.create({
      data: {
        body,
        chatId: chat,
        senderId: id,
      },
    });

    return message;
  },
};

exports.Query = {
  getAllMessages: async (_, { chatId }) => {
    const messages = await prisma.message.findMany({
      where: {
        chatId,
      },
      include: {
        sender: true,
      },
    });

    return messages;
  },
};
