import React from "react";
import { Link } from "react-router-dom";

import PlayPause from "./PlayPause";

const SongBar = ({ song, idx, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div
    className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
      activeSong?.title === song?.title ? "bg-[#4c426e]" : "bg-transparent"
    } py-2 p-4 rounded-lg cursor-pointer mb-2`}
  >
    <h3 className="font-bold text-base text-white mr-3">{idx + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        // src={artistId ? song?.images?.coverart : song?.images?.coverart}
        src={song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        {!artistId ? (
          <Link to={`/songs/${song.key}`}>
            <p className="text-xl font-bold text-white">{song?.title}</p>
          </Link>
        ) : (
          <p className="text-xl font-bold text-white">{song?.title}</p>
        )}
        <p className="text-base text-gray-300 mt-1">{artistId ? song?.attributes?.albumName : song?.subtitle}</p>
      </div>
    </div>
    {!artistId ? (
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        idx={idx}
        handlePause={handlePauseClick}
        // handlePlay={() => handlePlayClick(song, idx)}
        handlePlay={handlePlayClick}
      />
    ) : null}
  </div>
);

export default SongBar;
