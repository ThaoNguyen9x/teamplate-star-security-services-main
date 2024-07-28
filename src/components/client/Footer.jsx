import React from "react";
import Wrapper from "./Wrapper";

const Footer = () => {
  return (
    <Wrapper className="text-white bg-[#1a191d] py-10 text-center">
      <div
        className=""
      >
        <span>© {new Date().getFullYear()} Star. All rights reserved.</span>
      </div>
    </Wrapper>
  );
};

export default Footer;
