import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Sidebar, SectionTitle } from '../components/Layout';
import { CategoryBadge, ArticleCard } from '../components/Cards';
import { Facebook, Twitter, Linkedin, Bookmark, Heart, Mail, MessageSquare, Share2, Link as LinkIcon, CheckCircle } from 'lucide-react';
import NotFound from './NotFound';

const ArticlePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { articles, comments } = useData();
    const article = articles.find(a => a.id === id);
    const relatedArticles = article ? articles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3) : [];
    
    // Interaction States
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    
    // Comment State
    const [newComment, setNewComment] = useState('');
    const [commentStatus, setCommentStatus] = useState<'idle' | 'success'>('idle');
    const commentInputRef = useRef<HTMLTextAreaElement>(null);

    // Mock filtering for approved comments
    const articleComments = comments.filter(c => c.status === 'approved');

    useEffect(() => {
        window.scrollTo(0,0);
        setCommentStatus('idle');
        setNewComment('');
        setIsLiked(false);
        setIsSaved(false);
    }, [id]);

    if (!article) return <NotFound />;

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // In a real app, this would dispatch an action
      setCommentStatus('success');
      setNewComment('');
      showNotification('Comment submitted for approval!');
      setTimeout(() => setCommentStatus('idle'), 5000);
    };

    const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin') => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(article.title);
        let shareUrl = '';

        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
                break;
        }

        window.open(shareUrl, '_blank', 'width=600,height=400');
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        showNotification('Link copied to clipboard!');
    };

    const handleLike = () => {
        const newState = !isLiked;
        setIsLiked(newState);
        if (newState) showNotification('Article liked!');
    };

    const handleSave = () => {
        const newState = !isSaved;
        setIsSaved(newState);
        if (newState) showNotification('Article saved to your library.');
        else showNotification('Article removed from library.');
    };

    const handleReply = () => {
        commentInputRef.current?.focus();
        commentInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div className="bg-white relative">
            {/* Toast Notification */}
            {notification && (
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center animate-in fade-in slide-in-from-top-4 duration-300">
                    <CheckCircle size={16} className="text-green-400 mr-2" />
                    <span className="text-sm font-bold">{notification}</span>
                </div>
            )}

            {/* Hero Image for Article */}
            <div className="w-full h-[400px] md:h-[500px] relative">
                 <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/40"></div>
                 <div className="absolute bottom-0 w-full p-6 md:p-12 bg-gradient-to-t from-black/90 to-transparent text-white container mx-auto left-0 right-0">
                     <div className="max-w-4xl">
                        <CategoryBadge category={article.category} />
                        <h1 className="text-3xl md:text-5xl font-serif font-bold mt-4 mb-4 leading-tight">{article.title}</h1>
                        <div className="flex items-center space-x-6 text-sm md:text-base font-medium">
                            <div className="flex items-center">
                                <img src={article.author.avatar} alt={article.author.name} className="w-10 h-10 rounded-full mr-3 border-2 border-omega-red" />
                                <span>By <Link to={`/author/${encodeURIComponent(article.author.name)}`} className="hover:text-omega-red transition underline decoration-1 underline-offset-2">{article.author.name}</Link></span>
                            </div>
                            <span className="text-gray-300">{new Date(article.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric'})}</span>
                            <span className="text-gray-300">{article.views.toLocaleString()} Views</span>
                        </div>
                     </div>
                 </div>
            </div>

            <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Article Content */}
                <article className="lg:col-span-8">
                    {/* Share & Actions Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center border-b border-t border-gray-100 py-4 mb-8 gap-4 sm:gap-0">
                        <div className="flex space-x-2">
                            <span className="mr-2 text-xs font-bold uppercase text-gray-500 self-center hidden sm:block">Share:</span>
                            <button onClick={() => handleShare('facebook')} className="bg-[#3b5998] text-white p-2 rounded hover:opacity-90 transition transform hover:scale-110"><Facebook size={18} /></button>
                            <button onClick={() => handleShare('twitter')} className="bg-[#1DA1F2] text-white p-2 rounded hover:opacity-90 transition transform hover:scale-110"><Twitter size={18} /></button>
                            <button onClick={() => handleShare('linkedin')} className="bg-[#0077b5] text-white p-2 rounded hover:opacity-90 transition transform hover:scale-110"><Linkedin size={18} /></button>
                            <button onClick={handleCopyLink} className="bg-gray-700 text-white p-2 rounded hover:bg-omega-red transition transform hover:scale-110" title="Copy Link"><LinkIcon size={18} /></button>
                        </div>
                        <div className="flex space-x-6">
                            <button 
                                onClick={handleSave}
                                className={`flex items-center text-sm font-bold uppercase transition group ${isSaved ? 'text-omega-red' : 'text-gray-500 hover:text-omega-red'}`}
                            >
                                <Bookmark size={18} className={`mr-2 transition-transform group-hover:scale-110 ${isSaved ? 'fill-current' : ''}`}/> 
                                {isSaved ? 'Saved' : 'Save'}
                            </button>
                            <button 
                                onClick={handleLike}
                                className={`flex items-center text-sm font-bold uppercase transition group ${isLiked ? 'text-omega-red' : 'text-gray-500 hover:text-omega-red'}`}
                            >
                                <Heart size={18} className={`mr-2 transition-transform group-hover:scale-110 ${isLiked ? 'fill-current' : ''}`}/> 
                                {isLiked ? 'Liked' : 'Like'}
                            </button>
                        </div>
                    </div>

                    {/* Body Text */}
                    <div 
                        className="prose prose-lg max-w-none font-serif text-gray-800 leading-8 first-letter:text-5xl first-letter:font-bold first-letter:text-omega-red first-letter:mr-3 first-letter:float-left"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Tags */}
                    <div className="mt-10 border-t border-gray-200 pt-6">
                        <span className="font-bold text-sm uppercase mr-2 text-gray-500">Tags:</span>
                        {article.tags.map(tag => (
                            <Link key={tag} to={`/search?q=${encodeURIComponent(tag)}`} className="inline-block bg-gray-100 hover:bg-omega-red hover:text-white text-gray-600 text-xs px-3 py-1 rounded mr-2 mb-2 transition">
                                #{tag}
                            </Link>
                        ))}
                    </div>

                    {/* Author Box */}
                    <div className="bg-gray-50 p-8 mt-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 rounded border border-gray-100 text-center sm:text-left transition hover:shadow-md">
                        <Link to={`/author/${encodeURIComponent(article.author.name)}`}>
                            <img src={article.author.avatar} alt={article.author.name} className="w-20 h-20 rounded-full hover:opacity-80 transition" />
                        </Link>
                        <div>
                            <h4 className="font-bold text-lg mb-1">
                                About <Link to={`/author/${encodeURIComponent(article.author.name)}`} className="hover:text-omega-red transition">{article.author.name}</Link>
                            </h4>
                            <p className="text-sm text-gray-600">Senior editor and journalist covering global events and technology trends. Passionate about uncovering the truth behind the headlines.</p>
                            <div className="flex mt-3 space-x-4 text-gray-400 justify-center sm:justify-start">
                                <a href="#" className="hover:text-omega-red transition transform hover:scale-110"><Twitter size={18}/></a>
                                <a href="#" className="hover:text-omega-red transition transform hover:scale-110"><Mail size={18}/></a>
                            </div>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-12" id="comments">
                      <SectionTitle title={`Comments (${articleComments.length})`} />
                      
                      {/* Comment List */}
                      <div className="space-y-8 mb-12">
                        {articleComments.map(comment => (
                          <div key={comment.id} className="flex gap-4 animate-in fade-in duration-700">
                             <img src={comment.avatar} alt={comment.author} className="w-12 h-12 rounded-full border border-gray-200 flex-shrink-0" />
                             <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition">
                                <div className="flex justify-between items-center mb-2">
                                   <h5 className="font-bold text-sm">{comment.author}</h5>
                                   <span className="text-xs text-gray-400">{new Date(comment.date).toLocaleDateString()} at {new Date(comment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                                <button 
                                    onClick={handleReply}
                                    className="text-xs text-omega-red font-bold uppercase mt-3 hover:text-red-800 flex items-center group"
                                >
                                    Reply <Share2 size={12} className="ml-1 transform rotate-180 group-hover:translate-x-1 transition" />
                                </button>
                             </div>
                          </div>
                        ))}
                      </div>

                      {/* Comment Form */}
                      <div className="bg-gray-50 p-8 border border-gray-200 rounded relative overflow-hidden">
                        {commentStatus === 'success' ? (
                            <div className="text-center py-10 animate-in fade-in zoom-in duration-300">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                                    <CheckCircle size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Comment Submitted!</h3>
                                <p className="text-gray-500">Your comment has been sent for moderation and will appear shortly.</p>
                                <button 
                                    onClick={() => setCommentStatus('idle')}
                                    className="mt-6 text-omega-red text-sm font-bold hover:underline"
                                >
                                    Write another comment
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-lg font-bold font-serif mb-6 flex items-center"><MessageSquare size={20} className="mr-2"/> Leave a Reply</h3>
                                <form onSubmit={handleCommentSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input type="text" placeholder="Name" className="p-3 border border-gray-300 w-full text-sm focus:outline-none focus:border-omega-red rounded" required />
                                    <input type="email" placeholder="Email" className="p-3 border border-gray-300 w-full text-sm focus:outline-none focus:border-omega-red rounded" required />
                                </div>
                                <textarea 
                                    ref={commentInputRef}
                                    rows={4} 
                                    placeholder="Write your comment here..." 
                                    className="p-3 border border-gray-300 w-full text-sm focus:outline-none focus:border-omega-red mb-4 rounded resize-y"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    required
                                ></textarea>
                                <button type="submit" className="bg-omega-dark text-white uppercase text-xs font-bold px-8 py-4 hover:bg-omega-red transition rounded shadow-sm hover:shadow-md">Post Comment</button>
                                </form>
                            </>
                        )}
                      </div>
                    </div>

                    {/* Related Posts */}
                    <div className="mt-16">
                        <SectionTitle title="You Might Also Like" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedArticles.map(rel => (
                                <ArticleCard key={rel.id} article={rel} showExcerpt={false} className="text-sm" />
                            ))}
                        </div>
                    </div>
                </article>

                {/* Sidebar */}
                <aside className="lg:col-span-4">
                    <Sidebar />
                </aside>
            </div>
        </div>
    );
};

export default ArticlePage;