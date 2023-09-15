import React from "react";
import { useSelector } from "react-redux";

function Message({ body, sender }) {
  const { id } = useSelector((state) => state.authSlice);

  return (
    <div className=" flex">
      <div>
        <img
          src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
          alt=""
          className=" w-10 h-10"
        />
      </div>

      <div className="  bg-green-100 rounded-md w-fit flex flex-col gap-2 p-2 max-w-sm">
        <div className=" flex gap-2 justify-between items-center">
          <p className=" text-sm">{sender.name}</p>
          <p className=" text-xs">{sender.id}</p>
        </div>
        <div>
          <p className=" text-sm bg-white p-1">{body}</p>
          <p className=" text-[0.6rem] text-right mt-2">20/1</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
