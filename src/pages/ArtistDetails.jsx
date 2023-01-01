import React from "react";
import { useParams } from "react-router-dom"; //за да вземем artist id от url-то
import { useSelector } from "react-redux";
import { DetailsHeader, Error, RelatedSongs, Loader } from "../components";

import { useGetArtistDetailsQuery } from "../redux/services/shazamFree";

function ArtistDetails() {
  console.log("In artist details");
  const { artistId } = useParams();
  console.log("Artist id = " + artistId);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);
  console.log(artistData);

  // let songsData;

  // if (artistData?.tracks?.hits) {
  //   songsData = artistData.tracks.hits;
  // } else if (artistData?.tracks) {
  //   songsData = artistData.tracks;
  // }

  if (isFetchingArtistDetails) {
    return <Loader title="Loading artist details and related songs..." />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      {/* <DetailsHeader artistId={artistId} artistData={artistData} /> */}

      {<RelatedSongs relatedSongsData={artistData.tracks.hits} artistId={artistId} isPlaying={isPlaying} activeSong={activeSong} />}
    </div>
  );
}

export default ArtistDetails;

//example res - one object with one property - tracks, which is an array of track, related to that artist
//artist data

// {
//   "tracks": [
//     {
//       "layout": "5",
//       "type": "MUSIC",
//       "key": "40333609",
//       "title": "River Flows In You",
//       "subtitle": "Yiruma",
//       "share": {
//         "subject": "River Flows In You - Yiruma",
//         "text": "I used Shazam to discover River Flows In You by Yiruma.",
//         "href": "https://www.shazam.com/track/40333609/river-flows-in-you",
//         "image": "https://is5-ssl.mzstatic.com/image/thumb/Music125/v4/b5/ae/26/b5ae2651-542a-9ee9-be4c-278791e2918f/mzi.ncrxyndi.jpg/400x400cc.jpg",
//         "twitter": "I used @Shazam to discover River Flows In You by Yiruma.",
//         "html": "https://www.shazam.com/snippets/email-share/40333609?lang=en-US&country=US",
//         "avatar": "https://is4-ssl.mzstatic.com/image/thumb/Features115/v4/3f/84/4e/3f844e97-8c23-b64d-87f1-d536e99f80e9/mzl.rsxdpqqq.jpg/800x800cc.jpg",
//         "snapchat": "https://www.shazam.com/partner/sc/track/40333609"
//       },
//       "images": {
//         "background": "https://is4-ssl.mzstatic.com/image/thumb/Features115/v4/3f/84/4e/3f844e97-8c23-b64d-87f1-d536e99f80e9/mzl.rsxdpqqq.jpg/800x800cc.jpg",
//         "coverart": "https://is5-ssl.mzstatic.com/image/thumb/Music125/v4/b5/ae/26/b5ae2651-542a-9ee9-be4c-278791e2918f/mzi.ncrxyndi.jpg/400x400cc.jpg",
//         "coverarthq": "https://is5-ssl.mzstatic.com/image/thumb/Music125/v4/b5/ae/26/b5ae2651-542a-9ee9-be4c-278791e2918f/mzi.ncrxyndi.jpg/400x400cc.jpg",
//         "joecolor": "b:302b35p:ffffffs:efebf2t:d5d4d6q:c9c5cc"
//       },
//       "hub": {
//         "type": "APPLEMUSIC",
//         "image": "https://images.shazam.com/static/icons/hub/ios/v5/applemusic_{scalefactor}.png",
//         "actions": [
//           {
//             "name": "apple",
//             "type": "applemusicplay",
//             "id": "485353578"
//           },
//           {
//             "name": "apple",
//             "type": "uri",
//             "uri": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/cb/24/ac/cb24ac75-128c-f817-7d81-7fbffbdaafe3/mzaf_1522770279362005862.plus.aac.ep.m4a"
//           }
//         ],
//         "options": [
//           {
//             "caption": "OPEN",
//             "actions": [
//               {
//                 "name": "hub:applemusic:deeplink",
//                 "type": "applemusicopen",
//                 "uri": "https://music.apple.com/us/album/river-flows-in-you/485353575?i=485353578&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_ios"
//               },
//               {
//                 "name": "hub:applemusic:deeplink",
//                 "type": "uri",
//                 "uri": "https://music.apple.com/us/album/river-flows-in-you/485353575?i=485353578&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=music&itsct=Shazam_ios"
//               }
//             ],
//             "beacondata": {
//               "type": "open",
//               "providername": "applemusic"
//             },
//             "image": "https://images.shazam.com/static/icons/hub/ios/v5/overflow-open-option_{scalefactor}.png",
//             "type": "open",
//             "listcaption": "Open in Apple Music",
//             "overflowimage": "https://images.shazam.com/static/icons/hub/ios/v5/applemusic-overflow_{scalefactor}.png",
//             "colouroverflowimage": false,
//             "providername": "applemusic"
//           },
//           {
//             "caption": "BUY",
//             "actions": [
//               {
//                 "type": "uri",
//                 "uri": "https://itunes.apple.com/us/album/river-flows-in-you/485353575?i=485353578&mttnagencyid=s2n&mttnsiteid=125115&mttn3pid=Apple-Shazam&mttnsub1=Shazam_ios&mttnsub2=5348615A-616D-3235-3830-44754D6D5973&itscg=30201&app=itunes&itsct=Shazam_ios"
//               }
//             ],
//             "beacondata": {
//               "type": "buy",
//               "providername": "itunes"
//             },
//             "image": "https://images.shazam.com/static/icons/hub/ios/v5/itunes-overflow-buy_{scalefactor}.png",
//             "type": "buy",
//             "listcaption": "Buy on iTunes",
//             "overflowimage": "https://images.shazam.com/static/icons/hub/ios/v5/itunes-overflow-buy_{scalefactor}.png",
//             "colouroverflowimage": false,
//             "providername": "itunes"
//           }
//         ],
//         "providers": [
//           {
//             "caption": "Open in Spotify",
//             "images": {
//               "overflow": "https://images.shazam.com/static/icons/hub/ios/v5/spotify-overflow_{scalefactor}.png",
//               "default": "https://images.shazam.com/static/icons/hub/ios/v5/spotify_{scalefactor}.png"
//             },
//             "actions": [
//               {
//                 "name": "hub:spotify:searchdeeplink",
//                 "type": "uri",
//                 "uri": "spotify:search:River%20Flows%20In%20You%20Yiruma"
//               }
//             ],
//             "type": "SPOTIFY"
//           },
//           {
//             "caption": "Open in Deezer",
//             "images": {
//               "overflow": "https://images.shazam.com/static/icons/hub/ios/v5/deezer-overflow_{scalefactor}.png",
//               "default": "https://images.shazam.com/static/icons/hub/ios/v5/deezer_{scalefactor}.png"
//             },
//             "actions": [
//               {
//                 "name": "hub:deezer:searchdeeplink",
//                 "type": "uri",
//                 "uri": "deezer-query://www.deezer.com/play?query=%7Btrack%3A%27River+Flows+In+You%27%20artist%3A%27Yiruma%27%7D"
//               }
//             ],
//             "type": "DEEZER"
//           }
//         ],
//         "explicit": false,
//         "displayname": "APPLE MUSIC"
//       },
//       "artists": [
//         {
//           "id": "40008598",
//           "adamid": "73406786"
//         }
//       ],
//       "url": "https://www.shazam.com/track/40333609/river-flows-in-you"
//     },
//   ]
// }
