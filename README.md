📘 OmegaNews – Modern Blog Platform with Full Admin Dashboard

OmegaNews is a modern, responsive, React + TypeScript blog platform featuring a fully functional Admin Dashboard that allows administrators to manage pages, posts, categories, authors, media, comments, and site settings.
The public website provides an elegant news-reading experience, while access to admin controls is strictly protected.

🚀 Features
📰 Public Website

Fully responsive blog UI

Modern, clean layout

Homepage with featured posts, trending section, categories, and latest updates

Dynamic blog post pages

Category pages

Author profile pages

Search functionality

Newsletter subscription (placeholder API)

Error-free routing and navigation

Hidden advertisement space (included in codebase but not visible on UI)

🎛️ Admin Dashboard

Accessible only to authenticated admins.

Admin Capabilities

Login authentication (admin-only access)

Create, edit, and delete pages

Create, edit, and delete posts

Manage categories (add, edit, delete)

Manage authors (profiles, bios, images)

Media library (upload, delete, preview)

Moderate comments (approve, reject, delete)

Website settings (title, logo, navigation links, footer, hidden ad toggle)

Live preview of pages and posts

Autosave support for editors

Toast notifications for success/error

Loading skeletons for better UX

🛡️ Security & Access Control

Protected admin routes using an authentication token

Unauthorized users automatically redirected to /admin/login

Admin routes:

/admin
/admin/login
/admin/pages
/admin/pages/new
/admin/pages/edit/:id
/admin/posts
/admin/posts/new
/admin/posts/edit/:id
/admin/authors
/admin/categories
/admin/comments
/admin/media
/admin/settings


Public users NEVER see admin links or dashboard UI

🧩 Tech Stack
Frontend

React (TypeScript)

React Router

TailwindCSS / Custom CSS (depending on build)

Context API / Custom Hooks for state management

Rich text editors (Quill/Tiptap)

Placeholder API for all CRUD operations

Build System

Vite or CRA (depending on configuration)

Fully modular component architecture

📁 Project Structure Overview
/src
 ├── components
 │    ├── ui/
 │    ├── layout/
 │    ├── cards/
 │    ├── modals/
 │    └── forms/
 │
 ├── pages
 │    ├── public/
 │    ├── admin/
 │    │    ├── Dashboard.tsx
 │    │    ├── Pages/
 │    │    ├── Posts/
 │    │    ├── Categories/
 │    │    ├── Authors/
 │    │    ├── Media/
 │    │    ├── Comments/
 │    │    └── Settings/
 │
 ├── routes
 │     ├── PublicRoutes.tsx
 │     ├── AdminRoutes.tsx
 │     └── ProtectedAdminRoute.tsx
 │
 ├── api
 │     ├── pages.api.ts
 │     ├── posts.api.ts
 │     ├── categories.api.ts
 │     ├── authors.api.ts
 │     └── media.api.ts
 │
 ├── context/
 │     └── AdminAuthContext.tsx
 │
 ├── assets/
 └── main.tsx

🔐 Admin Authentication
Login Flow

Admin navigates to /admin/login

Enters email & password

System verifies credentials using placeholder API

On success:

Authentication token stored in sessionStorage

Admin is redirected to /admin

Unauthorized visitors attempting to access /admin/* → redirected to /admin/login

🛠️ Setup and Installation
1. Clone the project
git clone https://github.com/your-repo/OmegaNews.git
cd OmegaNews

2. Install dependencies
npm install

3. Run the development server
npm run dev

4. Build for production
npm run build

5. Preview production build
npm run preview

🔧 Login to Admin Dashboard

Navigate to http://localhost:5173/#/admin/login
Test with credentials: admin@omeganews.com / admin123


📌 Key Functional Highlights
Public Side

Smooth routing

SEO-friendly structure

Clean typography and spacing

Modern component-based UI

Admin Side

Every button routed correctly

Fully interactive tables and editors

CRUD operations for all major entities

Confirmation modals, toasts, loading states

Auto-save for content editing

Responsive dashboard layout

🧪 Testing

Placeholder data stored in:

Local storage

Session storage

In-memory mock API

Admin dashboard thoroughly tested for:

Route protection

Button click correctness

Accurate state updates


💡 Future Improvements

Connect to real backend API

JWT authentication

Role-based permission system

Analytics and reporting

Multi-author collaboration tools