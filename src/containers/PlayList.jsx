import React from "react";
import { Link } from "react-router-dom";
import Loading from "./loadPage";
import "../styles/containers/PlayList.scss";
import { useSelector } from "react-redux";

const PlayList = ({ playList }) => {
  const state = useSelector((state) => state);

  return (
    <>
      {!playList?.playlists && <Loading />}
      {playList?.playlists && (
        <div className="PlayList">
          <p className="PlayList__title">
            <strong>{`Welcome ${state?.user}!!!`}</strong>
          </p>
          <div className="PlayList__list">
            {playList?.playlists.map((item) => (
              <div key={item.id}>
                {item.images.map((image) => (
                  <figure key={image.imageId}>
                    <img
                      alt={image.imageId}
                      src={image.url}
                      className="img-playList"
                    />
                    <Link
                      to={`/songs/${item?.id}`}
                      type="button"
                      className="btn-general button-playList"
                    >
                      <img
                        alt="play"
                        src="https://icongr.am/entypo/controller-play.svg?size=100&color=3829e0"
                        className="img-play"
                      />
                    </Link>
                    <figcaption>{item.name}</figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PlayList;
