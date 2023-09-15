import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import CreateMessage from "../components/ChatBox/CreateMessage";
import gql from "graphql-tag";
import Message from "../components/Message";

const GET_ALL_MESSAGES = gql`
  query GET_ALL_MESSAGES($chatId: String!) {
    getAllMessages(chatId: $chatId) {
      id
      body
      sender {
        name
        id
      }
    }
  }
`;

function MessagePage() {
  const { id } = useParams();

  const { data, loading } = useQuery(GET_ALL_MESSAGES, {
    variables: {
      chatId: id,
    },
  });

  console.log(data);

  return (
    <div>
      <CreateMessage />
      <div>
        {!loading &&
          data.getAllMessages &&
          data.getAllMessages.map((message) => {
            return (
              <Message
                key={message.id}
                sender={message.sender}
                body={message.body}
              />
            );
          })}
      </div>
    </div>
  );
}

export default MessagePage;
