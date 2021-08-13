import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { getListSongs } from "../api";
import Loading from "../containers/loadPage";
import Song from "./Song";
import "../styles/PlaySongs.scss";

const PlaySongs = () => {
  const [listSongs, setListSongs] = useState();
  const [chooseSong, setChooseSong] = useState({ song: "", play: false });
  
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      getListSongs({ id: params?.id }).then((data) => setListSongs(data));
    }
  }, [params?.id]);

  // http://direct.rhapsody.com/imageserver/v2/albums/{{albumId}}/images/300x300.jpg)"

  return (
    <>
      <Helmet>
        <title>List of Musics</title>
        <meta name="description" content="List of musics" />
      </Helmet>
      {!listSongs?.tracks && <Loading />}
      <div className="PlaySongs">
        {listSongs?.tracks?.map((item) => (
          <Song
            key={item.id}
            item={item}
            chooseSong={chooseSong}
            setChooseSong={setChooseSong}
          />
        ))}
      </div>
    </>
  );
};

export default PlaySongs;
