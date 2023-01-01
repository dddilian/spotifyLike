import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

function SongCard({ song, idx, isPlaying, activeSong, data }) {
  const dispatch = useDispatch();
  // console.log(song);
  // console.log("DATA:");
  // console.log(data);
  //тук общуваме със global store, а тези функции ги препредаваме чак до PlayPause
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, idx }));
    dispatch(playPause(true));
  };

  // if you want to specify a specific amount, we can use [] so Tailwind to know about that specific pixel width
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title ? "flex bg-black bg-opacity-70" : "hidden"
          }`}
        >
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            idx={idx}
            handlePlay={handlePlayClick}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </div>
        <img src={song.images?.coverart} alt="song-img" />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song.key}`}>{song.title}</Link>
        </p>
        <p className="mt-1 text-sm text-gray-300 truncate">
          {/* <Link to={song.artists ? `/artists/${song?.artists[0]?.alias}` : `/top-artists`}>{song.subtitle}</Link> */}
          <Link to={song.artists[0]?.alias ? `/artists/${song?.artists[0]?.alias}` : `/artists/${song?.subtitle}`}>{song.subtitle}</Link>
        </p>
      </div>
    </div>
  );
}

export default SongCard;

// {
//   "layout": "5",
//   "type": "MUSIC",
//   "key": "633815114",
//   "title": "Escapism.",
//   "subtitle": "RAYE & 070 Shake",
//   "share": {
//       "subject": "Escapism. - RAYE & 070 Shake",
//       "text": "I used Shazam to discover Escapism. by RAYE & 070 Shake.",
//       "href": "https://www.shazam.com/track/633815114/escapism",
//       "image": "https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/90/93/08/909308e3-94ca-dbf8-ebc7-0177bae4b9ad/197186999980.jpg/400x400cc.jpg",
//       "twitter": "I used @Shazam to discover Escapism. by RAYE & 070 Shake.",
//       "html": "https://www.shazam.com/snippets/email-share/633815114?lang=en-US&country=US",
//       "avatar": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/67/d3/b1/67d3b183-4cfb-dd3f-b414-b904a85a071a/pr_source.png/800x800cc.jpg",
//       "snapchat": "https://www.shazam.com/partner/sc/track/633815114"
//   },
//   "images": {
//       "background": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/67/d3/b1/67d3b183-4cfb-dd3f-b414-b904a85a071a/pr_source.png/800x800cc.jpg",
//       "coverart": "https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/90/93/08/909308e3-94ca-dbf8-ebc7-0177bae4b9ad/197186999980.jpg/400x400cc.jpg",
//       "coverarthq": "https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/90/93/08/909308e3-94ca-dbf8-ebc7-0177bae4b9ad/197186999980.jpg/400x400cc.jpg",
//       "joecolor": "b:f4f7fcp:141416s:1e2023t:414144q:494b4e"
//   },
//   "hub": {
//       "type": "APPLEMUSIC",
//       "image": "https://images.shazam.com/static/icons/hub/web/v5/applemusic.png",
//       "actions": [
//           {
//               "name": "apple",
//               "type": "applemusicplay",
//               "id": "1647624356"
//           },
//           {
//               "name": "apple",
//               "type": "uri",
//               "uri": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/99/3e/6f/993e6fb0-0b92-6461-a2ff-21d8c5d71afd/mzaf_1460326504649577708.plus.aac.ep.m4a"
//           }
//       ],
//       "options": [
//           {
//               "caption": "OPEN",
//               "actions": [
//                   {
//                       "name": "hub:applemusic:deeplink",
//                       "type": "applemusicopen",
//                       "uri": "https://music.apple.com/us/album/escapism/1647623993?i=1647624356&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_web&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_web"
//                   },
//                   {
//                       "name": "hub:applemusic:deeplink",
//                       "type": "uri",
//                       "uri": "https://music.apple.com/us/album/escapism/1647623993?i=1647624356&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_web&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_web"
//                   }
//               ],
//               "beacondata": {
//                   "type": "open",
//                   "providername": "applemusic"
//               },
//               "image": "https://images.shazam.com/static/icons/hub/web/v5/overflow-open-option.png",
//               "type": "open",
//               "listcaption": "Open in Apple Music",
//               "overflowimage": "https://images.shazam.com/static/icons/hub/web/v5/applemusic-overflow.png",
//               "colouroverflowimage": false,
//               "providername": "applemusic"
//           }
//       ],
//       "explicit": true,
//       "displayname": "APPLE MUSIC"
//   },
//   "artists": [
//       {
//           "alias": "raye",
//           "id": "42",
//           "adamid": "261686"
//       },
//       {
//           "alias": "070-shake",
//           "id": "42",
//           "adamid": "1097177293"
//       }
//   ],
//   "url": "https://www.shazam.com/track/633815114/escapism",
//   "highlightsurls": {
//       "artisthighlightsurl": "https://cdn.shazam.com/video/v3/en-US/US/web/261686/highlights?affiliate=mttnagencyid%3Ds2n%26mttnsiteid%3D125115%26mttn3pid%3DApple-Shazam%26mttnsub1%3DShazam_web%26mttnsub2%3D5348615A-616D-3235-3830-44754D6D5973%26itscg%3D30201%26app%3Dmusic%26itsct%3DShazam_web&videoIdToFilter=1653634523",
//       "trackhighlighturl": "https://cdn.shazam.com/video/v3/en-US/US/web/highlights/1653634523?affiliate=mttnagencyid%3Ds2n%26mttnsiteid%3D125115%26mttn3pid%3DApple-Shazam%26mttnsub1%3DShazam_web%26mttnsub2%3D5348615A-616D-3235-3830-44754D6D5973%26itscg%3D30201%26app%3Dmusic%26itsct%3DShazam_web"
//   },
//   "properties": {}
// }
