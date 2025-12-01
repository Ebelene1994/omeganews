import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MOCK_ARTICLES } from '../constants';
import { ArticleCard } from '../components/Cards';
import { Sidebar } from '../components/Layout';
import { Search as SearchIcon } from 'lucide-react';

const SearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [searchTerm, setSearchTerm] = useState(query);

    useEffect(() => {
        setSearchTerm(query);
    }, [query]);

    const filteredArticles = MOCK_ARTICLES.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) || 
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchParams({ q: searchTerm });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-xs text-gray-500 mb-6 uppercase font-bold tracking-wide">
                <Link to="/" className="hover:text-omega-red">Home</Link>
                <span className="mx-2 text-gray-300">/</span>
                <span className="text-black">Search</span>
            </div>

            <div className="max-w-4xl mx-auto mb-12">
                 <form onSubmit={handleSearch} className="flex gap-4">
                    <div className="relative flex-1">
                        <input 
                            type="text" 
                            className="w-full p-4 pl-12 border border-gray-300 rounded text-lg focus:outline-none focus:border-omega-red shadow-sm"
                            placeholder="Type to search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <button type="submit" className="bg-omega-dark text-white px-8 py-4 font-bold uppercase tracking-wider rounded hover:bg-omega-red transition">Search</button>
                 </form>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <h2 className="text-2xl font-serif font-bold mb-6 pb-2 border-b border-gray-200">
                        Search Results for <span className="text-omega-red">"{query}"</span>
                    </h2>

                    {filteredArticles.length > 0 ? (
                        <div className="space-y-8">
                            {filteredArticles.map(article => (
                                <ArticleCard key={article.id} article={article} variant="horizontal" className="border-b border-gray-100 pb-8 last:border-0" />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-400 mb-2">No results found</h3>
                            <p className="text-gray-500">Try searching for different keywords or categories.</p>
                        </div>
                    )}
                </div>
                <div className="lg:col-span-4">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default SearchPage;