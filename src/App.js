import React, { useEffect, useState, createContext } from "react";
import PlayList from "./containers/PlayList";
import Cookie from "universal-cookie";
import { getPlayList } from "./api/index";
import { Helmet } from "react-helmet";
import "./styles/App.scss";
import { useHistory } from "react-router";

export const ContextApp = createContext({
  user: "",
});

const cookie = new Cookie();

function App() {
  const [playList, setPlayList] = useState({});
  const [user, setUser] = useState("");
  const history = useHistory();

  useEffect(() => {
    getPlayList().then((data) => setPlayList(data));
  }, []);

  const stateGeneral = {
    user: "",
  };

  useEffect(() => {
    // if (cookies.get("email")) {
    //   history.push("/menu");
    // }
    if (!user) {
      history.push("/login");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Topic Music</title>
        <meta name="description" content="Topic music"></meta>
      </Helmet>
      <ContextApp.Provider value={stateGeneral}>
        {!user && (
          <div className="App">
            <section className="App__sub">
              <PlayList playList={playList} />
            </section>
          </div>
        )}
      </ContextApp.Provider>
    </>
  );
}

export default App;
