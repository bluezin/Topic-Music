import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "../styles/Nav.scss";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const Nav = () => {
  const history = useHistory();
  const state = useSelector((state) => state);
  const [modal, setModal] = useState(false);

  const handleSignUp = () => {
    cookie.remove("login");
    cookie.remove("name");
    history.push("/login");
    setModal(false);
  };

  if (history?.location.pathname === "/login") {
    return null;
  }

  return (
    <>
      {state?.login && (
        <header>
          <Link to="/" className="Nav__title">
            topic music
          </Link>
          <nav>
            <Link to="/">Play List</Link>
            <Link to="/">Profile</Link>
            <Link to="/" onClick={() => setModal(true)}>
              Sign off
            </Link>
          </nav>
        </header>
      )}
      {modal && (
        <div className="Modal">
          <div className="Modal__body">
            <p>¿Are you sure to log out?</p>
            <div>
              <button
                type="button"
                onClick={() => setModal(false)}
                className="btn-general button-cancel"
              >
                Cancel
              </button>
              <button
                className="btn-general button-sing"
                onClick={handleSignUp}
                type="button"
              >
                Sign off
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
