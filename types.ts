
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string;
  videos?: {
    results: {
      key: string;
      site: string;
      type: string;
    }[];
  };
  credits?: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string;
    }[];
  };
  "watch/providers"?: {
    results: Record<string, {
      link: string;
      flatrate?: { logo_path: string; provider_name: string }[];
      rent?: { logo_path: string; provider_name: string }[];
      buy?: { logo_path: string; provider_name: string }[];
    }>;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface AppState {
  watchlist: number[];
  favorites: number[];
  history: number[];
}
