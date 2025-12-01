import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Article, Category, Comment, Page, SiteSettings, Author, MediaItem, ToastMessage, NavItem } from '../types';
import { MOCK_ARTICLES, MOCK_COMMENTS, CATEGORIES, NAV_ITEMS } from '../constants';

interface DataContextType {
  articles: Article[];
  categories: Category[];
  comments: Comment[];
  pages: Page[];
  settings: SiteSettings;
  authors: Author[];
  media: MediaItem[];
  
  // Notification
  toasts: ToastMessage[];
  notify: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;

  // Auth
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;

  // Actions
  addArticle: (article: Article) => void;
  updateArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
  
  addPage: (page: Page) => void;
  updatePage: (page: Page) => void;
  deletePage: (id: string) => void;
  
  updateSettings: (settings: SiteSettings) => void;
  
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  
  updateCommentStatus: (id: string, status: 'approved' | 'rejected') => void;
  deleteComment: (id: string) => void;

  addAuthor: (author: Author) => void;
  updateAuthor: (author: Author) => void;
  deleteAuthor: (id: string) => void;

  addMedia: (item: MediaItem) => void;
  deleteMedia: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial state from localStorage or fallback to constants
  const loadState = <T,>(key: string, fallback: T): T => {
    const saved = localStorage.getItem(`omega_${key}`);
    return saved ? JSON.parse(saved) : fallback;
  };

  const [articles, setArticles] = useState<Article[]>(() => loadState('articles', MOCK_ARTICLES.map(a => ({
      ...a,
      author: { ...a.author, id: `auth-${Math.random().toString(36).substr(2, 9)}` } // Ensure mock authors have IDs
  }))));
  
  const [categories, setCategories] = useState<Category[]>(() => loadState('categories', CATEGORIES));
  
  const [comments, setComments] = useState<Comment[]>(() => loadState('comments', MOCK_COMMENTS.map(c => ({...c, status: 'approved' as const}))));
  
  const [pages, setPages] = useState<Page[]>(() => loadState('pages', []));
  
  const [settings, setSettings] = useState<SiteSettings>(() => loadState('settings', {
    siteTitle: 'OmegaNews',
    showAds: false,
    logoText: 'OmegaNews',
    footerText: '© 2023 OmegaNews. All rights reserved.',
    navigation: NAV_ITEMS
  }));

  const [authors, setAuthors] = useState<Author[]>(() => loadState('authors', [
      { id: '1', name: 'Sarah Jenkins', avatar: 'https://picsum.photos/seed/author1/100/100', role: 'Senior Editor', bio: 'Experienced journalist covering global affairs.' },
      { id: '2', name: 'David Chen', avatar: 'https://picsum.photos/seed/author2/100/100', role: 'Tech Contributor', bio: 'Tech enthusiast and gadget reviewer.' },
      { id: '3', name: 'Admin User', avatar: 'https://picsum.photos/seed/admin/100/100', role: 'Administrator', bio: 'Site administrator.' },
  ]));

  const [media, setMedia] = useState<MediaItem[]>(() => loadState('media', [
      { id: '1', url: 'https://picsum.photos/seed/news1/800/600', name: 'news-summit.jpg', type: 'image', date: new Date().toISOString() },
      { id: '2', url: 'https://picsum.photos/seed/tech1/800/600', name: 'tech-ai.jpg', type: 'image', date: new Date().toISOString() },
      { id: '3', url: 'https://picsum.photos/seed/business1/800/600', name: 'stock-market.jpg', type: 'image', date: new Date().toISOString() },
      { id: '4', url: 'https://picsum.photos/seed/travel1/800/600', name: 'travel-europe.jpg', type: 'image', date: new Date().toISOString() },
  ]));

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!sessionStorage.getItem('omega_admin_token');
  });

  // Persistence Effects
  useEffect(() => localStorage.setItem('omega_articles', JSON.stringify(articles)), [articles]);
  useEffect(() => localStorage.setItem('omega_categories', JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem('omega_comments', JSON.stringify(comments)), [comments]);
  useEffect(() => localStorage.setItem('omega_pages', JSON.stringify(pages)), [pages]);
  useEffect(() => localStorage.setItem('omega_settings', JSON.stringify(settings)), [settings]);
  useEffect(() => localStorage.setItem('omega_authors', JSON.stringify(authors)), [authors]);
  useEffect(() => localStorage.setItem('omega_media', JSON.stringify(media)), [media]);

  // Toast Logic
  const notify = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => dismissToast(id), 3000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Auth Actions
  const login = (email: string, pass: string) => {
    // Mock Authentication Logic
    // In a real app, this would be an API call
    if (email === 'admin@omeganews.com' && pass === 'admin123') {
        const token = 'mock_jwt_token_' + Date.now();
        sessionStorage.setItem('omega_admin_token', token);
        setIsAuthenticated(true);
        notify('Welcome back, Admin!');
        return true;
    }
    notify('Invalid email or password', 'error');
    return false;
  };

  const logout = () => {
      sessionStorage.removeItem('omega_admin_token');
      setIsAuthenticated(false);
      notify('Logged out successfully.');
  };

  // Actions
  const addArticle = (article: Article) => {
      setArticles(prev => [article, ...prev]);
      notify('Post created successfully!');
  };
  const updateArticle = (article: Article) => {
      setArticles(prev => prev.map(a => a.id === article.id ? article : a));
      notify('Post updated successfully!');
  };
  const deleteArticle = (id: string) => {
      setArticles(prev => prev.filter(a => a.id !== id));
      notify('Post deleted.');
  };

  const addPage = (page: Page) => {
      setPages(prev => [page, ...prev]);
      notify('Page created successfully!');
  };
  const updatePage = (page: Page) => {
      setPages(prev => prev.map(p => p.id === page.id ? page : p));
      notify('Page updated successfully!');
  };
  const deletePage = (id: string) => {
      setPages(prev => prev.filter(p => p.id !== id));
      notify('Page deleted.');
  };

  const updateSettings = (newSettings: SiteSettings) => {
      setSettings(newSettings);
      notify('Settings saved!');
  };

  const addCategory = (category: Category) => {
      setCategories(prev => [...prev, category]);
      notify('Category added!');
  };
  const updateCategory = (category: Category) => {
      setCategories(prev => prev.map(c => c.id === category.id ? category : c));
      notify('Category updated!');
  };
  const deleteCategory = (id: string) => {
      setCategories(prev => prev.filter(c => c.id !== id));
      notify('Category deleted.');
  };

  const updateCommentStatus = (id: string, status: 'approved' | 'rejected') => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    notify(`Comment ${status}.`);
  };
  const deleteComment = (id: string) => {
      setComments(prev => prev.filter(c => c.id !== id));
      notify('Comment deleted.');
  };

  const addAuthor = (author: Author) => {
      setAuthors(prev => [...prev, author]);
      notify('Author added!');
  };
  const updateAuthor = (author: Author) => {
      setAuthors(prev => prev.map(a => a.id === author.id ? author : a));
      notify('Author updated!');
  };
  const deleteAuthor = (id: string) => {
      setAuthors(prev => prev.filter(a => a.id !== id));
      notify('Author deleted.');
  };

  const addMedia = (item: MediaItem) => {
      setMedia(prev => [item, ...prev]);
      notify('Media uploaded!');
  };
  const deleteMedia = (id: string) => {
      setMedia(prev => prev.filter(m => m.id !== id));
      notify('Media deleted.');
  };

  return (
    <DataContext.Provider value={{
      articles, categories, comments, pages, settings, authors, media,
      toasts, notify, dismissToast,
      isAuthenticated, login, logout,
      addArticle, updateArticle, deleteArticle,
      addPage, updatePage, deletePage,
      updateSettings,
      addCategory, updateCategory, deleteCategory,
      updateCommentStatus, deleteComment,
      addAuthor, updateAuthor, deleteAuthor,
      addMedia, deleteMedia
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};