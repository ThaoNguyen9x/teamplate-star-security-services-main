import React from "react";

const Wrapper = ({ children, className }) => {
  return (
    <div
      className={`px-4 lg:px-14 w-full mx-auto h-full ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
