import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MainLayout } from './components/Layout';
import { AdminLayout } from './layouts/AdminLayout';
import { DataProvider } from './contexts/DataContext';

import Home from './pages/Home';
import CategoryPage from './pages/Category';
import ArticlePage from './pages/Article';
import LatestNews from './pages/LatestNews';
import CategoriesList from './pages/CategoriesList';
import SearchPage from './pages/Search';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AuthorProfile from './pages/AuthorProfile';
import Trending from './pages/Trending';
import NewsletterSuccess from './pages/NewsletterSuccess';
import NotFound from './pages/NotFound';
import DynamicPage from './pages/DynamicPage';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminPosts from './pages/admin/Posts';
import PostEditor from './pages/admin/PostEditor';
import AdminPages from './pages/admin/Pages';
import PageEditor from './pages/admin/PageEditor';
import AdminCategories from './pages/admin/Categories';
import AdminComments from './pages/admin/Comments';
import AdminSettings from './pages/admin/Settings';
import AdminAuthors from './pages/admin/Authors';
import AuthorEditor from './pages/admin/AuthorEditor';
import AdminMedia from './pages/admin/Media';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin Login */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              
              <Route path="posts" element={<AdminPosts />} />
              <Route path="posts/new" element={<PostEditor />} />
              <Route path="posts/edit/:id" element={<PostEditor />} />
              
              <Route path="pages" element={<AdminPages />} />
              <Route path="pages/new" element={<PageEditor />} />
              <Route path="pages/edit/:id" element={<PageEditor />} />
              <Route path="pages/preview/:id" element={<DynamicPage />} />
              
              <Route path="categories" element={<AdminCategories />} />
              
              <Route path="authors" element={<AdminAuthors />} />
              <Route path="authors/new" element={<AuthorEditor />} />
              <Route path="authors/edit/:id" element={<AuthorEditor />} />
              
              <Route path="media" element={<AdminMedia />} />
              <Route path="comments" element={<AdminComments />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* Public Routes */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/latest-news" element={<MainLayout><LatestNews /></MainLayout>} />
          <Route path="/categories" element={<MainLayout><CategoriesList /></MainLayout>} />
          <Route path="/search" element={<MainLayout><SearchPage /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
          <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicy /></MainLayout>} />
          <Route path="/terms-of-service" element={<MainLayout><TermsOfService /></MainLayout>} />
          <Route path="/trending" element={<MainLayout><Trending /></MainLayout>} />
          <Route path="/newsletter-success" element={<MainLayout><NewsletterSuccess /></MainLayout>} />
          
          <Route path="/category/:slug" element={<MainLayout><CategoryPage /></MainLayout>} />
          <Route path="/article/:id" element={<MainLayout><ArticlePage /></MainLayout>} />
          <Route path="/post/:id" element={<MainLayout><ArticlePage /></MainLayout>} />
          <Route path="/author/:name" element={<MainLayout><AuthorProfile /></MainLayout>} />
          <Route path="/page/:slug" element={<MainLayout><DynamicPage /></MainLayout>} />
          
          {/* 404 Route */}
          <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
        </Routes>
      </HashRouter>
    </DataProvider>
  );
};

export default App;