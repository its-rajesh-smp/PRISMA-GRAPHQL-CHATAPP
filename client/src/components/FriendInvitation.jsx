import gql from "graphql-tag";
import React from "react";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

const ACCEPT_FRIEND_INVITATION = gql`
  mutation ACCEPT_FRIEND_INVITATION($invitationId: String!) {
    acceptFriendInvitation(invitationId: $invitationId)
  }
`;

function FriendInvitation({ sended, user, id, message }) {
  const [acceptFriendInvitation] = useMutation(ACCEPT_FRIEND_INVITATION);
  const { idToken } = useSelector((state) => state.authSlice);

  const onClickAcceptBtnHandeler = async () => {
    const { data } = await acceptFriendInvitation({
      variables: {
        invitationId: id,
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
    <div className=" flex gap-4">
      {sended && <h1>YOU SENDED</h1>}
      <h1 className=" font-extrabold">{user.name}</h1>
      <h1>{message}</h1>
      {!sended && (
        <button
          onClick={onClickAcceptBtnHandeler}
          className=" bg-black px-4 rounded-md text-white"
        >
          Accept
        </button>
      )}
    </div>
  );
}

export default FriendInvitation;
