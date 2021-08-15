import React, { useEffect, useState } from "react";
import PlayList from "./containers/PlayList";
import { getPlayList } from "./api/index";
import { Helmet } from "react-helmet";
import "./styles/App.scss";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function App() {
  const [playList, setPlayList] = useState({});
  const history = useHistory();
  const state = useSelector((state) => state);

  useEffect(() => {
    getPlayList().then((data) => setPlayList(data));
  }, []);

  useEffect(() => {
    if (!state?.login) {
      return history.push("/login");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Topic Music</title>
        <meta name="description" content="Topic music"></meta>
      </Helmet>
      <div className="App">
        <section className="App__sub">
          <PlayList playList={playList} />
        </section>
      </div>
    </>
  );
}

export default App;
