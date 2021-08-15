import React, { useState } from "react";
import Cookie from "universal-cookie";
import { useDispatch } from "react-redux";
import "../styles/containers/Login.scss";
import { useHistory } from "react-router";

const cookie = new Cookie();

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataUser, setDataUser] = useState();

  const handleChange = (event) => {
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleClik = (event) => {
    event.preventDefault();

    if (dataUser?.name) {
      cookie.set("login", true);
      cookie.set("name", dataUser?.name);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      dispatch({
        type: "LOGIN",
        payload: {
          user: dataUser?.name,
          login: cookie.get("login"),
        },
      });
      history.push("/");
    } else {
      setError("Name required");

      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div className="Login">
      <div className="Login__sub">
        <form>
          <img alt="login" src="/images/illustration-hero.svg" />
          <h1>Sign in</h1>
          <div className="Login__sub--inputs">
            <label htmlFor="name">Enter your Name: </label>
            <br />
            <input
              placeholder="Name"
              id="name"
              name="name"
              required
              onChange={handleChange}
            />
            <br />
            <label htmlFor="password">Enter your Password: </label>
            <br />
            <input
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              required
              onChange={handleChange}
            />
            <p className="Login__sub--inputs--error">{error}</p>
          </div>
          <div className="Login__sub--button">
            <button className="btn-general" type="submit" onClick={handleClik}>
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
