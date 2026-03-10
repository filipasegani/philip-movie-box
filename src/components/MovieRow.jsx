import { ChevronLeft, ChevronRight, Download, Play, X, Heart } from 'lucide-react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import axios from '../api/tmdb';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import './MovieRow.css';

const MovieRow = ({ title, fetchUrl, isLargeRow }) => {
    const rowRef = useRef(null);
    const [isMoved, setIsMoved] = useState(false);
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [like, setLike] = useState(false);
    const { user } = UserAuth();
    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results);
                return request;
            } catch (error) {
                console.error("Error fetching movies row:", error);
            }
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = (direction) => {
        setIsMoved(true);
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === "left"
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth;

            rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    const handlePlay = (movie) => {
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

    const handleDownload = (movie, e) => {
        e.stopPropagation();
        // Since we don't have a real download link, we'll simulate it by opening a search
        const query = movie?.title || movie?.name || movie?.original_name;
        window.open(`https://www.google.com/search?q=download+movie+${query}`, '_blank');
    };

    const saveShow = async (movie, e) => {
        e.stopPropagation();
        if (user?.email) {
            setLike(!like);
            const userDoc = doc(db, 'users', user.email);
            await updateDoc(userDoc, {
                savedShows: arrayUnion({
                    id: movie.id,
                    title: movie.title || movie.name || movie.original_name,
                    img: movie.backdrop_path || movie.poster_path
                })
            });
            alert("Movie saved to your list!");
        } else {
            alert('Please log in to save a movie');
        }
    };

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div className="row">
            <h2 className="row-header">{title}</h2>
            <div className="row-wrapper">
                <ChevronLeft
                    className={`sliderArrow left ${!isMoved && "hidden"}`}
                    onClick={() => handleClick("left")}
                    size={50}
                />
                <div className="row-posters" ref={rowRef}>
                    {movies.map((movie) => (
                        ((isLargeRow && movie.poster_path) ||
                            (!isLargeRow && movie.backdrop_path)) && (
                            <div key={movie.id} className="movie-card-container">
                                <div className="movie-card" onClick={() => handlePlay(movie)}>
                                    <img
                                        className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                                            }`}
                                        alt={movie.name}
                                    />
                                    <div className="movie-info-overlay">
                                        <h4 className="movie-name">
                                            {movie?.title || movie?.name || movie?.original_name}
                                        </h4>
                                        <div className="card-buttons">
                                            <button className="card-btn play-btn">
                                                <Play size={16} fill="white" />
                                            </button>
                                            <button
                                                className="card-btn download-btn"
                                                onClick={(e) => handleDownload(movie, e)}
                                                title="Download"
                                            >
                                                <Download size={16} />
                                            </button>
                                            <button
                                                className="card-btn like-btn"
                                                onClick={(e) => saveShow(movie, e)}
                                                title="Add to My List"
                                            >
                                                <Heart size={16} fill={like ? "red" : "none"} color={like ? "red" : "white"} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
                <ChevronRight
                    className="sliderArrow right"
                    onClick={() => handleClick("right")}
                    size={50}
                />
            </div>
            {trailerUrl && (
                <div className="trailer-container">
                    <button className="close-trailer" onClick={() => setTrailerUrl("")}>
                        <X size={24} />
                    </button>
                    <YouTube videoId={trailerUrl} opts={opts} />
                </div>
            )}
        </div>
    );
};

export default MovieRow;
