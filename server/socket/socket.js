const { Server } = require("socket.io");

const connectedUsers = new Map();

function initializeSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    // When a user connect we recive userId and store that in the connectedUsers set
    socket.on("CONNECT_USER", (userId) => {
      console.log("user is connected");
      socket.join(userId);
    });

    socket.on("NEW_MESSAGE", (newMessage) => {
      newMessage.chat.members.forEach((chatUser) => {
        const userId = chatUser.user.id;
        if (newMessage.sender.id === userId) return;
        socket.in(userId).emit("MESSAGE_RECIEVED", newMessage);
      });
    });

    socket.on("disconnect", (socket) => {
      console.log("user is disconnected");
    });
  });
}

module.exports = initializeSocket;
