import React from "react";
import { useDispatch } from "react-redux";
import { showInviteUserForm } from "../../store/reducers/homePageSlice";

function SideBarHeader() {
  const dispatch = useDispatch();

  return (
    <div className="flex-col    flex justify-center item-center ">
      <input
        className=" h-10  w-full px-3"
        type="text"
        placeholder="Search User"
      />
      <div className=" h-10 flex gap-2 ">
        <button
          onClick={() => dispatch(showInviteUserForm())}
          className=" w-full h-full bg-blue-200 px-4"
        >
          Invite Friend
        </button>
        <button className=" w-full h-full bg-blue-200 px-4">
          Create Group
        </button>
      </div>
    </div>
  );
}

export default SideBarHeader;
