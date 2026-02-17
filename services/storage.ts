
import { User, AuthState, AppState } from '../types';
import { MONGODB_ATLAS_API_KEY } from '../constants';

const AUTH_KEY = 'cine_auth';
const APP_STATE_KEY = 'cine_app_state';

// Helper for simulating Atlas Sync
const syncToAtlas = async (action: string, data: any) => {
  console.log(`[Atlas Sync] Action: ${action} | Using Key: ${MONGODB_ATLAS_API_KEY.slice(0, 8)}...`);
  // In a real MERN environment, this would call the backend Express proxy to interact with Atlas
  return true;
};

export const storageService = {
  getAuth: (): AuthState => {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : { user: null, token: null };
  },

  setAuth: (auth: AuthState) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    if (auth.user) syncToAtlas('LOGIN_SESSION', auth.user.id);
  },

  clearAuth: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  getAppState: (): AppState => {
    const data = localStorage.getItem(APP_STATE_KEY);
    return data ? JSON.parse(data) : { watchlist: [], favorites: [], history: [] };
  },

  updateAppState: (state: Partial<AppState>) => {
    const current = storageService.getAppState();
    const newState = { ...current, ...state };
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(newState));
    syncToAtlas('UPDATE_STATE', newState);
  },

  toggleWatchlist: (movieId: number) => {
    const state = storageService.getAppState();
    const exists = state.watchlist.includes(movieId);
    const newList = exists 
      ? state.watchlist.filter(id => id !== movieId)
      : [...state.watchlist, movieId];
    storageService.updateAppState({ watchlist: newList });
    syncToAtlas(exists ? 'WATCHLIST_REMOVE' : 'WATCHLIST_ADD', { movieId });
    return !exists;
  },

  toggleFavorite: (movieId: number) => {
    const state = storageService.getAppState();
    const exists = state.favorites.includes(movieId);
    const newList = exists 
      ? state.favorites.filter(id => id !== movieId)
      : [...state.favorites, movieId];
    storageService.updateAppState({ favorites: newList });
    syncToAtlas(exists ? 'FAVORITE_REMOVE' : 'FAVORITE_ADD', { movieId });
    return !exists;
  },

  addToHistory: (movieId: number) => {
    const state = storageService.getAppState();
    const newList = [movieId, ...state.history.filter(id => id !== movieId)].slice(0, 50);
    storageService.updateAppState({ history: newList });
    syncToAtlas('HISTORY_UPDATE', { movieId });
  }
};
