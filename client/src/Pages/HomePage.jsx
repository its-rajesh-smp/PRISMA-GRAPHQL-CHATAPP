import gql from "graphql-tag";
import React from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import InviteUserForm from "../components/InviteUserForm";
import ChatItem from "../components/ChatItem";

const GETALLUSERCHATS = gql`
  query GETALLUSERCHATS {
    getUserChats {
      id
      chat {
        isGroup
        id
        users {
          role
          user {
            email
            name
          }
        }
      }
    }
  }
`;

function HomePage() {
  const { idToken } = useSelector((state) => state.authSlice);

  const { data, loading } = useQuery(GETALLUSERCHATS, {
    context: {
      headers: {
        Authorization: idToken,
      },
    },
  });

  console.log(data);

  return (
    <div>
      <InviteUserForm />
      {!loading &&
        data.getUserChats.map((chatUser) => {
          const chatImage = chatUser.chat.chatImage
            ? chatUser.chat.chatImage
            : chatUser.chat.users[0].user.photo;

          const chatName = chatUser.chat.chatImage
            ? chatUser.chat.chatImage
            : chatUser.chat.users[0].user.name;

          return (
            <ChatItem
              id={chatUser.chat.id}
              chatImage={chatImage}
              chatName={chatName}
              isGroup={chatUser.isGroup}
              key={chatUser.id}
            />
          );
        })}
    </div>
  );
}

export default HomePage;
