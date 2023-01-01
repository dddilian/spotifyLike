import React from "react";
import { SongBar } from "./";

function RelatedSongs({ relatedSongsData, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) {
  console.log("In RelatedSongs");
  console.log(relatedSongsData);

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related songs:</h1>

      <div className="mt-6 w-full flex flex-col">
        {relatedSongsData?.map((song, i) => (
          <SongBar
            key={song.track ? song.track.key : song.key}
            song={song.track ? song.track : song}
            idx={i}
            artistId={artistId}
            activeSong={activeSong}
            isPlaying={isPlaying}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedSongs;
