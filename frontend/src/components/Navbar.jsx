import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTasks, FaSignOutAlt, FaBars, FaTimes, FaHome } from 'react-icons/fa';
import { logout } from '../services/authService.js';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 text-2xl font-bold font-times">
                    <FaTasks className="text-blue-500" />
                    <span>TaskMaster</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                        <FaHome /> <span>Home</span>
                    </Link>
                    <Link to="/tasks" className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                        <FaTasks /> <span>Dashboard</span>
                    </Link>
                    <button onClick={handleLogout} className="flex items-center space-x-1 bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition">
                        <FaSignOutAlt /> <span>Logout</span>
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-slate-800 p-4 space-y-4 border-t border-slate-700">
                    <Link to="/" className="block py-2 hover:text-blue-400" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/tasks" className="block py-2 hover:text-blue-400" onClick={() => setIsOpen(false)}>Dashboard</Link>
                    <button onClick={handleLogout} className="w-full text-left py-2 text-red-400">Logout</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;