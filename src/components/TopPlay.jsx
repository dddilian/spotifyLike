import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// special package for swiping през някакви неща - примерно, профилни снимки
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

import { PlayPause } from "./";

import { defaultAdamId } from "../assets/constants.js";
import deafaultPic from "../assets/defaultPic.jpg";

import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetAllChartsQuery } from "../redux/services/shazamFree";

//TopChartCard компонента го създаваме тук, защото само тук ще се ползва...
const TopChartCard = ({ song, idx, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {
  console.log(song);
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{idx + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img src={song?.images?.coverart ? song?.images?.coverart : deafaultPic} alt={song?.title} className="w-20 h-20 rounded-lg" />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link className="text-xl font-bold text-white" to={`/songs/${song?.key}`}>
            <p>{song.title}</p>
          </Link>
          {/* <Link className="text-base text-gray-300 mt-1" to={song.artists ? `/artists/${song?.artists[0].adamid}` : `/artists/${defaultAdamId}`}>
            <p>{song.subtitle}</p>
          </Link> */}

          <Link
            className="text-base text-gray-300 mt-1"
            to={song.artists[0]?.alias ? `/artists/${song?.artists[0]?.alias}` : `/artists/${song?.subtitle}`}
          >
            {song.subtitle}
          </Link>
        </div>
      </div>
      <PlayPause isPlaying={isPlaying} activeSong={activeSong} song={song} idx={idx} handlePause={handlePauseClick} handlePlay={handlePlayClick} />
    </div>
  );
};

function TopPlay() {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetAllChartsQuery(); //the custom redux hook
  const divRef = useRef(null); //will use that to scroll to the top of the page

  //за да ни пуска от началото на страницата, а не в края на скрол-а долу
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }); //без dependency array

  const topPlays = data?.tracks?.slice(0, 5); //only show the first 5 - 0,1,2,3,4
  // console.log(topPlays);

  //тук общуваме със global store, а тези функции ги препредаваме чак до PlayPause, през TopChartCard
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, idx) => {
    dispatch(setActiveSong({ song, data, idx }));
    dispatch(playPause(true));
  };

  return (
    <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col" ref={divRef}>
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              idx={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          ))}
        </div>
      </div>

      {/* swiper */}
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper className="mt-4" slidesPerView="auto" spaceBetween={15} freeMode centeredSlides centeredSlidesBounds modules={[FreeMode]}>
          {topPlays?.map((song, i) => (
            <SwiperSlide key={song?.key} idx={i} style={{ width: "25%", height: "auto" }} className="shadow-lg rounded-full animate-slideright">
              <Link to={song.artists ? `/artists/${song?.artists[0].adamid}` : `/artists/${song?.subtitle.toLowerCase()}`}>
                <img
                  src={song?.images?.background ? song?.images?.background : deafaultPic}
                  alt="name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default TopPlay;
