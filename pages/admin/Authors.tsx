import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Plus, User } from 'lucide-react';

const AdminAuthors: React.FC = () => {
  const { authors, deleteAuthor } = useData();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      deleteAuthor(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Authors</h1>
        <Link to="/admin/authors/new" className="bg-omega-red text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition flex items-center">
          <Plus size={16} className="mr-2" /> New Author
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Profile</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Bio Excerpt</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {authors.map(author => (
              <tr key={author.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <img src={author.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                    <span className="font-bold">{author.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{author.role || 'Contributor'}</td>
                <td className="px-6 py-4 text-gray-500 truncate max-w-xs">{author.bio}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link to={`/admin/authors/edit/${author.id}`} className="p-2 text-gray-400 hover:text-green-600 transition" title="Edit">
                      <Edit2 size={18} />
                    </Link>
                    <button onClick={() => handleDelete(author.id)} className="p-2 text-gray-400 hover:text-red-600 transition" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {authors.length === 0 && (
          <div className="p-8 text-center text-gray-500">No authors found. Create one!</div>
        )}
      </div>
    </div>
  );
};

export default AdminAuthors;