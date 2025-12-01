import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
    article: Article;
    variant?: 'default' | 'hero-large' | 'hero-small' | 'horizontal';
    showExcerpt?: boolean;
    className?: string;
}

export const CategoryBadge: React.FC<{ category: string, className?: string }> = ({ category, className = '' }) => (
    <Link 
        to={`/category/${category.toLowerCase()}`} 
        onClick={(e) => e.stopPropagation()}
        className={`bg-omega-red text-white text-[10px] font-bold uppercase px-2 py-1 tracking-wider inline-block hover:bg-red-800 transition-colors z-20 relative ${className}`}
    >
        {category}
    </Link>
);

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'default', showExcerpt = true, className = '' }) => {
    
    if (variant === 'hero-large') {
        return (
            <div className={`relative h-[400px] md:h-[500px] group overflow-hidden ${className}`}>
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full md:w-3/4">
                    <CategoryBadge category={article.category} className="mb-3" />
                    <h2 className="text-white font-serif font-bold text-2xl md:text-4xl leading-tight group-hover:underline decoration-omega-red decoration-2 underline-offset-4">
                        <Link to={`/article/${article.id}`}>{article.title}</Link>
                    </h2>
                    <div className="flex items-center text-gray-300 text-xs mt-3 space-x-3">
                        <span className="flex items-center">
                            <User size={12} className="mr-1"/> 
                            <Link to={`/author/${encodeURIComponent(article.author.name)}`} className="hover:text-omega-red transition-colors">{article.author.name}</Link>
                        </span>
                        <span className="flex items-center"><Clock size={12} className="mr-1"/> {new Date(article.date).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'hero-small') {
        return (
            <div className={`relative h-[200px] md:h-[246px] group overflow-hidden ${className}`}>
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                    <CategoryBadge category={article.category} className="mb-2" />
                    <h3 className="text-white font-serif font-bold text-lg leading-snug group-hover:text-omega-red transition-colors line-clamp-2">
                        <Link to={`/article/${article.id}`}>{article.title}</Link>
                    </h3>
                </div>
            </div>
        );
    }

    if (variant === 'horizontal') {
         return (
            <div className={`flex gap-5 group items-start ${className}`}>
                <div className="w-1/3 md:w-[240px] aspect-video relative overflow-hidden flex-shrink-0">
                    <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                     <div className="absolute top-2 left-2">
                        <CategoryBadge category={article.category} />
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="font-serif font-bold text-lg md:text-xl leading-snug group-hover:text-omega-red transition-colors mb-2">
                        <Link to={`/article/${article.id}`}>{article.title}</Link>
                    </h3>
                    <div className="flex items-center text-gray-400 text-xs mb-3 space-x-3">
                        <span className="flex items-center uppercase font-bold text-gray-800">
                             <Link to={`/author/${encodeURIComponent(article.author.name)}`} className="hover:text-omega-red transition-colors">{article.author.name}</Link>
                        </span>
                        <span className="flex items-center">{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                        {article.excerpt}
                    </p>
                </div>
            </div>
         );
    }

    // Default vertical card
    return (
        <div className={`group flex flex-col h-full ${className}`}>
            <div className="relative aspect-video overflow-hidden mb-4">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute bottom-2 left-2">
                    <CategoryBadge category={article.category} />
                </div>
            </div>
            <h3 className="font-serif font-bold text-xl leading-snug group-hover:text-omega-red transition-colors mb-2">
                 <Link to={`/article/${article.id}`}>{article.title}</Link>
            </h3>
            <div className="flex items-center text-gray-400 text-xs mb-3 space-x-3">
                 <span className="font-bold text-gray-700">
                     <Link to={`/author/${encodeURIComponent(article.author.name)}`} className="hover:text-omega-red transition-colors">{article.author.name}</Link>
                 </span>
                 <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
            {showExcerpt && (
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
                    {article.excerpt}
                </p>
            )}
        </div>
    );
};