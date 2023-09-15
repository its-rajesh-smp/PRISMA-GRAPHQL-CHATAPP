import { useEffect } from "react";
import MyRoutes from "../Routes/MyRoutes";
import "./App.css";
import gql from "graphql-tag";
import client from "../service/service";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../store/reducers/authSlice";
import Header from "../components/Header";
import socket from "../socket/io";
import { addNewChatMessage } from "../store/reducers/currentChatSlice";
import { updateChatsWithLatestMessage } from "../store/reducers/chatSlices";

const GETUSER = gql`
  query GETUSER {
    getUser {
      name
      email
      id
      idToken
    }
  }
`;

function App() {
  const dispatch = useDispatch();
  const { authStatus } = useSelector((state) => state.authSlice);
  const { chatId } = useSelector((state) => state.currentChatSlice);

  // Getting The User With Local idToken
  useEffect(() => {
    (async () => {
      const idToken = localStorage.getItem("soho");
      if (!idToken) return;
      const { data } = await client.query({
        query: GETUSER,
        context: {
          headers: {
            Authorization: idToken,
          },
        },
      });
      dispatch(authUser(data.getUser));
      socket.emit("CONNECT_USER", data.getUser.id);
    })();
  }, []);

  function newMessageRecieveHandeler(newMessage) {
    //  If The user's current chatId is matched with the new messages's chat id then i will show in the messagebox
    if (chatId === newMessage.chat.id) {
      dispatch(addNewChatMessage(newMessage));
    }
    // Update the latest Message
    dispatch(updateChatsWithLatestMessage(newMessage));
  }

  // Reciving New Chat Messages
  useEffect(() => {
    socket.on("MESSAGE_RECIEVED", newMessageRecieveHandeler);
    return () => {
      socket.off("MESSAGE_RECIEVED", newMessageRecieveHandeler);
    };
  }, [chatId]);

  return (
    <div>
      {authStatus && <Header />}
      <div>
        <MyRoutes />
      </div>
    </div>
  );
}

export default App;
