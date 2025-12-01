import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const NotFound: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
            <h1 className="text-[120px] font-black font-serif text-gray-100 leading-none">404</h1>
            <h2 className="text-3xl font-bold font-serif mb-4 -mt-10 relative z-10">Page Not Found</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            
            <div className="max-w-md w-full mb-8">
                <form action="/#/search" className="flex w-full">
                    <input type="text" name="q" placeholder="Try searching instead..." className="flex-1 p-3 border border-gray-300 rounded-l focus:outline-none focus:border-omega-red" />
                    <button type="submit" className="bg-omega-dark text-white px-4 py-3 rounded-r hover:bg-omega-red transition">
                        <Search size={20} />
                    </button>
                </form>
            </div>

            <Link to="/" className="text-omega-red font-bold uppercase text-sm border-b-2 border-omega-red pb-1 hover:text-black hover:border-black transition">
                Back to Homepage
            </Link>
        </div>
    );
};

export default NotFound;