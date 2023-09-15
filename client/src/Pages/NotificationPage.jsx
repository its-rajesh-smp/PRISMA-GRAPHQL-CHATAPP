import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useSelector } from "react-redux";
import FriendInvitation from "../components/FriendInvitation";

const GET_USERS_INVITATION = gql`
  query {
    getUser {
      invitationRecived {
        id
        invitationMessage
        sender {
          name
          email
        }
      }
      invitationSended {
        id
        invitationMessage
        reciver {
          email
          name
        }
      }
    }
  }
`;

function NotificationPage() {
  const { idToken } = useSelector((state) => state.authSlice);
  const { data, loading } = useQuery(GET_USERS_INVITATION, {
    context: {
      headers: {
        Authorization: idToken,
      },
    },
  });
  console.log(data);
  return (
    !loading && (
      <div>
        {data.getUser.invitationRecived.map((invitation) => (
          <FriendInvitation
            id={invitation.id}
            key={invitation.id}
            user={invitation.sender}
            message={invitation.invitationMessage}
          />
        ))}
        {data.getUser.invitationSended.map((invitation) => (
          <FriendInvitation
            sended={true}
            id={invitation.id}
            key={invitation.id}
            user={invitation.reciver}
            message={invitation.invitationMessage}
          />
        ))}
      </div>
    )
  );
}

export default NotificationPage;
