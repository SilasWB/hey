"use client";

import { playerContext } from "@/providers/player-provider";
import { msToTime } from "@/utils/time";
import Image from "next/image";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { FaPause, FaPlay, FaForward, FaBackward } from "react-icons/fa";
import NavBarHeaderNoSearch from "../components/navbars/navbarheadernosearch";
import "../style/musicplayer.scss";

function useDebounce(value, delay = 300) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
}

function reducer(state, action) {
  switch (action.type) {
    case "setController":
      return { ...state, controller: action.controller };
    case "setDuration":
      return { ...state, duration: action.duration };
    case "setPosition":
      return { ...state, position: action.position };
    case "setLocalPosition":
      return { ...state, localPosition: action.localPosition };
    case "setPaused":
      return { ...state, isPaused: action.isPaused };
    case "seekingTrue":
      return { ...state, isSeeking: true };
    case "seekingFalse":
      return { ...state, isSeeking: false };
    case "setDurationAndPosition":
      return {
        ...state,
        duration: action.duration,
        position: action.position,
      };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export default function MusicPlayer() {
  const { showPlayer, currentTrack, albumCover } = useContext(playerContext);
  const controlRef = useRef();
  const [playerState, dispatch] = useReducer(reducer, {
    controller: null,
    isPaused: false,
    duration: 0,
    position: 0,
    localPosition: 0,
    isSeeking: false,
  });
  const debouncedPosition = useDebounce(playerState.localPosition);

  useEffect(() => {
    if (!playerState.isSeeking) {
      dispatch({ type: "setLocalPosition", localPosition: playerState.position });
    }
  }, [playerState.position, playerState.isSeeking]);

  useEffect(() => {
    if (playerState.isSeeking && debouncedPosition !== playerState.position) {
      playerState.controller.seek(Math.floor(debouncedPosition / 1000));
      dispatch({ type: "seekingFalse" });
    }
  }, [debouncedPosition, playerState.position, playerState.isSeeking, playerState.controller]);

  useEffect(() => {
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const options = {
        uri: currentTrack.uri,
        width: 0,
        height: 0,
      };
      const callback = (EmbedController) => {
        EmbedController.play();
        dispatch({ type: "setController", controller: EmbedController });
        EmbedController.addListener("playback_update", (event) => {
          dispatch({
            type: "setDurationAndPosition",
            duration: event.data.duration,
            position: event.data.position,
          });
          dispatch({ type: "setPaused", isPaused: event.data.isPaused });
        });
      };
      IFrameAPI.createController(controlRef.current, options, callback);
    };
  }, [currentTrack]);

  function changeHandler(event) {
    dispatch({ type: "seekingTrue" });
    dispatch({ type: "setLocalPosition", localPosition: event.target.value });
  }

  return showPlayer ? (
    <>
      <script src="https://open.spotify.com/embed/iframe-api/v1" async></script>
      <div id="embed-iframe" ref={controlRef}></div>
      <NavBarHeaderNoSearch title="PLAYING" />

      <main className="music-player">
        <div className="music-player__container">
          <div className="music-player__visual">
            <Image src={albumCover.url} width={100} height={100} className="music-player__disc" alt="disc" />
            <Image src="/src/imgs/soundwave.svg" width={150} height={50} className="music-player__waveform" alt="wave" />
          </div>

          <div className="music-player__header">
            <h2 className="music-player__title">{currentTrack.name}</h2>
            <p className="music-player__subtitle">{currentTrack.artist}</p>
          </div>

          <div className="music-player__progress">
            <input
              type="range"
              min="0"
              max={playerState.duration}
              value={playerState.localPosition}
              onChange={changeHandler}
              className="music-player__progress-slider"
            />
            <div className="music-player__progress-time">
              <span>{msToTime(playerState.position)}</span>
              <span>{msToTime(playerState.duration - playerState.position)}</span>
            </div>
          </div>

          <div className="music-player__controls">
            <button className="music-player__button"><FaBackward size={18} /></button>
            <button className="music-player__button music-player__button--play" onClick={() => playerState.controller.togglePlay()}>
              {playerState.isPaused ? <FaPlay size={24} /> : <FaPause size={24} />}
            </button>
            <button className="music-player__button"><FaForward size={18} /></button>
          </div>
        </div>
      </main>
    </>
  ) : null;
}
