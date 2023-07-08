import React from "react";
import "./HomeScreen.css";
import Nav from "../Nav.js";
import Banner from "../Banner";
import requests from "../Requests";
import Row from "../Row";

export default function HomeScreen() {
  return (
    <div className="home-screen">
      <Nav />

      <Banner />
      <Row
        title="NETFLIX_ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="TopRated Movies" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}
