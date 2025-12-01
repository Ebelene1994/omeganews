import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_ARTICLES } from '../constants';
import { ArticleCard } from '../components/Cards';
import { Sidebar } from '../components/Layout';
import { Twitter, Mail, Globe } from 'lucide-react';

const AuthorProfile: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const decodedName = decodeURIComponent(name || '');
    
    // In a real app, you'd fetch author details by ID. Here we mock it.
    const authorArticles = MOCK_ARTICLES.filter(a => a.author.name === decodedName);
    const author = authorArticles[0]?.author || { name: decodedName, avatar: 'https://picsum.photos/seed/default/100/100' };

    return (
        <div className="container mx-auto px-4 py-8">
             <div className="text-xs text-gray-500 mb-6 uppercase font-bold tracking-wide">
                <Link to="/" className="hover:text-omega-red">Home</Link>
                <span className="mx-2 text-gray-300">/</span>
                <span className="text-gray-300">Authors</span>
                <span className="mx-2 text-gray-300">/</span>
                <span className="text-black">{decodedName}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    {/* Author Profile Header */}
                    <div className="bg-gray-50 p-8 rounded border border-gray-100 mb-12 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
                        <img src={author.avatar} alt={author.name} className="w-32 h-32 rounded-full border-4 border-white shadow-sm" />
                        <div>
                            <h1 className="text-3xl font-serif font-bold mb-2">{author.name}</h1>
                            <p className="text-gray-500 uppercase text-xs tracking-widest font-bold mb-4">Senior Contributor</p>
                            <p className="text-gray-600 mb-4 leading-relaxed max-w-xl">
                                Detailed insights and analysis on global events, technology trends, and cultural shifts. With over 10 years of experience in digital journalism.
                            </p>
                            <div className="flex justify-center md:justify-start space-x-4 text-gray-400">
                                <a href="#" className="hover:text-omega-red transition"><Twitter size={18} /></a>
                                <a href="#" className="hover:text-omega-red transition"><Globe size={18} /></a>
                                <a href="#" className="hover:text-omega-red transition"><Mail size={18} /></a>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-serif font-bold mb-6 pb-2 border-b border-gray-200">
                        Articles by <span className="text-omega-red">{author.name}</span>
                    </h2>

                    {authorArticles.length > 0 ? (
                        <div className="space-y-8">
                            {authorArticles.map(article => (
                                <ArticleCard key={article.id} article={article} variant="horizontal" className="border-b border-gray-100 pb-8 last:border-0" />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50">
                            <p className="text-gray-500">No articles found for this author.</p>
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

export default AuthorProfile;