import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, BookOpen, MessageSquare, Settings, Users, Image as ImageIcon, LogOut, Search, Bell, X } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings, toasts, dismissToast, logout } = useData();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: FileText, label: 'Posts', path: '/admin/posts' },
    { icon: BookOpen, label: 'Pages', path: '/admin/pages' },
    { icon: Users, label: 'Authors', path: '/admin/authors' },
    { icon: Users, label: 'Categories', path: '/admin/categories' },
    { icon: ImageIcon, label: 'Media Library', path: '/admin/media' },
    { icon: MessageSquare, label: 'Comments', path: '/admin/comments' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Toast Notifications */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`flex items-center p-4 rounded-lg shadow-lg min-w-[300px] animate-in slide-in-from-right-full transition-all ${
              toast.type === 'success' ? 'bg-green-600 text-white' : 
              toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
            }`}
          >
            <div className="flex-1 text-sm font-bold">{toast.message}</div>
            <button onClick={() => dismissToast(toast.id)} className="ml-4 hover:opacity-80">
              <X size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <aside className="w-64 bg-omega-dark text-white flex flex-col flex-shrink-0 transition-all duration-300">
        <div className="p-6 border-b border-gray-800">
          <Link to="/" className="font-serif text-2xl font-bold tracking-tight">
            Omega<span className="text-omega-red">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-omega-red text-white font-medium' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon size={20} className="mr-3" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link to="/" className="flex items-center px-4 py-3 text-gray-400 hover:text-white transition-colors">
            <LogOut size={20} className="mr-3" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center text-gray-400 bg-gray-100 rounded-lg px-3 py-2 w-96">
            <Search size={18} className="mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none focus:outline-none text-sm text-gray-800 w-full"
            />
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative text-gray-500 hover:text-omega-red transition">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-omega-red rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Editor in Chief</p>
              </div>
              <img src="https://picsum.photos/seed/admin/100/100" alt="Admin" className="w-10 h-10 rounded-full border border-gray-200" />
            </div>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <button 
              onClick={handleLogout}
              className="flex items-center text-gray-500 hover:text-red-600 transition font-bold text-sm"
              title="Logout"
            >
              <LogOut size={18} className="mr-2" /> Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};