import React from 'react';
import { useData } from '../../contexts/DataContext';
import { FileText, Users, MessageSquare, TrendingUp, Plus, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ title: string; value: number | string; icon: any; color: string }> = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
    </div>
    <div className={`p-4 rounded-full bg-opacity-10 ${color.replace('text-', 'bg-')} ${color}`}>
      <Icon size={24} />
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { articles, comments, categories, pages, media } = useData();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, here is what's happening with your blog.</p>
        </div>
        <div className="flex space-x-3">
          <Link to="/admin/media" className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition flex items-center">
             <ImageIcon size={16} className="mr-2" /> Upload Media
          </Link>
          <Link to="/admin/pages/new" className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition flex items-center">
             <Plus size={16} className="mr-2" /> New Page
          </Link>
          <Link to="/admin/posts/new" className="bg-omega-dark text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-omega-red transition flex items-center">
            <Plus size={16} className="mr-2" /> New Post
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard title="Total Posts" value={articles.length} icon={FileText} color="text-blue-600" />
        <StatCard title="Total Pages" value={pages.length} icon={Users} color="text-purple-600" />
        <StatCard title="Comments" value={comments.length} icon={MessageSquare} color="text-green-600" />
        <StatCard title="Categories" value={categories.length} icon={TrendingUp} color="text-orange-600" />
        <StatCard title="Media Files" value={media.length} icon={ImageIcon} color="text-pink-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-800">Recent Posts</h3>
            <Link to="/admin/posts" className="text-sm text-omega-red hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Views</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {articles.slice(0, 5).map(article => (
                  <tr key={article.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900 truncate max-w-xs">{article.title}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">{article.category}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{new Date(article.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-gray-500">{article.views.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Recent Comments</h3>
          <div className="space-y-6">
            {comments.slice(0, 4).map(comment => (
              <div key={comment.id} className="flex gap-3">
                <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm">{comment.author}</span>
                    <span className="text-xs text-gray-400">• {new Date(comment.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
            {comments.length === 0 && <p className="text-gray-400 text-sm">No recent comments.</p>}
          </div>
          <Link to="/admin/comments" className="block text-center mt-6 text-sm font-bold text-omega-red hover:underline">Manage Comments</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;