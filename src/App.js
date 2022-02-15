/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PlayList from "./containers/PlayList";
import { getPlayList } from "./api/index";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./styles/App.scss";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function App() {
  const [playList, setPlayList] = useState({});
  const history = useHistory();
  const state = useSelector((state) => state);

  useEffect(() => {
    getPlayList().then((data) => setPlayList(data));

    if (!state?.login) {
      return history.push("/login");
    }
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Topic Music</title>
          <meta name="description" content="Topic music"></meta>
        </Helmet>
      </HelmetProvider>
      <div className="App">
        <section className="App__sub">
          <PlayList playList={playList} />
        </section>
      </div>
    </>
  );
}

export default App;
