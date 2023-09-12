import React from "react";
import { useParams } from "react-router-dom";
import CreateMessage from "../components/CreateMessage";

function MessagePage() {
  const { id } = useParams();

  return (
    <div>
      <CreateMessage />
    </div>
  );
}

export default MessagePage;
