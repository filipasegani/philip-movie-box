import React, { useState, useEffect } from 'react';
import axios from '../api/tmdb';
import { Play, Info, Download, X } from 'lucide-react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import './Hero.css';

const Hero = ({ fetchUrl }) => {
    const [movie, setMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl);
                const results = request.data.results;
                if (results && results.length > 0) {
                    setMovie(
                        results[Math.floor(Math.random() * results.length)]
                    );
                }
                return request;
            } catch (error) {
                console.error("Error fetching hero movie:", error);
            }
        }
        fetchData();
    }, [fetchUrl]);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const handlePlay = () => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    };

    const handleDownload = () => {
        const query = movie?.title || movie?.name || movie?.original_name;
        window.open(`https://www.google.com/search?q=download+movie+${query}`, '_blank');
    };

    const opts = {
        height: "500",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <header className="hero" style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
        }}>
            <div className="hero-content">
                <h1 className="hero-title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="hero-buttons">
                    <button className="hero-button play" onClick={handlePlay}>
                        <Play className="icon-sm" fill="black" /> Play
                    </button>
                    <button className="hero-button download" onClick={handleDownload}>
                        <Download className="icon-sm" /> Download
                    </button>
                    <button className="hero-button more-info">
                        <Info className="icon-sm" /> More Info
                    </button>
                </div>
                <div className="hero-description">
                    {truncate(movie?.overview, 150)}
                </div>
            </div>
            <div className="hero-fade-bottom" />
            {trailerUrl && (
                <div className="hero-trailer-container">
                    <button className="close-trailer" onClick={() => setTrailerUrl("")}>
                        <X size={32} />
                    </button>
                    <YouTube videoId={trailerUrl} opts={opts} />
                </div>
            )}
        </header>
    );
};

export default Hero;
