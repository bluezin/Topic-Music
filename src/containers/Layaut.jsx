import React from "react";
import Nav from "../components/Nav";

const Layaut = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default Layaut;
