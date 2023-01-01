import React from "react";

import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";

import { useGetTopChartsQuery } from "../redux/services/shazamFree";

function TopCharts() {
  console.log("In top charts");
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetTopChartsQuery();
  console.log(data);

  if (isFetching) {
    return <Loader title="Loading top charts" />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover Top Charts</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song, i) => (
          <SongCard key={song.key} song={song} isPlaying={isPlaying} activeSong={activeSong} idx={i} data={data.tracks} />
        ))}
      </div>
    </div>
  );
}

export default TopCharts;


