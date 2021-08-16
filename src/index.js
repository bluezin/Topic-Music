import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";
import reportWebVitals from "./reportWebVitals";
import AppRouter from "./routes/Router";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Cookies from "universal-cookie";

const cookie = new Cookies();
const resultLogin = cookie.get("login") || false;
const name = cookie.get("name") || "";

const initialState = {
  user: name,
  login: resultLogin,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        user: action.payload.user,
        login: action.payload.login,
      };
    }
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store };

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter>
        <App />
      </AppRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
