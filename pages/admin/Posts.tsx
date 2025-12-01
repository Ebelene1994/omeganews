import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Plus, Eye } from 'lucide-react';

const Posts: React.FC = () => {
  const { articles, deleteArticle } = useData();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      deleteArticle(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Posts</h1>
        <Link to="/admin/posts/new" className="bg-omega-red text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition flex items-center">
          <Plus size={16} className="mr-2" /> New Post
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {articles.map(article => (
              <tr key={article.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <img src={article.imageUrl} alt="" className="w-10 h-10 rounded object-cover" />
                    <span className="truncate max-w-xs block">{article.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{article.author.name}</td>
                <td className="px-6 py-4">
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">{article.category}</span>
                </td>
                <td className="px-6 py-4 text-gray-500">{new Date(article.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link to={`/article/${article.id}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 transition" title="View">
                      <Eye size={18} />
                    </Link>
                    <Link to={`/admin/posts/edit/${article.id}`} className="p-2 text-gray-400 hover:text-green-600 transition" title="Edit">
                      <Edit2 size={18} />
                    </Link>
                    <button onClick={() => handleDelete(article.id)} className="p-2 text-gray-400 hover:text-red-600 transition" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {articles.length === 0 && (
          <div className="p-8 text-center text-gray-500">No posts found. Create one!</div>
        )}
      </div>
    </div>
  );
};

export default Posts;