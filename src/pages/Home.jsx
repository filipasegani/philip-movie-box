import React from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import requests from '../api/requests';

const Home = () => {
    return (
        <div className="home">
            <Hero fetchUrl={requests.fetchNetflixOriginals} />
            <div className="rows-container">
                <MovieRow title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
                <MovieRow title="Trending Now" fetchUrl={requests.fetchTrending} />
                <MovieRow title="Top Rated" fetchUrl={requests.fetchTopRated} />
                <MovieRow title="Action Movies" fetchUrl={requests.fetchActionMovies} />
                <MovieRow title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
                <MovieRow title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
                <MovieRow title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
                <MovieRow title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
            </div>
        </div>
    );
};

export default Home;
