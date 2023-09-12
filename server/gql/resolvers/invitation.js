const authorize = require("../../middlewares/authorization");
const prisma = require("../../prisma/client");

exports.Query = {};

exports.Mutation = {
  /* -------------------------------------------------------------------------- */
  /*                          CREATE FRIEND INVITATION                          */
  /* -------------------------------------------------------------------------- */
  createFriendInvitation: async (
    _,
    { reciver, invitationMessage },
    { req }
  ) => {
    const { id } = await authorize(req);

    // Find if any previous invitation present
    const isPresent = await prisma.invitation.findFirst({
      where: {
        OR: [
          { senderId: id, reciverId: reciver },
          { senderId: reciver, reciverId: id },
        ],
        isGroupInvitation: false,
      },
    });

    // if Already invitation present in between them
    if (isPresent) {
      throw new Error("A already invitation present");
    }

    // Creating The Invitation
    const invitation = await prisma.invitation.create({
      data: {
        sender: {
          connect: {
            id: id,
          },
        },
        reciver: {
          connect: {
            id: reciver,
          },
        },
        invitationMessage,
      },
      include: {
        reciver: true,
        sender: true,
      },
    });

    return invitation;
  },

  /* -------------------------------------------------------------------------- */
  /*                          ACCEPT FRIEND INVITATION                          */
  /* -------------------------------------------------------------------------- */
  acceptFriendInvitation: async (_, { invitationId }, { req }) => {
    await authorize(req);

    // get the invitation details
    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
      include: {
        sender: true,
      },
    });

    // if invitation not present
    if (!invitation) {
      throw new Error("Invitation not present");
    }

    // Creating A Chat
    const chat = await prisma.chat.create({
      data: {
        users: {
          create: [
            {
              userId: invitation.senderId,
              role: "USER",
            },
            {
              userId: invitation.reciverId,
              role: "USER",
            },
          ],
        },
      },
    });

    // Deleting The Invitation
    await prisma.invitation.delete({
      where: { id: invitation.id },
    });

    return true;
  },
};
