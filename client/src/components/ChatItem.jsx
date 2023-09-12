import React from "react";
import { useNavigate } from "react-router-dom";

function ChatItem({ chatName, id }) {
  const navigate = useNavigate();

  const onClickNavigate = () => {
    navigate(`/message/${id}`);
  };

  return (
    <div
      onClick={onClickNavigate}
      className=" h-20 bg-red-100 flex items-center px-5 mt-5"
    >
      {chatName}
    </div>
  );
}

export default ChatItem;
