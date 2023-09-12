import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { gql } from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

const CREATE_MESSAGE = gql`
  mutation CREATE_MESSAGE($body: String!, $chat: String!) {
    createMessage(body: $body, chat: $chat) {
      id
      body
    }
  }
`;

function CreateMessage() {
  const { id: chatId } = useParams();
  const [body, setBody] = useState("");
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const { idToken } = useSelector((state) => state.authSlice);

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

    console.log(data);
  };

  return (
    <div className=" w-fit flex flex-col gap-2 bg-green-200 p-5">
      <h1 className=" text-2xl font-bold text-center">SEND MESSAGE</h1>
      <div className=" flex gap-5">
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className=" px-2"
          type="text"
          placeholder="Enter Message"
        />
        <button onClick={createChatHandeler} className=" bg-gray-200 px-2 h-10">
          SEND
        </button>
      </div>
    </div>
  );
}

export default CreateMessage;
