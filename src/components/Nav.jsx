import React from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.scss";

const Nav = () => {
  return (
    <>
      <header>
        <Link to="/" className="Nav__title">
          topic music
        </Link>
        <nav>
          <Link to="/">Play List</Link>
          <Link to="/">Profile</Link>
          <Link to="/">Sign off</Link>
        </nav>
      </header>
    </>
  );
};

export default Nav;
