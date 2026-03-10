import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import './MovieRow.css'; // Reuse row styles

const SavedShows = () => {
    const [movies, setMovies] = useState([]);
    const { user } = UserAuth();
    const rowRef = React.useRef(null);

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedShows);
        });
    }, [user?.email]);

    const movieRef = doc(db, 'users', `${user?.email}`);
    const deleteShow = async (passedID) => {
        try {
            const result = movies.filter((item) => item.id !== passedID);
            await updateDoc(movieRef, {
                savedShows: result,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const slideLeft = () => {
        var slider = rowRef.current;
        slider.scrollLeft = slider.scrollLeft - 500;
    };
    const slideRight = () => {
        var slider = rowRef.current;
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    return (
        <div className="row">
            <h2 className="row-header">My Shows</h2>
            <div className="row-wrapper">
                <ChevronLeft
                    onClick={slideLeft}
                    className="sliderArrow left"
                    size={40}
                />
                <div
                    ref={rowRef}
                    className="row-posters"
                >
                    {movies?.map((item) => (
                        <div key={item.id} className="movie-card-container">
                            <div className="movie-card">
                                <img
                                    className="row-poster"
                                    src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                                    alt={item?.title}
                                />
                                <div className="movie-info-overlay">
                                    <p className="movie-name">{item?.title}</p>
                                    <button
                                        onClick={() => deleteShow(item.id)}
                                        className="card-btn"
                                        title="Remove from list"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <ChevronRight
                    onClick={slideRight}
                    className="sliderArrow right"
                    size={40}
                />
            </div>
        </div>
    );
};

export default SavedShows;
