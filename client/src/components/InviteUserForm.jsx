import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlurWrapper from "./Wrapper & Cards/BlurWrapper";
import { AiOutlineClose } from "react-icons/ai";
import { showInviteUserForm } from "../store/reducers/homePageSlice";

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
  const dispatch = useDispatch();

  // On Click Submit button send friend invitation
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
    <BlurWrapper>
      <div className=" rounded-md bg-purple-100 flex  w-80 flex-col gap-2 p-5">
        <div className=" font-extrabold text-2xl flex justify-between">
          <h1>Invite 1-1</h1>
          <AiOutlineClose
            className=" cursor-pointer"
            onClick={() => dispatch(showInviteUserForm())}
          />
        </div>
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
    </BlurWrapper>
  );
}

export default InviteUserForm;
