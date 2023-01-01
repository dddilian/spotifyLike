//!Shazam free
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "db5e890b89msh9e5aa2e53caf0f8p1d4dd0jsn5dd31367be36",
//     "X-RapidAPI-Host": "shazam.p.rapidapi.com",
//   },
// };

// const BASE_URL = `https://shazam.p.rapidapi.com`;

//!Shazam core
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA",
//     "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
//   },
// };

// const BASE_URL = `https://shazam-core.p.rapidapi.com/v1`;

//!Geoipify
//at_p7XBmqpJuqBOxdNv33SQVEAAO1CqJ
//https://geo.ipify.org/api/v2/country?apiKey=at_p7XBmqpJuqBOxdNv33SQVEAAO1CqJ&ipAddress=8.8.8.8

// const options = {
//   method: "GET",
//   headers: {
//     apiKey: "at_p7XBmqpJuqBOxdNv33SQVEAAO1CqJ",
//   },
// };

const BASE_URL = `https://geo.ipify.org/api/v2/country?apiKey=at_p7XBmqpJuqBOxdNv33SQVEAAO1CqJ`;

export default function fetchFromApi(uri = "", options = {}) {
  //приема динамичен uri, който се закача на BASE_URL и ползва горните options
  return fetch(BASE_URL + uri, options).then((res) => {
    if (!res.ok) {
      //ако статуса е в неуспешния диапазон - 4xx - 5xx, хвърли тази грешка, за да може после да се влезе в catch
      throw new Error(`Error: ${res.status}. Message: ${res.message}. Status text: ${res.statusText}`);
    }
    return res.json();
  });
}
