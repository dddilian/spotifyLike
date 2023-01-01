import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";

import fetchFromApi from "../utils/genericFetch";
import { useGetSongsByCountryQuery } from "../redux/services/shazamSecondFree";

function AroundYou() {
  const [countryCode, setCountryCode] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  //will run once the user visits the page and on country change
  useEffect(() => {
    fetchFromApi()
      .then((locationData) => {
        console.log(locationData);
        setCountryCode(locationData?.location?.country);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [countryCode]);

  const { data, isFetching, error } = useGetSongsByCountryQuery(countryCode);
  console.log(data);

  if (isFetching && loading) {
    return <Loader title="Loading songs around you" />;
  }

  if (error && countryCode) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around you <span className="font-black">{countryCode}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.result?.tracks.map((song, i) => (
          <SongCard key={song.key} song={song} isPlaying={isPlaying} activeSong={activeSong} idx={i} data={data?.result} />
        ))}
      </div>
    </div>
  );
}

export default AroundYou;
