import React from "react";
import { useParams } from "react-router-dom"; //за да вземем song id от url-то
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, RelatedSongs, Loader } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetRelatedSongsQuery } from "../redux/services/shazamFree";

function SongDetails() {
  console.log("In SongDetails");
  const { songId } = useParams();
  console.log("Song id = " + songId);
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails, error } = useGetSongDetailsQuery(songId);
  //   console.log(songData);
  const { data, isFetching: isFetchingRelatedSongsData, error: errorFetchingRelatedSongs } = useGetRelatedSongsQuery(songId);
  console.log(data);

  if (isFetchingRelatedSongsData || isFetchingSongDetails) {
    return <Loader title="Searching song details..." />;
  }

  if (error) {
    return <Error />;
  }

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {/* първо проверяваме дали респонса за конкретната песен съдържа текста и */}
          {songData?.sections[1].type === "LYRICS" ? (
            songData.sections[1].text.map((line, i) => (
              <p key={i} className="text-gray-400 text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">Sorry, no lyrics found</p>
          )}
        </div>
      </div>

      <RelatedSongs
        relatedSongsData={data.tracks}
        artistId=""
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
}

export default SongDetails;

//song data example response

// {
//     "layout": "5",
//     "type": "MUSIC",
//     "key": "643726163",
//     "title": "Creepin'",
//     "subtitle": "Metro Boomin, The Weeknd & 21 Savage",
//     "images": {
//         "background": "https://is5-ssl.mzstatic.com/image/thumb/Features112/v4/10/ea/1e/10ea1e97-487d-e802-3da0-f5f5ec112a03/mzl.sxemrluw.jpg/800x800cc.jpg",
//         "coverart": "https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/6e/fc/48/6efc48ad-d371-c4d6-62ff-1655c2be943d/22UM1IM40165.rgb.jpg/400x400cc.jpg",
//         "coverarthq": "https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/6e/fc/48/6efc48ad-d371-c4d6-62ff-1655c2be943d/22UM1IM40165.rgb.jpg/400x400cc.jpg",
//         "joecolor": "b:172929p:faf2e7s:f8e8bct:cdcac1q:cbc29e"
//     },
//     "share": {
//         "subject": "Creepin' - Metro Boomin, The Weeknd & 21 Savage",
//         "text": "I used Shazam to discover Creepin' by Metro Boomin, The Weeknd & 21 Savage.",
//         "href": "https://www.shazam.com/track/643726163/creepin",
//         "image": "https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/6e/fc/48/6efc48ad-d371-c4d6-62ff-1655c2be943d/22UM1IM40165.rgb.jpg/400x400cc.jpg",
//         "twitter": "I used @Shazam to discover Creepin' by Metro Boomin, The Weeknd & 21 Savage.",
//         "html": "https://www.shazam.com/snippets/email-share/643726163?lang=en-US&country=US",
//         "avatar": "https://is5-ssl.mzstatic.com/image/thumb/Features112/v4/10/ea/1e/10ea1e97-487d-e802-3da0-f5f5ec112a03/mzl.sxemrluw.jpg/800x800cc.jpg",
//         "snapchat": "https://www.shazam.com/partner/sc/track/643726163"
//     },
//     "hub": {
//         "type": "APPLEMUSIC",
//         "image": "https://images.shazam.com/static/icons/hub/ios/v5/applemusic_{scalefactor}.png",
//         "actions": [
//             {
//                 "name": "apple",
//                 "type": "applemusicplay",
//                 "id": "1660134392"
//             },
//             {
//                 "name": "apple",
//                 "type": "uri",
//                 "uri": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/cc/01/f1/cc01f1b7-7f87-0ce5-3e0a-bdcc48cb5c25/mzaf_2509141783693089572.plus.aac.ep.m4a"
//             }
//         ],
//         "options": [
//             {
//                 "caption": "OPEN",
//                 "actions": [
//                     {
//                         "name": "hub:applemusic:deeplink",
//                         "type": "applemusicopen",
//                         "uri": "https://music.apple.com/us/album/creepin/1660133085?i=1660134392&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_ios"
//                     },
//                     {
//                         "name": "hub:applemusic:deeplink",
//                         "type": "uri",
//                         "uri": "https://music.apple.com/us/album/creepin/1660133085?i=1660134392&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_ios"
//                     }
//                 ],
//                 "beacondata": {
//                     "type": "open",
//                     "providername": "applemusic"
//                 },
//                 "image": "https://images.shazam.com/static/icons/hub/ios/v5/overflow-open-option_{scalefactor}.png",
//                 "type": "open",
//                 "listcaption": "Open in Apple Music",
//                 "overflowimage": "https://images.shazam.com/static/icons/hub/ios/v5/applemusic-overflow_{scalefactor}.png",
//                 "colouroverflowimage": false,
//                 "providername": "applemusic"
//             },
//             {
//                 "caption": "BUY",
//                 "actions": [
//                     {
//                         "type": "uri",
//                         "uri": "https://itunes.apple.com/us/album/creepin/1660133085?i=1660134392&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=itunes&itsct=Shazam_ios"
//                     }
//                 ],
//                 "beacondata": {
//                     "type": "buy",
//                     "providername": "itunes"
//                 },
//                 "image": "https://images.shazam.com/static/icons/hub/ios/v5/itunes-overflow-buy_{scalefactor}.png",
//                 "type": "buy",
//                 "listcaption": "Buy on iTunes",
//                 "overflowimage": "https://images.shazam.com/static/icons/hub/ios/v5/itunes-overflow-buy_{scalefactor}.png",
//                 "colouroverflowimage": false,
//                 "providername": "itunes"
//             }
//         ],
//         "providers": [
//             {
//                 "caption": "Open in Spotify",
//                 "images": {
//                     "overflow": "https://images.shazam.com/static/icons/hub/ios/v5/spotify-overflow_{scalefactor}.png",
//                     "default": "https://images.shazam.com/static/icons/hub/ios/v5/spotify_{scalefactor}.png"
//                 },
//                 "actions": [
//                     {
//                         "name": "hub:spotify:searchdeeplink",
//                         "type": "uri",
//                         "uri": "spotify:search:Creepin%27%20Metro%20Boomin"
//                     }
//                 ],
//                 "type": "SPOTIFY"
//             },
//             {
//                 "caption": "Open in Deezer",
//                 "images": {
//                     "overflow": "https://images.shazam.com/static/icons/hub/ios/v5/deezer-overflow_{scalefactor}.png",
//                     "default": "https://images.shazam.com/static/icons/hub/ios/v5/deezer_{scalefactor}.png"
//                 },
//                 "actions": [
//                     {
//                         "name": "hub:deezer:searchdeeplink",
//                         "type": "uri",
//                         "uri": "deezer-query://www.deezer.com/play?query=%7Btrack%3A%27Creepin%5C%27%27%20artist%3A%27Metro+Boomin%2C+The+Weeknd++21+Savage%27%7D"
//                     }
//                 ],
//                 "type": "DEEZER"
//             }
//         ],
//         "explicit": true,
//         "displayname": "APPLE MUSIC"
//     },
//     "url": "https://www.shazam.com/track/643726163/creepin",
//     "artists": [
//         {
//             "id": "42",
//             "adamid": "670534462"
//         }
//     ],
//     "isrc": "USUG12208791",
//     "genres": {
//         "primary": "Hip-Hop/Rap"
//     },
//     "urlparams": {
//         "{tracktitle}": "Creepin%27",
//         "{trackartist}": "Metro+Boomin%2C+The+Weeknd+%26+21+Savage"
//     },
//     "myshazam": {
//         "apple": {
//             "actions": [
//                 {
//                     "name": "myshazam:apple",
//                     "type": "uri",
//                     "uri": "https://music.apple.com/us/album/creepin/1660133085?i=1660134392&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_ios"
//                 }
//             ]
//         }
//     },
//     "albumadamid": "1660133085",
//     "sections": [
//         {
//             "type": "SONG",
//             "metapages": [
//                 {
//                     "image": "https://is5-ssl.mzstatic.com/image/thumb/Features112/v4/10/ea/1e/10ea1e97-487d-e802-3da0-f5f5ec112a03/mzl.sxemrluw.jpg/800x800cc.jpg",
//                     "caption": "Metro Boomin"
//                 },
//                 {
//                     "image": "https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/6e/fc/48/6efc48ad-d371-c4d6-62ff-1655c2be943d/22UM1IM40165.rgb.jpg/400x400cc.jpg",
//                     "caption": "Creepin'"
//                 }
//             ],
//             "tabname": "Song",
//             "metadata": [
//                 {
//                     "title": "Album",
//                     "text": "HEROES & VILLAINS (Heroes Version)"
//                 },
//                 {
//                     "title": "Label",
//                     "text": "Republic Records"
//                 },
//                 {
//                     "title": "Released",
//                     "text": "2022"
//                 }
//             ]
//         },
//         {
//             "type": "LYRICS",
//             "text": [
//                 "Oooh",
//                 "Just can't believe this man",
//                 "(Metro Boomin want some more nigga)",
//                 "",
//                 "Somebody said they saw you",
//                 "The person you were kissing wasn't me",
//                 "And I would never ask you, I just kept it to myself",
//                 "",
//                 "I don't wanna know, if you're playing me",
//                 "Keep it on the low",
//                 "Cause my heart can't take it anymore",
//                 "And if you creeping, please don't let it show",
//                 "Oh baby, I don't wanna know",
//                 "",
//                 "I think about it when I hold you",
//                 "When looking in your eyes, I can't believe",
//                 "And I don't need to know the truth",
//                 "But baby keep it to yourself",
//                 "",
//                 "I don't wanna know, if you're playing me",
//                 "Keep it on the low",
//                 "Cause my heart can't take it anymore",
//                 "And if you creeping, please don't let it show",
//                 "Oh baby, I don't wanna know",
//                 "",
//                 "Did he touch you better than me? (touch you better than me?)",
//                 "Did he watch you fall asleep (watch you fall asleep?)",
//                 "Did you show him all those things that you used to do to me?",
//                 "If you're better off that way (better off that way)",
//                 "Baby all that I can say (all that I can say)",
//                 "If you're gonna do your thing, then don't come back to me",
//                 "Ooh",
//                 "",
//                 "Woah, woah, woah",
//                 "21",
//                 "Had me crushing, I was cuffing like the precinct",
//                 "How you go from housewife to a sneaky link",
//                 "Got you ridin round in all types of benz's and rovers",
//                 "Girl you used to ride in a rinky dink",
//                 "I'm the one put you in Eliante (on God)",
//                 "Fashion Nova model, I put you on the runway (on God)",
//                 "You was rocking coach bags, got you chanaynay",
//                 "Side bitch in frisco, I call her my bae bae (21)",
//                 "I got a girl but I still feel alone",
//                 "If you playing me that mean my home aint home",
//                 "Having nightmares of going through your phone (21)",
//                 "Can't even record you got me out my zone",
//                 "",
//                 "I don't wanna know, if you're playing me",
//                 "Keep it on the low",
//                 "Cause my heart can't take it anymore",
//                 "And if you creeping, please don't let it show",
//                 "Oh baby",
//                 "I don't wanna know, if you're playing me",
//                 "Keep it on the low",
//                 "Cause my heart can't take it anymore",
//                 "And if you creeping, please don't let it show",
//                 "Oh baby I don't wanna know",
//                 "",
//                 "If you creeping just don't let me find out (on God)",
//                 "Get a hotel never bring him to the house (on God)",
//                 "If you're better off that way (better off that way)",
//                 "Baby all that I can say (all that I can say)",
//                 "If you're gonna do your thing, then don't come back to me"
//             ],
//             "footer": "Writer(s): Mario Winans\nLyrics powered by www.musixmatch.com",
//             "tabname": "Lyrics",
//             "beacondata": {
//                 "lyricsid": "30376372",
//                 "providername": "musixmatch",
//                 "commontrackid": "156263139"
//             }
//         },
//         {
//             "type": "VIDEO",
//             "tabname": "Video",
//             "youtubeurl": {
//                 "caption": "Metro Boomin, The Weeknd, 21 Savage - Creepin' (Visualizer)",
//                 "image": {
//                     "dimensions": {
//                         "width": 1280,
//                         "height": 720
//                     },
//                     "url": "https://i.ytimg.com/vi/61ymOWwOwuk/maxresdefault.jpg"
//                 },
//                 "actions": [
//                     {
//                         "name": "video:youtube",
//                         "type": "webview",
//                         "share": {
//                             "subject": "Creepin' - Metro Boomin, The Weeknd & 21 Savage",
//                             "text": "I used Shazam to discover Creepin' by Metro Boomin, The Weeknd & 21 Savage.",
//                             "href": "https://www.shazam.com/track/643726163/creepin",
//                             "image": "https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/6e/fc/48/6efc48ad-d371-c4d6-62ff-1655c2be943d/22UM1IM40165.rgb.jpg/400x400cc.jpg",
//                             "twitter": "I used @Shazam to discover Creepin' by Metro Boomin, The Weeknd & 21 Savage.",
//                             "html": "https://www.shazam.com/snippets/email-share/643726163?lang=-&country=US",
//                             "avatar": "https://is5-ssl.mzstatic.com/image/thumb/Features112/v4/10/ea/1e/10ea1e97-487d-e802-3da0-f5f5ec112a03/mzl.sxemrluw.jpg/800x800cc.jpg",
//                             "snapchat": "https://www.shazam.com/partner/sc/track/643726163"
//                         },
//                         "uri": "https://youtu.be/61ymOWwOwuk?autoplay=1"
//                     }
//                 ]
//             }
//         },
//         {
//             "type": "RELATED",
//             "tabname": "Related"
//         }
//     ]
// }
