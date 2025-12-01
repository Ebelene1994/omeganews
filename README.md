# OmegaNews – Modern Blog Platform with Full Admin Dashboard

**OmegaNews** is a modern, responsive, React + TypeScript blog platform featuring a fully functional Admin Dashboard that allows administrators to manage pages, posts, categories, authors, media, comments, and site settings.  
The public website provides an elegant news-reading experience, while access to admin controls is strictly protected.

## Features

### Public Website
- Fully responsive blog UI
- Modern, clean layout
- Homepage with featured posts, trending section, categories, and latest updates
- Dynamic blog post pages
- Category pages
- Author profile pages
- Search functionality
- Newsletter subscription (placeholder API)
- Error-free routing and navigation
- Hidden advertisement space (included in codebase but not visible on UI)

### Admin Dashboard
Accessible **only** to authenticated admins.

#### Admin Capabilities
- Login authentication (admin-only access)
- Create, edit, and delete **pages**
- Create, edit, and delete **posts**
- Manage **categories** (add, edit, delete)
- Manage **authors** (profiles, bios, images)
- **Media library** (upload, delete, preview)
- Moderate **comments** (approve, reject, delete)
- **Website settings** (title, logo, navigation links, footer, hidden ad toggle)
- Live preview of pages and posts
- Autosave support for editors
- Toast notifications for success/error
- Loading skeletons for better UX

## Security & Access Control
- Protected admin routes using an authentication token
- Unauthorized users automatically redirected to `/admin/login`
- Admin routes:
  - `/admin`
  - `/admin/login`
  - `/admin/pages` · `/admin/pages/new` · `/admin/pages/edit/:id`
  - `/admin/posts` · `/admin/posts/new` · `/admin/posts/edit/:id`
  - `/admin/authors`
  - `/admin/categories`
  - `/admin/comments`
  - `/admin/media`
  - `/admin/settings`

Public users **NEVER** see admin links or dashboard UI.

## Tech Stack

### Frontend
- React (TypeScript)
- React Router
- TailwindCSS / Custom CSS
- Context API / Custom Hooks for state management
- Rich text editors (Quill or Tiptap)
- Placeholder API for all CRUD operations

### Build System
- Vite (or CRA)
- Fully modular component architecture

## Project Structure Overview
