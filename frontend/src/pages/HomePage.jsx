import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheckDouble, FaMobileAlt, FaShieldAlt } from 'react-icons/fa';

const HomePage = () => {
    return (
        <div className="bg-slate-50 min-h-[90vh]">
            {/* Hero Section */}
            <header className="container mx-auto px-6 py-16 text-center">
                <h1 className="text-5xl md:text-7xl font-bold font-times text-slate-900 mb-6 leading-tight">
                    Master Your Day, <br />
                    <span className="text-blue-600">One Task at a Time.</span>
                </h1>
                <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto font-arial">
                    The ultimate task management tool designed for clarity and productivity. 
                    Organize your life, hit your deadlines, and achieve your goals with ease.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/register" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-200">
                        Get Started for Free <FaArrowRight />
                    </Link>
                    <Link to="/login" className="bg-white text-slate-900 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition">
                        Sign In
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6 text-xl">
                            <FaCheckDouble />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Simple Tracking</h3>
                        <p className="text-gray-500">Easily create, edit, and categorize tasks with our intuitive interface.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-6 text-xl">
                            <FaMobileAlt />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Fully Responsive</h3>
                        <p className="text-gray-500">Access your workspace from any device—be it mobile, tablet, or desktop.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6 text-xl">
                            <FaShieldAlt />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Secure Auth</h3>
                        <p className="text-gray-500">Your data is private and protected with industry-standard JWT authentication.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;