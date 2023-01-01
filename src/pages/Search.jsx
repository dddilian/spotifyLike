import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";

import { useGetSongsBySearchQuery } from "../redux/services/shazamFree";

function Search() {
  console.log("In Search");
  const { searchTerm } = useParams();
  console.log("Search term: " + searchTerm);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);
  console.log(data);

  const foundSongs = data?.tracks?.hits?.map((song) => song.track); //това може да го подадем, за да генерираме SongCard-ти по-чисто

  if (isFetching) {
    return <Loader title="Loading top charts" />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.hits.map((song, i) => (
          <SongCard key={song.track.key} song={song.track} isPlaying={isPlaying} activeSong={activeSong} idx={i} data={data.tracks.hits} />
        ))}
      </div>
    </div>
  );
}

export default Search;
