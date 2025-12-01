import React from 'react';
import { useData } from '../contexts/DataContext';
import { ArticleCard } from '../components/Cards';
import { Sidebar, SectionTitle } from '../components/Layout';

const Home: React.FC = () => {
    const { articles } = useData();
    
    // Slice data for specific sections
    const heroMain = articles[0];
    const heroSide = articles.slice(1, 3);
    const editorsPick = articles.slice(3, 7);
    const techNews = articles.filter(a => a.category === 'Tech' || a.category === 'Science').slice(0, 4);
    const missed = articles.slice(7, 12);

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Hero Section */}
            {articles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-1 mb-12">
                    <div className="md:col-span-8">
                        <ArticleCard article={heroMain} variant="hero-large" />
                    </div>
                    <div className="md:col-span-4 flex flex-col gap-1">
                        {heroSide.map(article => (
                            <ArticleCard key={article.id} article={article} variant="hero-small" />
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-8">
                    
                    {/* Editor's Pick */}
                    <section className="mb-12">
                        <SectionTitle title="Editor's Pick" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {editorsPick.map(article => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </div>
                    </section>

                    {/* Tech & Science Section */}
                    <section className="mb-12">
                         <SectionTitle title="Tech & Science" link="/category/tech" />
                         <div className="grid grid-cols-1 gap-8">
                             {techNews.map(article => (
                                 <ArticleCard key={article.id} article={article} variant="horizontal" />
                             ))}
                         </div>
                    </section>

                    {/* You May Have Missed Carousel-ish */}
                    <section className="bg-omega-dark text-white p-8 -mx-4 md:mx-0 md:rounded-lg mb-12">
                        <h2 className="text-2xl font-serif font-bold mb-6 border-l-4 border-omega-red pl-4">Don't Miss</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {missed.slice(0, 3).map(article => (
                                <div key={article.id} className="group">
                                    <div className="overflow-hidden mb-3 aspect-video">
                                         <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                                    </div>
                                    <span className="text-omega-red text-xs font-bold uppercase block mb-1">{article.category}</span>
                                    <h3 className="font-bold font-serif leading-snug group-hover:text-omega-red transition-colors">
                                        {article.title}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default Home;