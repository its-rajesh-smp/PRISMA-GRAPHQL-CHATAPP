import React from "react";
import { useSelector } from "react-redux";
import InviteUserForm from "../components/InviteUserForm";
import ChatsContainer from "../components/HomePage/ChatsContainer";
import SideBarHeader from "../components/HomePage/SideBarHeader";
import CreateMessage from "../components/ChatBox/CreateMessage";
import MessagesContainer from "../components/ChatBox/MessagesContainer";

function HomePage() {
  const { inviteUserForm } = useSelector((state) => state.homePageSlice);

  return (
    <div className=" flex h-[calc(100vh-4rem)]">
      <div className=" shrink-0 flex border-r-2 border-zinc-900 shadow-md  flex-col w-80  ">
        <SideBarHeader />
        <ChatsContainer />
        {inviteUserForm && <InviteUserForm />}
      </div>
      <div className=" h-full flex flex-col justify-between  w-full">
        <MessagesContainer />
        <CreateMessage />
      </div>
    </div>
  );
}

export default HomePage;
