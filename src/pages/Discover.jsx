import React from "react";
import { Error, Loader, SongCard } from "../components";
import { genresFromShazamFree } from "../assets/constants";

import { useDispatch, useSelector } from "react-redux";

import { useGetSongsByGenreQuery } from "../redux/services/shazamFree";
import { selectGenreListId } from "../redux/features/playerSlice";

function Discover() {
  console.log("In Discover");
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || "genre-global-chart-1"); //the custom redux hook
  console.log(data);

  if (isFetching) {
    return <Loader title="Loading data..." />;
  }

  if (error) {
    return <Error />;
  }

  const genre = genresFromShazamFree.find((genre) => genre.listid === genreListId);
  console.log(genre);

  return (
    <div className="flex flex-col">
      {/* on slamm devices да е flex-row, а usually да е flex-column */}
      <div className="w-full flex justify-between items-center flex-col sm:flex-row mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover {genre ? genre.name : "Pop"}</h2>
        <select
          onChange={(e) => {
            dispatch(selectGenreListId(e.target.value));
          }}
          value={genreListId || "genre-global-chart-1"}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genresFromShazamFree.map((genre) => (
            <option key={genre.id} value={genre.listid} data-id={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* songs wrapper */}
      {/* sm означава устройства с ширина на екрана над 640px, а не мобилни телефони. За мобилни е center */}
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song, i) => (
          <SongCard key={i} song={song} idx={i} isPlaying={isPlaying} data={data.tracks} activeSong={activeSong} />
        ))}
      </div>
    </div>
  );
}

export default Discover;
