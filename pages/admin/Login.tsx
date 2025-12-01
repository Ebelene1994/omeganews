import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Lock, Mail, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, isAuthenticated } = useData();
    const navigate = useNavigate();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate async authentication delay for better UX
        setTimeout(() => {
            const success = login(email, password);
            setIsLoading(false);

            if (success) {
                navigate('/admin');
            } else {
                setError('Invalid email or password');
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
                <div className="text-center mb-8">
                    <div className="bg-omega-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform hover:scale-110">
                        <Lock size={32} className="text-omega-red" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-gray-900">Admin Login</h1>
                    <p className="text-gray-500 text-sm mt-1">Sign in to access the dashboard</p>
                    <p className="text-xs text-gray-400 mt-2">(Use: admin@omeganews.com / admin123)</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div
                            className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm font-bold text-center animate-in fade-in slide-in-from-top-2 duration-300"
                            role="alert"
                            aria-live="polite"
                        >
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-omega-red focus:ring-2 focus:ring-omega-red/20 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="admin@omeganews.com"
                                required
                                disabled={isLoading}
                                aria-label="Email Address"
                            />
                            <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-omega-red focus:ring-2 focus:ring-omega-red/20 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                                aria-label="Password"
                            />
                            <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-omega-dark text-white p-3 rounded-lg font-bold uppercase tracking-wider hover:bg-omega-red transition-all duration-300 shadow-sm hover:shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        disabled={isLoading}
                        aria-label={isLoading ? 'Signing in...' : 'Sign In'}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Signing In...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a href="/" className="text-sm text-gray-500 hover:text-omega-red transition-colors">
                        Back to Website
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;