import React from 'react';
import { MOCK_ARTICLES } from '../constants';
import { ArticleCard } from '../components/Cards';
import { Sidebar, SectionTitle } from '../components/Layout';
import { Link } from 'react-router-dom';

const LatestNews: React.FC = () => {
    // Sort by date (mock)
    const sortedArticles = [...MOCK_ARTICLES].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-xs text-gray-500 mb-6 uppercase font-bold tracking-wide">
                <Link to="/" className="hover:text-omega-red">Home</Link>
                <span className="mx-2 text-gray-300">/</span>
                <span className="text-black">Latest News</span>
            </div>

            <div className="mb-10 text-center border-b border-gray-200 pb-10">
                <h1 className="text-4xl md:text-5xl font-serif font-black mb-4">Latest News</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Stay up to date with the breaking stories and latest developments from around the globe.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <div className="space-y-8">
                        {sortedArticles.map(article => (
                            <ArticleCard key={article.id} article={article} variant="horizontal" className="border-b border-gray-100 pb-8 last:border-0" />
                        ))}
                    </div>

                    {/* Pagination Mock */}
                     <div className="mt-16 flex justify-center space-x-2">
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-300 bg-omega-red text-white border-omega-red transition rounded">1</button>
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-omega-red hover:text-white hover:border-omega-red transition rounded">2</button>
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-omega-red hover:text-white hover:border-omega-red transition rounded">3</button>
                        <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-omega-red hover:text-white hover:border-omega-red transition rounded">Next</button>
                    </div>
                </div>
                <div className="lg:col-span-4">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default LatestNews;