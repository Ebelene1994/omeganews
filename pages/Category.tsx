import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_ARTICLES, CATEGORIES } from '../constants';
import { ArticleCard } from '../components/Cards';
import { Sidebar } from '../components/Layout';

const CategoryPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const category = CATEGORIES.find(c => c.slug === slug);
    const categoryName = category ? category.name : 'Category';
    
    // Filter articles (mock filtering)
    // In a real app, this would be an API call
    let articles = MOCK_ARTICLES.filter(a => 
        slug === 'world' || // Show all for demo if world
        a.category.toLowerCase() === categoryName.toLowerCase() ||
        (slug === 'tech' && (a.category === 'Tech' || a.category === 'Science')) // Mock complex query
    );

    // If no articles found (mock data limited), show random ones to fill UI
    if (articles.length < 2) articles = [...articles, ...MOCK_ARTICLES.slice(0, 6)];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="text-xs text-gray-500 mb-6 uppercase font-bold tracking-wide">
                <Link to="/" className="hover:text-omega-red">Home</Link>
                <span className="mx-2 text-gray-300">/</span>
                <span className="text-black">{categoryName}</span>
            </div>

            {/* Category Header */}
            <div className="mb-10 text-center border-b border-gray-200 pb-10">
                <h1 className="text-4xl md:text-5xl font-serif font-black mb-4">{categoryName}</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    The latest news, updates, and in-depth reports from the world of {categoryName}. 
                    Stay informed with our comprehensive coverage.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                        {articles.map(article => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-16 flex justify-center space-x-2">
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-omega-red hover:text-white hover:border-omega-red transition rounded">1</button>
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-omega-red hover:text-white hover:border-omega-red transition rounded">2</button>
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-omega-red hover:text-white hover:border-omega-red transition rounded">3</button>
                        <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-omega-red hover:text-white hover:border-omega-red transition rounded">Next</button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;