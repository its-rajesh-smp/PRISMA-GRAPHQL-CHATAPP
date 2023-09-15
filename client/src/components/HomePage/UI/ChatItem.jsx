import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentChat } from "../../../store/reducers/currentChatSlice";
const defaultImage =
  "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg";

function ChatItem({ id, name, image, latestMessageBody, latestMessageSender }) {
  const dispatch = useDispatch();

  // Set Current Chat
  const onClickSetCurrentChat = () => {
    dispatch(setCurrentChat(id));
  };

  return (
    <div
      onClick={onClickSetCurrentChat}
      className=" bg-white px-2 flex items-center gap-4"
    >
      <img
        className="w-16 h-16  rounded-full"
        src={image ? image : defaultImage}
        alt=""
      />
      <div className="w-full">
        <div className="flex justify-between">
          <h1>{name}</h1>
          <p className=" text-xs">9:30 AM</p>
        </div>
        <div className="text-xs flex justify-between">
          <p>{latestMessageBody}</p>
          <p className=" w-4 h-4 flex justify-center items-center rounded-full text-white font-bold bg-green-400 ">
            4
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
