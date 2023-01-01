//TopChartCard компонента го създаваме тук, защото само тук ще се ползва...
const TopChartCard = ({ song, idx, isPlayng, activeSong, handlePauseClick, handlePlayClick }) => {
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
          <Link className="text-base text-gray-300 mt-1" to={song.artists ? `/artists/${song?.artists[0].adamid}` : `/artists/${defaultAdamId}`}>
            <p>{song.subtitle}</p>
          </Link>
        </div>
      </div>
      <PlayPause isPlayng={isPlayng} activeSong={activeSong} song={song} idx={idx} handlePause={handlePauseClick} handlePlay={handlePlayClick} />
    </div>
  );
};
