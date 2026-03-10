import { Search, Bell, User, LogOut } from 'lucide-react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-left">
                    <h1 className="logo">PHILIP MOVIE BOX</h1>
                    <ul className="nav-links">
                        <li onClick={() => navigate('/')}>Home</li>
                        <li>TV Shows</li>
                        <li>Movies</li>
                        <li>New & Popular</li>
                        <li onClick={() => navigate('/account')}>My List</li>
                    </ul>
                </div>
                <div className="navbar-right">
                    <Search className="icon" />
                    <span className="kid-profile">Children</span>
                    <Bell className="icon" />
                    {user?.email ? (
                        <div className="profile-menu">
                            <span className="user-email">{user.email}</span>
                            <button onClick={handleLogout} className="logout-btn">
                                <LogOut className="icon" />
                            </button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <button onClick={() => navigate('/login')} className="auth-btn sign-in">Sign In</button>
                            <button onClick={() => navigate('/signup')} className="auth-btn sign-up">Sign Up</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
