import React from "react";

function BlurWrapper({ children }) {
  return (
    <div className=" blurWrapper flex justify-center items-center  fixed top-0 left-0 h-screen w-screen">
      {children}
    </div>
  );
}

export default BlurWrapper;
