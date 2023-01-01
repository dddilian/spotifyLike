//The main file where we will make all API calls
//!В това API правим заявки за неща, които ги няма в другото API
//!=songs by country code

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamSecondFreeApi = createApi({
  reducerPath: "shazamSecondFreeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-song-recognizer.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", "3c09e864dcmsh66ecfe6afa89732p1ffd6bjsn9e7e12565695");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSongsByCountry: builder.query({ query: (countryCode) => `/top_country_tracks?country_code=${countryCode}` }),
    getTopArtists: builder.query({ query: (query) => `/search_artist?query=${query}` }),
    //
    //the other endpoints
    //the other endpoints
    //the other endpoints
  }),
});

//now redux toolkit allows us to call this as a HOOK
export const { useGetSongsByCountryQuery, useGetTopArtistsQuery } = shazamSecondFreeApi;
