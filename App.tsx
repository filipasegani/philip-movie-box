
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import MovieCard from './components/MovieCard';
import { tmdbService } from './services/tmdb';
import { storageService } from './services/storage';
import { geminiService } from './services/gemini';
import { Movie, MovieDetails, User } from './types';
import { TMDB_IMAGE_BASE, GENRE_MAP } from './constants';
import { 
  Play, 
  Info, 
  Plus, 
  Check, 
  Star, 
  Heart, 
  Clock, 
  Loader2, 
  Sparkles, 
  ChevronRight, 
  Volume2, 
  Globe, 
  Bookmark, 
  Film, 
  PlayCircle, 
  Download,
  AlertCircle
} from 'lucide-react';

// --- Page Components ---

const Home = ({ watchlist, toggleWatchlist }: { watchlist: number[], toggleWatchlist: (id: number) => void }) => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movies = await tmdbService.getTrending();
        setTrending(movies);
        setHeroMovie(movies[0]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePlay = (id: number) => {
    navigate(`/movie/${id}`);
  };

  const handleDownload = (title: string) => {
    alert(`Preparing download for: ${title}. Offline viewing is a premium feature available in the Philip Movie Box app.`);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
    </div>
  );

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      {heroMovie && (
        <section className="relative h-[85vh] flex items-end">
          <div className="absolute inset-0">
            <img 
              src={`${TMDB_IMAGE_BASE}/original${heroMovie.backdrop_path}`}
              className="w-full h-full object-cover"
              alt={heroMovie.title}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/20" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <div className="max-w-2xl space-y-6">
              <div className="flex items-center gap-2 text-red-500 font-bold tracking-widest text-xs uppercase">
                <span className="w-8 h-0.5 bg-red-500" />
                Now Premiering
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-none">
                {heroMovie.title}
              </h1>
              <p className="text-lg text-neutral-300 line-clamp-3 leading-relaxed font-medium">
                {heroMovie.overview}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button 
                  onClick={() => handlePlay(heroMovie.id)}
                  className="bg-red-600 text-white px-8 py-3.5 rounded-full font-bold flex items-center gap-2 hover:bg-red-700 transition-all shadow-xl shadow-red-900/40"
                >
                  <PlayCircle className="w-5 h-5 fill-current" /> Play Movie
                </button>
                <button 
                  onClick={() => handleDownload(heroMovie.title)}
                  className="bg-neutral-800/80 backdrop-blur text-white px-8 py-3.5 rounded-full font-bold flex items-center gap-2 border border-neutral-700 hover:bg-neutral-700 transition-all shadow-xl"
                >
                  <Download className="w-5 h-5" /> Download
                </button>
                <button 
                  onClick={() => toggleWatchlist(heroMovie.id)}
                  className={`px-8 py-3.5 rounded-full font-bold flex items-center gap-2 border transition-all ${
                    watchlist.includes(heroMovie.id) 
                    ? 'bg-green-600/20 border-green-500 text-green-400' 
                    : 'bg-black/40 backdrop-blur border-neutral-700 text-white hover:bg-black/60'
                  }`}
                >
                  {watchlist.includes(heroMovie.id) ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  Watchlist
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trending Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Clock className="w-6 h-6 text-red-600" /> Philip's Trending Picks
            </h2>
            <p className="text-neutral-500 text-sm mt-1">Highly rated movies this week</p>
          </div>
          <button className="text-red-500 font-semibold text-sm hover:underline flex items-center gap-1">
            Browse All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {trending.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              inWatchlist={watchlist.includes(movie.id)}
              onToggleWatchlist={(e) => {
                e.preventDefault();
                toggleWatchlist(movie.id);
              }}
            />
          ))}
        </div>
      </section>

      {/* Discover Genres */}
      <section className="bg-neutral-900/40 py-16 border-y border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {[28, 12, 16, 35, 80, 27, 878, 10749].map(id => (
              <button 
                key={id}
                className="px-6 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-red-500/50 hover:bg-red-500/5 transition-all text-sm font-semibold"
              >
                {GENRE_MAP[id]}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const MovieDetail = ({ watchlist, toggleWatchlist, favorites, toggleFavorite }: { watchlist: number[], toggleWatchlist: (id: number) => void, favorites: number[], toggleFavorite: (id: number) => void }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [recs, setRecs] = useState<Movie[]>([]);
  const [aiInsights, setAiInsights] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await tmdbService.getMovieDetails(Number(id));
        setMovie(data);
        const recommendations = await tmdbService.getRecommendations(Number(id));
        setRecs(recommendations.slice(0, 6));
        
        // AI Insights
        const insights = await geminiService.getMovieAnalysis(data.title, data.overview);
        setAiInsights(insights);
        
        storageService.addToHistory(Number(id));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const handleDownload = (title: string) => {
    alert(`Initializing high-speed download for "${title}"... Please wait.`);
  };

  const handlePlayMovie = (providers: any) => {
    if (providers?.link) {
      window.open(providers.link, '_blank');
    } else {
      const youtubeTrailer = movie?.videos?.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
      if (youtubeTrailer) {
        window.open(`https://www.youtube.com/watch?v=${youtubeTrailer.key}`, '_blank');
      } else {
        alert("Playing content... Searching for available legal sources.");
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 text-red-600 animate-spin" /></div>;
  if (!movie) return <div className="min-h-screen flex items-center justify-center text-white">Movie not found</div>;

  const trailer = movie.videos?.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const providers = movie['watch/providers']?.results?.US;

  return (
    <div className="pb-20">
      {/* Backdrop Header */}
      <div className="relative h-[60vh] md:h-[75vh]">
        <img 
          src={`${TMDB_IMAGE_BASE}/original${movie.backdrop_path}`}
          className="w-full h-full object-cover"
          alt={movie.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        
        <div className="absolute bottom-0 w-full pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 items-end">
            <img 
              src={`${TMDB_IMAGE_BASE}/w500${movie.poster_path}`}
              className="w-48 md:w-64 rounded-xl shadow-2xl shadow-black/80 border border-white/10 hidden md:block"
              alt={movie.title}
            />
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {movie.genres.map(g => (
                  <span key={g.id} className="text-xs font-bold px-2.5 py-1 bg-red-600/20 text-red-500 rounded border border-red-500/30 uppercase tracking-widest">{g.name}</span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">{movie.title}</h1>
              <div className="flex items-center gap-6 text-sm font-semibold text-neutral-300">
                <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500 fill-current" /> {movie.vote_average.toFixed(1)}</div>
                <div>{movie.runtime}m</div>
                <div>{movie.release_date.split('-')[0]}</div>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => handlePlayMovie(providers)}
                  className="px-8 py-3.5 rounded-full font-bold flex items-center gap-2 bg-red-600 text-white hover:bg-red-700 transition-all shadow-xl shadow-red-900/20"
                >
                  <PlayCircle className="w-5 h-5 fill-current" /> Play Movie
                </button>
                <button 
                  onClick={() => handleDownload(movie.title)}
                  className="px-8 py-3.5 rounded-full font-bold flex items-center gap-2 bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition-all"
                >
                  <Download className="w-5 h-5" /> Download
                </button>
                <button 
                  onClick={() => toggleWatchlist(movie.id)}
                  className={`p-3.5 rounded-full border transition-all ${watchlist.includes(movie.id) ? 'bg-green-600 border-green-600 text-white' : 'border-neutral-500 text-white hover:bg-white/10'}`}
                >
                  {watchlist.includes(movie.id) ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => toggleFavorite(movie.id)}
                  className={`p-3.5 rounded-full border transition-all ${favorites.includes(movie.id) ? 'bg-red-600 border-red-600 text-white' : 'border-neutral-500 text-white hover:bg-white/10'}`}
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(movie.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Overview */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Info className="w-6 h-6 text-red-600" /> Plot Summary
            </h2>
            <p className="text-neutral-300 text-lg leading-relaxed font-medium">{movie.overview}</p>
          </section>

          {/* AI Insights Section */}
          <section className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 p-8 rounded-2xl border border-indigo-500/20 shadow-inner">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Sparkles className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Philip's AI Insight</h2>
            </div>
            <div className="text-indigo-100/80 leading-relaxed text-lg prose prose-invert max-w-none">
              {aiInsights ? (
                 aiInsights.split('\n').map((line, i) => <p key={i} className="mb-4">{line}</p>)
              ) : (
                <div className="flex items-center gap-2 text-neutral-500">
                   <Loader2 className="w-4 h-4 animate-spin" /> Analysing cinematic data...
                </div>
              )}
            </div>
          </section>

          {/* Trailer */}
          {trailer && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Volume2 className="w-6 h-6 text-red-600" /> Watch Trailer
              </h2>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-800">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Movie Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}

          {/* Recommendations */}
          <section className="space-y-8">
             <h2 className="text-2xl font-bold text-white">Similar Discoveries</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {recs.map(r => (
                  <MovieCard key={r.id} movie={r} inWatchlist={watchlist.includes(r.id)} onToggleWatchlist={() => toggleWatchlist(r.id)} />
                ))}
             </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-10">
          {/* Watch Providers */}
          <section className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
             <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
               <Globe className="w-5 h-5 text-yellow-500" /> Streaming Options
             </h3>
             {providers ? (
               <div className="space-y-6">
                 {providers.flatrate && (
                   <div>
                     <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">Subscription</p>
                     <div className="flex flex-wrap gap-3">
                       {providers.flatrate.map(p => (
                         <img key={p.provider_name} src={`${TMDB_IMAGE_BASE}/w92${p.logo_path}`} title={p.provider_name} className="w-10 h-10 rounded-lg shadow-md" alt={p.provider_name} />
                       ))}
                     </div>
                   </div>
                 )}
                 {providers.rent && (
                    <div>
                      <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">Rent / Buy</p>
                      <div className="flex flex-wrap gap-3">
                        {providers.rent.map(p => (
                          <img key={p.provider_name} src={`${TMDB_IMAGE_BASE}/w92${p.logo_path}`} title={p.provider_name} className="w-10 h-10 rounded-lg shadow-md" alt={p.provider_name} />
                        ))}
                      </div>
                    </div>
                 )}
                 <div className="pt-4 border-t border-neutral-800">
                   <a 
                    href={providers.link} 
                    target="_blank" 
                    className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1"
                   >
                     View all details on JustWatch <ChevronRight className="w-3 h-3" />
                   </a>
                 </div>
               </div>
             ) : (
               <p className="text-neutral-500 text-sm">No streaming providers found in your region.</p>
             )}
          </section>

          {/* Cast */}
          <section className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
             <h3 className="text-lg font-bold text-white mb-6">Cast & Crew</h3>
             <div className="space-y-4">
               {movie.credits?.cast.slice(0, 5).map(person => (
                 <div key={person.id} className="flex items-center gap-3">
                    <img 
                      src={person.profile_path ? `${TMDB_IMAGE_BASE}/w185${person.profile_path}` : 'https://picsum.photos/100/100'} 
                      className="w-10 h-10 rounded-full object-cover shadow-inner" 
                      alt={person.name} 
                    />
                    <div>
                      <p className="text-sm font-bold text-white leading-none">{person.name}</p>
                      <p className="text-xs text-neutral-500 mt-1">{person.character}</p>
                    </div>
                 </div>
               ))}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const SearchResults = ({ watchlist, toggleWatchlist }: { watchlist: number[], toggleWatchlist: (id: number) => void }) => {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      if (query) {
        const data = await tmdbService.searchMovies(query);
        setResults(data);
      }
      setLoading(false);
    };
    fetchResults();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">
        Search Results for "{query}"
      </h1>
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-red-600 animate-spin" /></div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {results.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              inWatchlist={watchlist.includes(movie.id)}
              onToggleWatchlist={(e) => { e.preventDefault(); toggleWatchlist(movie.id); }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-neutral-500">No movies found matching your search.</div>
      )}
    </div>
  );
};

const Watchlist = ({ watchlist, toggleWatchlist }: { watchlist: number[], toggleWatchlist: (id: number) => void }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const data = await Promise.all(watchlist.map(id => tmdbService.getMovieDetails(id)));
      setMovies(data);
      setLoading(false);
    };
    if (watchlist.length > 0) fetchMovies();
    else { setMovies([]); setLoading(false); }
  }, [watchlist]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Bookmark className="w-8 h-8 text-red-600" /> My Box Watchlist
        </h1>
        <span className="text-neutral-500 font-medium">{movies.length} Movies Saved</span>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-red-600 animate-spin" /></div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              inWatchlist={true}
              onToggleWatchlist={(e) => { e.preventDefault(); toggleWatchlist(movie.id); }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-neutral-900/50 rounded-3xl border border-neutral-900 border-dashed">
           <Bookmark className="w-16 h-16 text-neutral-800 mx-auto mb-4" />
           <p className="text-neutral-500 text-lg">Your watchlist is empty.</p>
           <button onClick={() => window.location.hash = '#/'} className="mt-4 text-red-500 font-bold hover:underline">Explore the Box</button>
        </div>
      )}
    </div>
  );
};

const Favorites = ({ favorites, toggleFavorite }: { favorites: number[], toggleFavorite: (id: number) => void }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [aiRecs, setAiRecs] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [recLoading, setRecLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const data = await Promise.all(favorites.map(id => tmdbService.getMovieDetails(id)));
      setMovies(data);
      setLoading(false);
    };
    if (favorites.length > 0) fetchMovies();
    else { setMovies([]); setLoading(false); }
  }, [favorites]);

  const generateRecs = async () => {
    if (movies.length === 0) return;
    setRecLoading(true);
    const recText = await geminiService.getAIRecommendations(movies);
    setAiRecs(recText);
    setRecLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Heart className="w-8 h-8 text-red-600" /> Favorite Vault
        </h1>
        {movies.length > 0 && (
          <button 
            onClick={generateRecs}
            disabled={recLoading}
            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-red-900/40 disabled:opacity-50 transition-all"
          >
            <Sparkles className={`w-4 h-4 ${recLoading ? 'animate-spin' : ''}`} />
            {recLoading ? 'Box AI Thinking...' : 'Get AI Picks'}
          </button>
        )}
      </div>

      {aiRecs && (
        <div className="mb-12 bg-neutral-900/80 border border-neutral-800 rounded-3xl p-8 backdrop-blur-xl">
           <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
             <Sparkles className="w-5 h-5 text-indigo-400" /> Philip Box AI Recommendations
           </h2>
           <div className="text-neutral-400 leading-relaxed prose prose-invert">
              {aiRecs.split('\n').map((line, i) => <p key={i}>{line}</p>)}
           </div>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-red-600 animate-spin" /></div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onToggleWatchlist={(e) => { e.preventDefault(); }} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-neutral-900/50 rounded-3xl border border-neutral-900 border-dashed">
           <Heart className="w-16 h-16 text-neutral-800 mx-auto mb-4" />
           <p className="text-neutral-500 text-lg">Your vault is empty.</p>
        </div>
      )}
    </div>
  );
};

const Login = ({ onLogin }: { onLogin: (u: User) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      const mockUser = { id: '1', username, email: `${username}@example.com` };
      onLogin(mockUser);
      navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl">
        <div className="flex justify-center mb-8">
           <div className="bg-red-600 p-3 rounded-2xl">
             <Film className="w-8 h-8 text-white" />
           </div>
        </div>
        <h1 className="text-2xl font-bold text-white text-center mb-2">Access Your Box</h1>
        <p className="text-neutral-500 text-center mb-8">Login to manage your personalized movie library</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest px-1">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all"
              placeholder="Your username"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest px-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-red-900/20 active:scale-95"
          >
            Sign In
          </button>
          <div className="text-center pt-4">
            <span className="text-neutral-600 text-sm">New to the Box? </span>
            <button type="button" className="text-red-500 text-sm font-bold hover:underline">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = storageService.getAuth();
    if (auth.user) setUser(auth.user);
    const state = storageService.getAppState();
    setWatchlist(state.watchlist);
    setFavorites(state.favorites);
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    storageService.setAuth({ user: newUser, token: 'mock-jwt-token' });
  };

  const handleLogout = () => {
    setUser(null);
    storageService.clearAuth();
    navigate('/');
  };

  const toggleWatchlist = useCallback((movieId: number) => {
    if (!user) { navigate('/login'); return; }
    const added = storageService.toggleWatchlist(movieId);
    setWatchlist(prev => added ? [...prev, movieId] : prev.filter(id => id !== movieId));
  }, [user, navigate]);

  const toggleFavorite = useCallback((movieId: number) => {
    if (!user) { navigate('/login'); return; }
    const added = storageService.toggleFavorite(movieId);
    setFavorites(prev => added ? [...prev, movieId] : prev.filter(id => id !== movieId));
  }, [user, navigate]);

  return (
    <Layout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Home watchlist={watchlist} toggleWatchlist={toggleWatchlist} />} />
        <Route path="/movie/:id" element={<MovieDetail watchlist={watchlist} toggleWatchlist={toggleWatchlist} favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/search" element={<SearchResults watchlist={watchlist} toggleWatchlist={toggleWatchlist} />} />
        <Route path="/watchlist" element={<Watchlist watchlist={watchlist} toggleWatchlist={toggleWatchlist} />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Layout>
  );
};

export default App;
