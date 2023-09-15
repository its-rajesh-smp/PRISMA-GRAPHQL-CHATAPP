import React from "react";
import { useState } from "react";
import { gql } from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../socket/io";
import { addNewChatMessage } from "../../store/reducers/currentChatSlice";
import { updateChatsWithLatestMessage } from "../../store/reducers/chatSlices";

const CREATE_MESSAGE = gql`
  mutation CREATE_MESSAGE($body: String!, $chat: String!) {
    createMessage(body: $body, chat: $chat) {
      id
      body
      sender {
        id
        name
        email
        photo
      }
      chat {
        id
        members {
          user {
            id
          }
        }
      }
    }
  }
`;

function CreateMessage() {
  const { chatId } = useSelector((state) => state.currentChatSlice);
  const [body, setBody] = useState("");
  const [createMessage, { loading }] = useMutation(CREATE_MESSAGE);
  const { idToken, name, id } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  // On Click Create Chat Handeler
  const createChatHandeler = async () => {
    const { data } = await createMessage({
      variables: {
        body,
        chat: chatId,
      },
      context: {
        headers: {
          Authorization: idToken,
        },
      },
    });

    socket.emit("NEW_MESSAGE", data.createMessage);

    //Showing Locally in my own ui
    dispatch(
      addNewChatMessage({
        id: data.createMessage.id,
        body,
        sender: {
          id,
          name,
        },
      })
    );

    // Updating The latest Message
    dispatch(
      updateChatsWithLatestMessage({
        chat: {
          id: chatId,
        },
        body,
        sender: {
          id,
          name,
        },
      })
    );
  };

  return (
    <div className=" mt-auto w-full flex gap-2 bg-green-200 p-1 ">
      <input
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className=" px-2 w-full"
        type="text"
        placeholder="Enter Message"
      />
      <button
        disabled={loading}
        onClick={createChatHandeler}
        className=" bg-black text-white px-2 h-10"
      >
        {loading ? "..." : "SEND"}
      </button>
    </div>
  );
}

export default CreateMessage;
