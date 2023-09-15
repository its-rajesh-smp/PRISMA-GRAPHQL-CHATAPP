const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    password: String
    photo: String
    idToken: String

    invitationSended: [Invitation]
    invitationRecived: [Invitation]
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    photo: String
  }

  type Invitation {
    id: ID
    sender: User!
    reciver: User!

    isGroupInvitation: Boolean
    invitationMessage: String
  }

  type Chat {
    id: ID
    isGroup: Boolean
    groupImage: String
    groupName: String
    members: [Member]
    messages: [Message]
  }

  type Member {
    id: ID
    user: User
    chat: Chat
    role: String
  }

  type Message {
    id: ID
    body: String
    sender: User
    chat: Chat
  }

  type Query {
    getUser: User

    # Chats
    getUserChats: [Member]

    # Messages
    getAllMessages(chatId: String!): [Message]
  }

  type Mutation {
    # User
    createUser(createUserInput: CreateUserInput): User
    registerUser(password: String!, email: String!): User

    #Invitations
    createFriendInvitation(
      reciver: String!
      invitationMessage: String
    ): Invitation
    acceptFriendInvitation(invitationId: String!): Boolean

    # Message
    createMessage(body: String!, chat: String!): Message
  }
`;

module.exports = typeDefs;
