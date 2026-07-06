import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaTasks, FaSignOutAlt, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { logout, getCurrentUser, getCurrentToken, getMe } from '../services/authService.js';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(getCurrentUser());
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const isLoggedIn = !!getCurrentToken();

    // Sync user state on route change (e.g. after login/register)
    useEffect(() => {
        setUser(getCurrentUser());
        setDropdownOpen(false);
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Fetch user info if logged in but no user data cached
    useEffect(() => {
        if (isLoggedIn && !user) {
            getMe().then(setUser).catch(() => {});
        }
    }, [isLoggedIn, user]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
        logout();
        navigate('/login');
    };

    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : '?';
    };

    return (
        <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Left: Brand */}
                <Link to="/" className="flex items-center space-x-2 text-2xl font-bold font-times">
                    <FaTasks className="text-blue-500" />
                    <span>TaskMaster</span>
                </Link>

                {/* Right: Desktop */}
                <div className="hidden md:flex items-center space-x-4">
                    {isLoggedIn ? (
                        /* --- Logged In: Avatar Dropdown --- */
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg hover:bg-blue-500 transition-all focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                                title={user?.name || 'Profile'}
                            >
                                {getInitial(user?.name)}
                            </button>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn z-50">
                                    {/* User Info */}
                                    <div className="px-5 py-4 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                                {getInitial(user?.name)}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-slate-900 truncate">{user?.name || 'User'}</p>
                                                <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Logout Button */}
                                    <div className="p-2">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
                                        >
                                            <FaSignOutAlt />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* --- Logged Out: Sign Up + Log In buttons --- */
                        <>
                            <Link
                                to="/register"
                                className="px-5 py-2 text-sm font-semibold border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors"
                            >
                                Sign Up
                            </Link>
                            <Link
                                to="/login"
                                className="px-5 py-2 text-sm font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Log In
                            </Link>
                        </>
                    )}
                </div>

                {/* Right: Mobile Toggle */}
                <button className="md:hidden text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-slate-800 border-t border-slate-700">
                    {isLoggedIn ? (
                        <div className="p-4 space-y-3">
                            {/* User Info (Mobile) */}
                            <div className="flex items-center gap-3 pb-3 border-b border-slate-700">
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                    {getInitial(user?.name)}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-white truncate">{user?.name || 'User'}</p>
                                    <p className="text-xs text-slate-400 truncate">{user?.email || ''}</p>
                                </div>
                            </div>

                            <Link to="/tasks" className="block py-2 hover:text-blue-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                Dashboard
                            </Link>
                            <button onClick={handleLogout} className="w-full text-left py-2 text-red-400 flex items-center gap-2">
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    ) : (
                        <div className="p-4 space-y-3">
                            <Link to="/register" className="block py-2 hover:text-blue-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                Sign Up
                            </Link>
                            <Link to="/login" className="block py-2 hover:text-blue-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                Log In
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;