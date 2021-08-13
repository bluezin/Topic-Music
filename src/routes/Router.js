import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import Layaut from "../containers/Layaut";
import PlaySongs from "../components/PlaySongs";
import Login from "../containers/Login";

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Layaut>
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/songs/:id" exact component={PlaySongs} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </Layaut>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
