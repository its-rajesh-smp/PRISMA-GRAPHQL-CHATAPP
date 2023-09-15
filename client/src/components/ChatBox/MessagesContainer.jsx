import React, { useEffect } from "react";

import gql from "graphql-tag";
import client from "../../service/service";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message";
import { setCurrentChatMessages } from "../../store/reducers/currentChatSlice";
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

function MessagesContainer() {
  const { messages, chatId } = useSelector((state) => state.currentChatSlice);
  const dispatch = useDispatch();

  // Fetching Messagess From Current Chat using currentChatID
  useEffect(() => {
    if (!chatId) return;
    (async () => {
      const { data } = await client.query({
        query: GET_ALL_MESSAGES,
        variables: {
          chatId,
        },
      });
      dispatch(setCurrentChatMessages(data.getAllMessages));
    })();
  }, [chatId]);

  return (
    <div className="hideScrollBar p-4 flex flex-col gap-2 overflow-scroll">
      {messages.map((message) => {
        return (
          <Message
            key={message.id}
            body={message.body}
            sender={message.sender}
          />
        );
      })}
    </div>
  );
}

export default MessagesContainer;
