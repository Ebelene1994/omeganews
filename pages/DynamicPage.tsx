import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import NotFound from './NotFound';

const DynamicPage: React.FC = () => {
    // Allow lookup by slug (public) or id (admin preview)
    const { slug, id } = useParams<{ slug?: string; id?: string }>();
    const { pages } = useData();
    
    const page = pages.find(p => 
        (slug && p.slug === slug) || 
        (id && p.id === id)
    );

    useEffect(() => {
        if (page) {
            document.title = `${page.metaTitle || page.title} - OmegaNews`;
        }
    }, [page]);

    // If page not found
    if (!page) {
        return <NotFound />;
    }

    // If public access (via slug) and not published, show 404
    if (slug && page.status !== 'published') {
         return <NotFound />;
    }

    return (
        <div className="container mx-auto px-4 py-12">
             <div className="max-w-4xl mx-auto">
                {/* Preview Banner for Admin */}
                {id && (
                    <div className="bg-omega-red text-white text-center py-3 mb-8 rounded shadow-md font-bold uppercase tracking-widest text-xs flex justify-center items-center gap-2">
                        <span>Preview Mode</span>
                        <span className="bg-white/20 px-2 py-0.5 rounded">{page.status}</span>
                    </div>
                )}
                
                <h1 className="text-4xl md:text-5xl font-serif font-black mb-8 text-center">{page.title}</h1>
                
                {page.heroImage && (
                    <img src={page.heroImage} alt={page.title} className="w-full h-[400px] object-cover rounded-lg mb-8 shadow-sm" />
                )}

                <div 
                    className="prose prose-lg max-w-none font-serif text-gray-800"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />
                
                <div className="mt-12 text-sm text-gray-400 text-center border-t border-gray-100 pt-8">
                    Last updated: {new Date(page.lastUpdated).toLocaleDateString()}
                </div>
             </div>
        </div>
    );
};

export default DynamicPage;