import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const SEND_FRIEND_INVITATION = gql`
  mutation SEND_FRIEND_INVITATION(
    $reciver: String!
    $invitationMessage: String
  ) {
    createFriendInvitation(
      reciver: $reciver
      invitationMessage: $invitationMessage
    ) {
      id
    }
  }
`;

function InviteUserForm() {
  const { idToken } = useSelector((state) => state.authSlice);

  const [reciverId, setReciverId] = useState("");
  const [invitationMessage, setInvitationMessage] = useState("");

  const [sendFriendInvitation] = useMutation(SEND_FRIEND_INVITATION);

  const onClickSendHandeler = async () => {
    const data = await sendFriendInvitation({
      variables: {
        reciver: reciverId,
        invitationMessage: invitationMessage,
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
    <div className=" bg-purple-100 flex  w-80 flex-col gap-2 p-5">
      <h1 className=" text-center font-extrabold text-2xl">Invite 1-1</h1>
      <input
        onChange={(e) => setReciverId(e.target.value)}
        value={reciverId}
        className="  h-10 px-2"
        type="text"
        placeholder="Friend's Id"
      />
      <input
        className="  h-10 px-2"
        type="text"
        placeholder="Invitation Message"
        value={invitationMessage}
        onChange={(e) => setInvitationMessage(e.target.value)}
      />
      <button
        onClick={onClickSendHandeler}
        className=" h-10 bg-black text-white"
      >
        SEND
      </button>
    </div>
  );
}

export default InviteUserForm;
