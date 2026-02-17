
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Film, Bookmark, User, LogOut, Menu, X, Heart, Box, Cloud, ShieldCheck } from 'lucide-react';
import { MONGODB_ATLAS_API_KEY } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-red-600 p-1.5 rounded-lg group-hover:bg-red-500 transition-colors shadow-lg shadow-red-600/20">
                  <Box className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white hidden sm:block brand-glow">Philip Movie Box</span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Home</Link>
                {user && (
                  <>
                    <Link to="/watchlist" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Watchlist</Link>
                    <Link to="/favorites" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Favorites</Link>
                  </>
                )}
              </nav>
            </div>

            <div className="flex-1 max-w-md mx-8 hidden sm:block">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all text-white"
                />
              </form>
            </div>

            <div className="flex items-center gap-4">
              {user && (
                <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full" title="Cloud Sync Active (MongoDB Atlas)">
                  <Cloud className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">Atlas Connected</span>
                </div>
              )}

              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800">
                    <User className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm font-medium text-neutral-300">{user.username}</span>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-red-900/20"
                >
                  Sign In
                </Link>
              )}
              
              <button 
                className="md:hidden p-2 text-neutral-400"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black pt-20 px-4">
          <nav className="flex flex-col gap-4">
            <form onSubmit={handleSearch} className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-full py-3 pl-10 pr-4 text-sm focus:outline-none text-white"
              />
            </form>
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium py-2 border-b border-neutral-800">Home</Link>
            {user && (
              <>
                <Link to="/watchlist" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium py-2 border-b border-neutral-800">Watchlist</Link>
                <Link to="/favorites" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium py-2 border-b border-neutral-800">Favorites</Link>
                <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="text-lg font-medium py-2 text-red-500 text-left">Logout</button>
              </>
            )}
          </nav>
        </div>
      )}

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-black border-t border-neutral-900 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-neutral-500 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Box className="w-5 h-5 text-red-600" />
              <span className="text-lg font-bold text-white">Philip Movie Box</span>
            </div>
            <p className="max-w-xs">Your personalized cinematic vault. Stream, discover, and organize your favorite titles.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Settings</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Integrations</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-500" /> Cloud Sync: <span className="text-neutral-300">Active</span></li>
              <li>Powered by <a href="https://www.themoviedb.org/" target="_blank" className="text-blue-400">TMDB</a></li>
              <li>AI by <a href="https://deepmind.google/technologies/gemini/" target="_blank" className="text-blue-400">Google Gemini</a></li>
              <li>DB via <a href="https://www.mongodb.com/cloud/atlas" target="_blank" className="text-green-500">MongoDB Atlas</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-neutral-900 text-center text-xs text-neutral-600">
          &copy; {new Date().getFullYear()} Philip Movie Box. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
