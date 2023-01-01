//The main file where we will make all API calls
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamFreeApi = createApi({
  reducerPath: "shazamFreeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      //headers.set("X-RapidAPI-Key", "db5e890b89msh9e5aa2e53caf0f8p1d4dd0jsn5dd31367be36");
      headers.set("X-RapidAPI-Key", "3c09e864dcmsh66ecfe6afa89732p1ffd6bjsn9e7e12565695");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCharts: builder.query({ query: () => "/charts/track" }),
    getSongsByGenre: builder.query({ query: (genre) => `/charts/track?listId=${genre}` }),
    getSongDetails: builder.query({ query: (songId) => `/songs/get-details?key=${songId}` }),
    getRelatedSongs: builder.query({ query: (songId) => `/songs/list-recommendations?key=${songId}` }),
    // getArtistDetails: builder.query({ query: (artistId) => `/songs/list-artist-top-tracks?id=${artistId}` }), //този endpoint не работи при самото API
    getArtistDetails: builder.query({ query: (artistName) => `/search?term=${artistName}&locale=en-US&offset=0&limit=15` }),

    getSongsBySearch: builder.query({ query: (searchTerm) => `/search?term=${searchTerm}&locale=en-US&offset=0&limit=15` }),

    getTopCharts: builder.query({ query: () => "/charts/track?locale=en-US&listId=genre-global-chart-1" }),
    //the other endpoints
    //the other endpoints
    //the other endpoints
  }),
});

//now redux toolkit allows us to call this as a HOOK
export const {
  useGetAllChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
  useGetArtistDetailsQuery,
  useGetSongsBySearchQuery,
  useGetTopChartsQuery,
} = shazamFreeApi;
