import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Plus, Eye } from 'lucide-react';

const Pages: React.FC = () => {
  const { pages, deletePage } = useData();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      deletePage(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Pages</h1>
        <Link to="/admin/pages/new" className="bg-omega-red text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition flex items-center">
          <Plus size={16} className="mr-2" /> Create New Page
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">URL Slug</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Updated</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pages.map(page => (
              <tr key={page.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-bold text-gray-900">{page.title}</td>
                <td className="px-6 py-4 text-gray-500">/{page.slug}</td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${page.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {page.status}
                    </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{new Date(page.lastUpdated).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link to={`/admin/pages/preview/${page.id}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 transition" title="Preview">
                      <Eye size={18} />
                    </Link>
                    <Link to={`/admin/pages/edit/${page.id}`} className="p-2 text-gray-400 hover:text-green-600 transition" title="Edit">
                      <Edit2 size={18} />
                    </Link>
                    <button onClick={() => handleDelete(page.id)} className="p-2 text-gray-400 hover:text-red-600 transition" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pages.length === 0 && (
          <div className="p-12 text-center">
              <p className="text-gray-500 mb-4">No custom pages found.</p>
              <Link to="/admin/pages/new" className="text-omega-red font-bold hover:underline">Create your first page</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pages;