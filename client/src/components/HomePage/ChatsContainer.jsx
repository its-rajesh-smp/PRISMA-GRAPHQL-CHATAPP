import React from "react";
import ChatItem from "./UI/ChatItem";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import gql from "graphql-tag";
import { setChats } from "../../store/reducers/chatSlices";

const GETALLUSERCHATS = gql`
  query GETALLUSERCHATS {
    getUserChats {
      id
      user {
        id
        name
        email
        photo
      }
      chat {
        id
        isGroup
        messages {
          body
          sender {
            name
          }
        }
        members {
          user {
            id
            name
            photo
            email
          }
        }
      }
    }
  }
`;

function ChatsContainer() {
  const { idToken } = useSelector((state) => state.authSlice);
  const { chats } = useSelector((state) => state.chatSlice);
  const dispatch = useDispatch();

  useQuery(GETALLUSERCHATS, {
    context: {
      headers: {
        Authorization: idToken,
      },
    },
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log(data);
      dispatch(setChats(data.getUserChats));
    },
  });

  return (
    <div className="  gap-1 flex flex-col  bg-slate-200 h-full">
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          id={chat.id}
          name={chat.chatName}
          latestMessageBody={chat.latestMessageBody}
          latestMessageSender={chat.latestMessageSender}
          image={chat.chatImage}
        />
      ))}
    </div>
  );
}

export default ChatsContainer;
