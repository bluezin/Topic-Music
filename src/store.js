import Cookies from "universal-cookie";
import { createStore } from "redux";

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

export { store }
