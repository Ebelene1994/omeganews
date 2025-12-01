import React from 'react';
import { MOCK_ARTICLES } from '../constants';
import { ArticleCard } from '../components/Cards';
import { Sidebar } from '../components/Layout';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

const Trending: React.FC = () => {
    // Sort by views
    const trendingArticles = [...MOCK_ARTICLES].sort((a, b) => b.views - a.views);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-xs text-gray-500 mb-6 uppercase font-bold tracking-wide">
                <Link to="/" className="hover:text-omega-red">Home</Link>
                <span className="mx-2 text-gray-300">/</span>
                <span className="text-black">Trending</span>
            </div>

            <div className="mb-10 text-center border-b border-gray-200 pb-10">
                <div className="inline-block p-3 bg-red-50 rounded-full mb-4">
                    <TrendingUp size={32} className="text-omega-red" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-black mb-4">Trending Now</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    The most read, shared, and discussed stories on OmegaNews right now.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 gap-8">
                        {trendingArticles.map((article, index) => (
                            <div key={article.id} className="relative">
                                <div className="absolute -left-4 -top-4 w-10 h-10 bg-omega-dark text-white flex items-center justify-center font-bold text-lg rounded-br-lg z-10 shadow-lg">
                                    #{index + 1}
                                </div>
                                <ArticleCard article={article} variant="horizontal" className="border-b border-gray-100 pb-8" />
                            </div>
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

export default Trending;