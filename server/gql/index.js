const user = require("../gql/resolvers/user");
const invitation = require("../gql/resolvers/invitation");
const chat = require("./resolvers/chat");
const message = require("./resolvers/message");

module.exports = {
  Query: {
    ...user.Query,
    ...chat.Query,
    ...message.Query,
  },
  Mutation: {
    ...user.Mutation,
    ...invitation.Mutation,
    ...message.Mutation,
  },
};
