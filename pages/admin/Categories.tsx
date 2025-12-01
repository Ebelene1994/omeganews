import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Trash2, Plus, X, Edit2, Save } from 'lucide-react';
import { Category } from '../../types';

const Categories: React.FC = () => {
    const { categories, addCategory, updateCategory, deleteCategory, notify } = useData();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', slug: '' });

    const resetForm = () => {
        setFormData({ name: '', slug: '' });
        setEditingId(null);
        setIsFormOpen(false);
    };

    const handleEditClick = (cat: Category) => {
        setFormData({ name: cat.name, slug: cat.slug });
        setEditingId(cat.id);
        setIsFormOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        
        const slug = formData.slug || formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        if (editingId) {
            updateCategory({
                id: editingId,
                name: formData.name,
                slug: slug
            });
        } else {
            addCategory({
                id: Date.now().toString(),
                name: formData.name,
                slug: slug
            });
        }
        resetForm();
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this category?")) {
            deleteCategory(id);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-serif font-bold text-gray-900">Categories</h1>
                <button 
                    onClick={() => { resetForm(); setIsFormOpen(!isFormOpen); }} 
                    className="bg-omega-red text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition flex items-center"
                >
                    {isFormOpen ? <X size={16} className="mr-2"/> : <Plus size={16} className="mr-2"/>}
                    {isFormOpen ? 'Cancel' : 'Add Category'}
                </button>
            </div>

            {isFormOpen && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6 animate-in slide-in-from-top-2">
                    <h3 className="font-bold mb-4 text-gray-800">{editingId ? 'Edit Category' : 'Add New Category'}</h3>
                    <form onSubmit={handleSave} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full">
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Name</label>
                            <input 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-omega-red" 
                                placeholder="e.g. Technology"
                                required 
                            />
                        </div>
                        <div className="flex-1 w-full">
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Slug</label>
                            <input 
                                value={formData.slug} 
                                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-omega-red" 
                                placeholder="Auto-generated if empty"
                            />
                        </div>
                        <button type="submit" className="w-full md:w-auto bg-green-600 text-white px-6 py-3 rounded font-bold hover:bg-green-700 flex items-center justify-center">
                            <Save size={18} className="mr-2" /> {editingId ? 'Update' : 'Save'}
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Slug</th>
                            <th className="px-6 py-4">Post Count</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {categories.map(cat => (
                            <tr key={cat.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-bold text-gray-900">{cat.name}</td>
                                <td className="px-6 py-4 text-gray-500">{cat.slug}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-bold">
                                        {/* Mock count for now */}
                                        {Math.floor(Math.random() * 20) + 1} posts
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button 
                                            onClick={() => handleEditClick(cat)} 
                                            className="p-2 text-gray-400 hover:text-green-600 transition"
                                            title="Edit"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(cat.id)} 
                                            className="p-2 text-gray-400 hover:text-red-600 transition"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Categories;