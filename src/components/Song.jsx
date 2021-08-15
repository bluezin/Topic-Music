import React, { useEffect, useRef, useState } from "react";

const Songs = ({ item, chooseSong, setChooseSong, favorite, setFavorite }) => {
  const [isPlay, setIsPlay] = useState(false);
  const [timeProgress, setTimeProgress] = useState("");
  const [volumnProgress, setVolumnProgress] = useState(0);
  const audioRef = useRef(null);
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
    changeCurrentProgress(newProgress);
  };

  const handleProgressVolumn = (event) => {
    const currentWidth = volumnRef?.current?.offsetWidth;
    const currentVolumn = event.clientX - volumnRef?.current?.offsetLeft;
    const porcentageClickSlider = Math.floor(
      (currentVolumn * 100) / currentWidth
    );
    audioRef.current.volume = porcentageClickSlider / 100;
    setVolumnProgress(String(currentVolumn));
  };

  const handleSongFavorite = (name) => {
    // return favorite?.map((data) => {
    //   return data === name.name ? console.log("si") : console.log("nooo");
    // });
    // favorite.map((data) => {
    //   return !data || data !== name
    //     ? setFavorite([...favorite, name.name])
    //     : null;
    // });
    // console.log(favorite);
  };

  useEffect(() => {
    if (chooseSong?.play === true && chooseSong?.song?.id === item.id) {
      audioRef?.current?.play();
      setIsPlay(true);
    } else if (chooseSong?.song?.id !== item.id || chooseSong?.play === false) {
      audioRef?.current?.pause();
      setIsPlay(false);
    }
  }, [chooseSong]);

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
        <div>
          <button
            type="button"
            onClick={() => handlePlayMusic(item)}
            className="btn-general"
          >
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
            />
            <div>
              <strong>{chooseSong?.song?.name}</strong>
              <p>{chooseSong?.song?.artistName}</p>
            </div>
          </div>

          <button className="btn-general" onClick={() => handlePlayMusic(item)}>
            <figure>
              <img
                alt="play"
                src={
                  isPlay
                    ? "https://icongr.am/feather/pause-circle.svg?size=128&color=currentColor"
                    : "https://icongr.am/octicons/play.svg?size=28&color=currentColor"
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
          <div
            className="PlaySongs__item--footer--volumn"
            ref={volumnRef}
            onClick={handleProgressVolumn}
          >
            <div style={{ inlineSize: `${volumnProgress}%` }}></div>
          </div>
        </footer>
      )}
    </section>
  );
};

export default Songs;
