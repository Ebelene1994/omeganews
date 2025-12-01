import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Facebook, Twitter, Instagram, ChevronUp, Mail, ArrowRight, MapPin, Phone } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { useData } from '../contexts/DataContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useData();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="font-sans relative">
      {/* Top Bar */}
      <div className="bg-omega-dark text-white text-xs py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="text-gray-400">|</span>
            <Link to="/about" className="hover:text-omega-red transition">About Us</Link>
            <Link to="/contact" className="hover:text-omega-red transition">Contact</Link>
            <Link to="/trending" className="hover:text-omega-red transition">Trending</Link>
          </div>
          <div className="flex space-x-3">
            <Facebook size={14} className="hover:text-omega-red cursor-pointer transition" />
            <Twitter size={14} className="hover:text-omega-red cursor-pointer transition" />
            <Instagram size={14} className="hover:text-omega-red cursor-pointer transition" />
          </div>
        </div>
      </div>

      {/* Main Header Area */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center relative">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden self-start absolute mt-2">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>

        {/* Logo */}
        <div className="text-center md:text-left flex-1">
          <Link to="/" className="inline-block">
            <h1 className="font-serif text-5xl md:text-6xl font-black tracking-tight text-black">
              {settings.logoText.slice(0, 5)}<span className="text-omega-red">{settings.logoText.slice(5)}</span>
            </h1>
            <p className="text-xs uppercase tracking-widest text-gray-500 mt-1 font-bold">The Global Perspective</p>
          </Link>
        </div>

        {/* Ad Placeholder */}
        {settings.showAds && (
          <div className="hidden md:block">
            <div className="w-[728px] h-[90px] bg-gray-100 flex items-center justify-center text-gray-400 text-sm border border-gray-200">
              Advertisement Space (728x90)
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="border-t border-b border-gray-200 sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4 relative">
          <nav className={`flex-col md:flex-row md:flex items-center justify-center ${isMenuOpen ? 'flex' : 'hidden md:flex'}`}>
            <ul className="flex flex-col md:flex-row md:space-x-8 text-sm font-bold uppercase tracking-wide py-4 md:py-0">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <li key={item.path} className="border-b md:border-none border-gray-100 last:border-none">
                    <Link
                      to={item.path}
                      className={`block py-3 md:py-4 px-2 hover:text-omega-red transition-colors relative group ${isActive ? 'text-omega-red' : 'text-gray-800'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-omega-red transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${isActive ? 'scale-x-100' : ''}`}></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                    {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                </button>
            </div>
          </nav>

          {/* Search Dropdown */}
          {isSearchOpen && (
            <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-md p-4 z-50 animate-in slide-in-from-top-2">
              <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex">
                <input 
                  type="text" 
                  placeholder="Search for articles, topics, or authors..." 
                  className="flex-1 p-3 border border-gray-300 focus:outline-none focus:border-omega-red text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="bg-omega-red text-white px-6 py-3 font-bold uppercase text-xs tracking-wider hover:bg-red-700 transition">
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
    const navigate = useNavigate();
    const { settings, categories } = useData();
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/newsletter-success');
    };

    return (
        <footer className="bg-omega-dark text-white pt-16 mt-20 font-sans relative">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                {/* Brand Column */}
                <div className="md:col-span-1">
                    <h2 className="font-serif text-3xl font-bold mb-4">{settings.logoText.slice(0, 5)}<span className="text-omega-red">{settings.logoText.slice(5)}</span></h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Bringing you the latest news, in-depth analysis, and perspectives from around the globe. Trusted by millions since 2010.
                    </p>
                    <div className="flex space-x-4">
                        <div className="bg-gray-800 p-2 rounded-full hover:bg-omega-red transition cursor-pointer"><Facebook size={18}/></div>
                        <div className="bg-gray-800 p-2 rounded-full hover:bg-omega-red transition cursor-pointer"><Twitter size={18}/></div>
                        <div className="bg-gray-800 p-2 rounded-full hover:bg-omega-red transition cursor-pointer"><Instagram size={18}/></div>
                    </div>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-lg font-bold uppercase mb-6 border-l-4 border-omega-red pl-3">Categories</h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                        {categories.slice(0, 6).map(cat => (
                            <li key={cat.id}>
                                <Link to={`/category/${cat.slug}`} className="hover:text-white transition flex items-center">
                                    <ArrowRight size={12} className="mr-2"/> {cat.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Popular Tags */}
                <div>
                    <h3 className="text-lg font-bold uppercase mb-6 border-l-4 border-omega-red pl-3">Trending Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {['Politics', 'Tech', 'Travel', 'Health', 'Crypto', 'AI', 'Fashion'].map(tag => (
                            <Link to={`/search?q=${tag}`} key={tag} className="bg-gray-800 hover:bg-omega-red text-xs px-3 py-1 rounded transition cursor-pointer text-white">
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-bold uppercase mb-6 border-l-4 border-omega-red pl-3">Newsletter</h3>
                    <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter to get the latest news delivered to your inbox.</p>
                    <form onSubmit={handleSubscribe} className="flex">
                        <input type="email" placeholder="Your email" required className="bg-gray-800 text-white px-4 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-omega-red" />
                        <button type="submit" className="bg-omega-red px-4 py-2 hover:bg-red-700 transition"><Mail size={16}/></button>
                    </form>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-8 pb-8 container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <p>{settings.footerText}</p>
                <div className="flex space-x-6 mt-4 md:mt-0 md:pr-14">
                    <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
                    <Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link>
                    <a href="#" className="hover:text-white">Cookie Policy</a>
                </div>
            </div>

             {/* Floating Back to Top Button */}
            <button 
                onClick={scrollToTop}
                className="absolute bottom-6 right-6 bg-omega-red text-white p-3 rounded shadow-lg hover:bg-white hover:text-omega-red transition-all duration-300 z-20 group"
                aria-label="Back to Top"
            >
                <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
            </button>
        </footer>
    );
};

export const SectionTitle: React.FC<{ title: string; link?: string }> = ({ title, link }) => (
    <div className="flex justify-between items-end border-b-2 border-gray-100 mb-6 pb-2 relative">
        <h2 className="text-xl md:text-2xl font-bold uppercase font-sans tracking-tight relative z-10">
            <span className="border-b-4 border-omega-red pb-2">{title}</span>
        </h2>
        {link && <Link to={link} className="text-xs font-bold text-gray-500 hover:text-omega-red uppercase mb-1">View All</Link>}
    </div>
);

export const Sidebar: React.FC = () => {
    const { articles, categories, settings } = useData();

    return (
        <aside className="w-full">
            {/* Social Connect */}
            <div className="mb-10">
                <SectionTitle title="Stay Connected" />
                <div className="grid grid-cols-3 gap-2">
                    <a href="#" className="bg-[#3b5998] text-white py-3 flex flex-col items-center justify-center hover:opacity-90 transition">
                        <Facebook size={20} />
                        <span className="text-xs font-bold mt-1">Like</span>
                    </a>
                    <a href="#" className="bg-[#1DA1F2] text-white py-3 flex flex-col items-center justify-center hover:opacity-90 transition">
                        <Twitter size={20} />
                        <span className="text-xs font-bold mt-1">Follow</span>
                    </a>
                    <a href="#" className="bg-[#C13584] text-white py-3 flex flex-col items-center justify-center hover:opacity-90 transition">
                        <Instagram size={20} />
                        <span className="text-xs font-bold mt-1">Follow</span>
                    </a>
                </div>
            </div>

            {/* Newsletter */}
            <div className="mb-10 bg-gray-50 p-6 border border-gray-100">
                 <h3 className="text-lg font-bold mb-2 font-serif">Subscribe to our Newsletter</h3>
                 <p className="text-sm text-gray-600 mb-4">Get the latest updates and special offers directly in your inbox.</p>
                 <form onSubmit={(e) => { e.preventDefault(); window.location.href = '#/newsletter-success'; }}>
                    <input type="email" placeholder="Email address" required className="w-full border border-gray-300 p-2 mb-2 text-sm focus:outline-none focus:border-omega-red" />
                    <button type="submit" className="w-full bg-omega-dark text-white uppercase text-xs font-bold py-3 hover:bg-omega-red transition">Subscribe</button>
                 </form>
            </div>

            {/* Latest News */}
            <div className="mb-10">
                <SectionTitle title="Latest News" link="/latest-news" />
                <div className="space-y-6">
                    {articles.slice(0, 5).map(article => (
                        <div key={article.id} className="flex gap-4 group cursor-pointer">
                            <div className="w-20 h-20 flex-shrink-0 overflow-hidden relative">
                                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div>
                                <h4 className="font-serif font-bold text-sm leading-snug group-hover:text-omega-red transition-colors line-clamp-2">
                                    <Link to={`/article/${article.id}`}>{article.title}</Link>
                                </h4>
                                <span className="text-xs text-gray-400 mt-1 block">{new Date(article.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Categories Widget */}
            <div className="mb-10">
                <SectionTitle title="Categories" link="/categories" />
                <ul className="space-y-2">
                    {categories.map(cat => (
                        <li key={cat.id} className="border-b border-gray-100 pb-2 last:border-0">
                            <Link to={`/category/${cat.slug}`} className="flex justify-between items-center text-sm font-medium text-gray-700 hover:text-omega-red transition">
                                <span>{cat.name}</span>
                                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">
                                    {Math.floor(Math.random() * 50) + 5}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* Advertisement */}
            {settings.showAds && (
                <div className="hidden md:block">
                <div className="w-full h-[300px] bg-gray-100 flex items-center justify-center text-gray-400 text-sm border border-gray-200">
                    Ad Space (300x250)
                </div>
                </div>
            )}
        </aside>
    );
};

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};