
import { TMDB_API_KEY, TMDB_BASE_URL } from '../constants';
import { Movie, MovieDetails } from '../types';

export const tmdbService = {
  getTrending: async (): Promise<Movie[]> => {
    const res = await fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`);
    const data = await res.json();
    return data.results;
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    const res = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.results;
  },

  getMovieDetails: async (id: number): Promise<MovieDetails> => {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits,watch/providers`
    );
    return await res.json();
  },

  getRecommendations: async (id: number): Promise<Movie[]> => {
    const res = await fetch(`${TMDB_BASE_URL}/movie/${id}/recommendations?api_key=${TMDB_API_KEY}`);
    const data = await res.json();
    return data.results;
  },
  
  getDiscoverByGenre: async (genreId: number): Promise<Movie[]> => {
    const res = await fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}`);
    const data = await res.json();
    return data.results;
  }
};
