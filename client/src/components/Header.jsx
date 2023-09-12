import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Header() {
  const { name, id } = useSelector((state) => state.authSlice);

  return (
    <div className=" flex gap-20 bg-black text-white h-16 px-20 items-center justify-between">
      <div className=" flex gap-20">
        <NavLink to="/">
          <button>HOME</button>
        </NavLink>
        <NavLink to="/notification">
          <button>NOTIFICATION</button>
        </NavLink>
      </div>
      <div className=" flex gap-4">
        <h1>{name}</h1>
        <h1 className=" font-bold">{id}</h1>
      </div>
    </div>
  );
}

export default Header;
