import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router";
import { getListSongs } from "../api";
import Loading from "../containers/loadPage";
import Song from "./Song";
import "../styles/PlaySongs.scss";

const PlaySongs = () => {
  const [listSongs, setListSongs] = useState();
  const [favorite, setFavorite] = useState([]);
  const [chooseSong, setChooseSong] = useState({ song: "", play: false });

  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      getListSongs({ id: params?.id }).then((data) => setListSongs(data));
    }
  }, [params?.id]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>List of Musics</title>
          <meta name="description" content="List of musics" />
        </Helmet>
      </HelmetProvider>
      {!listSongs?.tracks && <Loading />}
      <div className="PlaySongs">
        {listSongs?.tracks?.map((item) => (
          <Song
            key={item.id}
            item={item}
            chooseSong={chooseSong}
            setChooseSong={setChooseSong}
            favorite={favorite}
            setFavorite={setFavorite}
          />
        ))}
      </div>
    </>
  );
};

export default PlaySongs;
