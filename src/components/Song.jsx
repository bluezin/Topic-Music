/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";

const Songs = ({ item, chooseSong, setChooseSong, favorite, setFavorite }) => {
  const audioRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [timeProgress, setTimeProgress] = useState("");
  const [volumnProgress, setVolumnProgress] = useState(90);
  const timeRef = useRef(null);
  const timeSecondRef = useRef(null);
  const duration = Math.floor(audioRef?.current?.duration);
  const volumnRef = useRef(null);

  const handlePlayMusic = (song) => {
    if (item.id === song.id) {
      setChooseSong({ song, play: !isPlay });
    } else {
      setChooseSong({ song: "", play: false });
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const changeCurrentProgress = (newProgress) => {
    audioRef.current.currentTime = newProgress;
  };

  const handleProgressAument = (event) => {
    const currentWidth = timeRef?.current?.offsetWidth;
    const currentProgress = event.clientX - timeRef?.current?.offsetLeft;
    const porcentageClickSlider = (currentProgress * 100) / currentWidth;
    const newProgress = Math.floor((duration * porcentageClickSlider) / 100);

    const newCurrentSliderProgress = (newProgress * 100) / duration;
    timeSecondRef.current.style.inlineSize = `${newCurrentSliderProgress}%`;
    if (audioRef?.current?.currentTime !== 0) {
      changeCurrentProgress(newProgress);
    }
  };

  const handleProgressVolumn = (event) => {
    const currentWidth = volumnRef?.current?.offsetWidth;
    const currentVolumn = event.clientX - volumnRef?.current?.offsetLeft;
    const porcentageClickSlider = Math.floor(
      (currentVolumn * 100) / currentWidth
    );
    if (event && audioRef.current.volume) {
      audioRef.current.volume = porcentageClickSlider / 100;
      setVolumnProgress(String(currentVolumn));
    }
  };

  const handleSongFavorite = (name) => {};

  useEffect(() => {
    if (chooseSong?.play === true && chooseSong?.song?.id === item.id) {
      audioRef?.current?.play();
      setIsPlay(true);
    } else if (chooseSong?.song?.id !== item.id || chooseSong?.play === false) {
      audioRef?.current?.pause();
      setIsPlay(false);
    }

    if (timeProgress === "100") {
      setIsPlay(false);
    }
  }, [chooseSong, timeProgress]);

  useEffect(() => {
    setInterval(() => {
      const mutable = audioRef?.current?.currentTime;
      const progress = (mutable * 100) / audioRef?.current?.duration;
      setTimeProgress(progress);
    }, 1000);
  }, []);

  return (
    <section className="PlaySongs__item">
      <div className="PlaySongs__item--sub">
        <div onClick={() => handlePlayMusic(item)}>
          <button type="button" className="btn-general">
            <img
              alt="play"
              src={
                isPlay
                  ? "https://icongr.am/feather/pause-circle.svg?size=22&color=currentColor"
                  : "https://icongr.am/feather/play.svg?size=22&color=currentColor"
              }
            />
          </button>
          <p>{item.artistName}</p>
          <p>...</p>
          <p>{item.name}</p>
        </div>
        <div>
          <button
            className="btn-general button-heart"
            onClick={() => handleSongFavorite(item)}
          >
            <img
              alt="heart"
              src={`https://icongr.am/feather/heart.svg?size=20&color=${
                favorite.includes(item.name) ? "ee2b2b" : "currentColor"
              }`}
            />
          </button>
        </div>
      </div>
      {/*  */}
      {chooseSong?.song?.id === item.id && (
        <footer className="PlaySongs__item--footer">
          {item?.previewURL && (
            <audio src={item?.previewURL} ref={audioRef}></audio>
          )}
          <div className="PlaySongs__item--footer--info">
            <img
              alt=""
              src={`http://direct.rhapsody.com/imageserver/v2/albums/${chooseSong?.song?.albumId}/images/300x300.jpg`}
              className="img-album"
            />
            <div>
              <strong>{chooseSong?.song?.name}</strong>
              <p>{chooseSong?.song?.artistName}</p>
            </div>
          </div>
          <div className="PlaySongs__item--footer--play">
            <button
              className="btn-general"
              onClick={() => handlePlayMusic(item)}
            >
              <figure>
                <img
                  alt="play"
                  src={
                    isPlay
                      ? "https://icongr.am/feather/pause-circle.svg?size=128&color=fbf9f9"
                      : "https://icongr.am/octicons/play.svg?size=28&color=fbf9f9"
                  }
                />
              </figure>
            </button>
            <div
              className="PlaySongs__item--footer--controlls"
              ref={timeRef}
              onClick={handleProgressAument}
            >
              <div
                ref={timeSecondRef}
                style={{ inlineSize: `${timeProgress}%` }}
              ></div>
            </div>
          </div>
          <div className="PlaySongs__item--footer--volumn">
            <figure>
              <img
                alt="volumn"
                src="https://icongr.am/fontawesome/volume-up.svg?size=20`&color=fbf9f9"
              />
            </figure>
            <div
              className="PlaySongs__item--footer--volumn-div"
              ref={volumnRef}
              onClick={handleProgressVolumn}
            >
              <div style={{ inlineSize: `${volumnProgress}%` }}></div>
            </div>
          </div>
        </footer>
      )}
    </section>
  );
};

export default Songs;
