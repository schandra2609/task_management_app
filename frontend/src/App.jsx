import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-slate-50 font-arial">
                <Navbar />
                <main className="container mx-auto px-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        
                        {/* Protected Route */}
                        <Route 
                            path="/tasks" 
                            element={
                                <ProtectedRoute>
                                    <TaskPage />
                                </ProtectedRoute>
                            } 
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;