export interface Author {
  id: string; // Added ID for management
  name: string;
  avatar: string;
  bio?: string;
  role?: string;
  email?: string;
  social?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown string
  category: string;
  author: Author;
  date: string; // ISO date string
  imageUrl: string;
  tags: string[];
  views: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export type Theme = 'light' | 'dark';

export interface NavItem {
  label: string;
  path: string;
  isCategory: boolean;
}

export interface Comment {
  id: string;
  author: string;
  date: string;
  content: string;
  avatar: string;
  status?: 'approved' | 'pending' | 'rejected';
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  metaTitle?: string;
  metaDescription?: string;
  heroImage?: string;
  lastUpdated: string;
}

export interface SiteSettings {
  siteTitle: string;
  showAds: boolean;
  logoText: string;
  footerText: string;
  navigation: NavItem[];
}

export interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: string; // 'image', 'video', etc.
  date: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}