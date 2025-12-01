import React from 'react';
import { CATEGORIES } from '../constants';
import { Sidebar } from '../components/Layout';
import { Link } from 'react-router-dom';

const CategoriesList: React.FC = () => {
    const bgColors = [
        'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
        'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500'
    ];

    return (
        <div className="container mx-auto px-4 py-8">
             <div className="text-xs text-gray-500 mb-6 uppercase font-bold tracking-wide">
                <Link to="/" className="hover:text-omega-red">Home</Link>
                <span className="mx-2 text-gray-300">/</span>
                <span className="text-black">Categories</span>
            </div>

            <div className="mb-10 text-center border-b border-gray-200 pb-10">
                <h1 className="text-4xl md:text-5xl font-serif font-black mb-4">All Categories</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Explore our diverse range of topics and find the stories that matter to you.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {CATEGORIES.map((cat, idx) => (
                            <Link 
                                to={`/category/${cat.slug}`} 
                                key={cat.id} 
                                className="group relative h-40 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition"
                            >
                                <div className={`absolute inset-0 ${bgColors[idx % bgColors.length]} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                    <h3 className="text-2xl font-serif font-bold uppercase tracking-wider">{cat.name}</h3>
                                    <span className="mt-2 text-xs opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition">Browse Articles &rarr;</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-4">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default CategoriesList;