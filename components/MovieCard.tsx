
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Play, Plus, Check, Film } from 'lucide-react';
import { Movie } from '../types';
import { TMDB_IMAGE_BASE, GENRE_MAP } from '../constants';

interface MovieCardProps {
  movie: Movie;
  inWatchlist?: boolean;
  onToggleWatchlist?: (e: React.MouseEvent) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, inWatchlist, onToggleWatchlist }) => {
  const ratingColor = movie.vote_average >= 7 ? 'text-green-400' : movie.vote_average >= 5 ? 'text-yellow-400' : 'text-red-400';

  // Handle both standard Movie objects (genre_ids) and MovieDetails objects (genres)
  const getGenreDisplay = () => {
    if (movie.genre_ids && Array.isArray(movie.genre_ids)) {
      return movie.genre_ids.slice(0, 2).map(id => GENRE_MAP[id]).filter(Boolean).join(' • ');
    }
    const movieDetails = movie as any;
    if (movieDetails.genres && Array.isArray(movieDetails.genres)) {
      return movieDetails.genres.slice(0, 2).map((g: any) => g.name).join(' • ');
    }
    return '';
  };

  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="group relative bg-neutral-900 rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-black/60 duration-300"
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        {movie.poster_path ? (
          <img 
            src={`${TMDB_IMAGE_BASE}/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-neutral-800 flex flex-col items-center justify-center p-4 text-center">
            <Film className="w-12 h-12 text-neutral-700 mb-2" />
            <span className="text-xs text-neutral-500 font-medium">{movie.title}</span>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex gap-2 mb-3">
            <button className="bg-white text-black p-2 rounded-full hover:bg-neutral-200 transition-colors">
              <Play className="w-4 h-4 fill-current" />
            </button>
            <button 
              onClick={onToggleWatchlist}
              className={`p-2 rounded-full border transition-all ${inWatchlist ? 'bg-green-500 border-green-500 text-white' : 'border-neutral-400 text-white hover:bg-white/10'}`}
            >
              {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex items-center gap-1.5 mb-1">
            <Star className={`w-3.5 h-3.5 fill-current ${ratingColor}`} />
            <span className={`text-xs font-bold ${ratingColor}`}>{movie.vote_average.toFixed(1)}</span>
            <span className="text-neutral-400 text-xs">•</span>
            <span className="text-neutral-300 text-xs font-medium">{movie.release_date?.split('-')[0]}</span>
          </div>
          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {getGenreDisplay()}
          </p>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="text-sm font-semibold text-neutral-100 truncate group-hover:text-red-500 transition-colors">
          {movie.title}
        </h3>
      </div>
    </Link>
  );
};

export default MovieCard;
