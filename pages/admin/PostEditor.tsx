import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Article } from '../../types';
import { Save, ArrowLeft, Trash2 } from 'lucide-react';

const PostEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { articles, addArticle, updateArticle, deleteArticle, categories, authors } = useData();
  const isEdit = !!id;

  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    excerpt: '',
    content: '',
    category: 'World',
    tags: [],
    imageUrl: 'https://picsum.photos/seed/new/800/600',
    date: new Date().toISOString().split('T')[0],
    author: authors[0] || { id: 'admin', name: 'Admin', avatar: '' },
    views: 0
  });

  useEffect(() => {
    if (isEdit) {
      const article = articles.find(a => a.id === id);
      if (article) {
        setFormData(article);
      } else {
        navigate('/admin/posts');
      }
    } else {
        // Set default author if creating new
        if (authors.length > 0) {
            setFormData(prev => ({...prev, author: authors[0]}));
        }
    }
  }, [id, articles, navigate, isEdit, authors]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const article: Article = {
      ...formData as Article,
      id: isEdit ? id! : Date.now().toString(),
      tags: Array.isArray(formData.tags) ? formData.tags : (formData.tags as unknown as string).split(',').map(t => t.trim()),
    };

    if (isEdit) {
      updateArticle(article);
    } else {
      addArticle(article);
    }
    navigate('/admin/posts');
  };

  const handleDelete = () => {
      if (confirm('Are you sure you want to delete this post?')) {
          if (id) deleteArticle(id);
          navigate('/admin/posts');
      }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'authorId') {
        const selectedAuthor = authors.find(a => a.id === value);
        if (selectedAuthor) {
            setFormData(prev => ({ ...prev, author: selectedAuthor }));
        }
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
         <div className="flex items-center">
            <button onClick={() => navigate('/admin/posts')} className="mr-4 text-gray-500 hover:text-gray-900 p-2 hover:bg-gray-200 rounded-full transition">
                <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-serif font-bold text-gray-900">{isEdit ? 'Edit Post' : 'New Post'}</h1>
         </div>
         <div className="flex items-center space-x-3">
             {isEdit && (
                 <button 
                    onClick={handleDelete} 
                    className="text-red-500 hover:text-red-700 px-4 py-2 font-bold rounded-lg transition"
                 >
                     <Trash2 size={20} />
                 </button>
             )}
             <button onClick={handleSubmit} className="bg-omega-red text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition flex items-center shadow-sm">
                 <Save size={18} className="mr-2" /> Save Post
             </button>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-omega-red text-lg font-bold" 
                        placeholder="Enter post title"
                        required 
                    />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Content (HTML supported)</label>
                    <textarea 
                        name="content" 
                        value={formData.content} 
                        onChange={handleChange} 
                        rows={15}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-omega-red font-mono text-sm" 
                        placeholder="<p>Write your article content here...</p>"
                        required 
                    />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Excerpt</label>
                    <textarea 
                        name="excerpt" 
                        value={formData.excerpt} 
                        onChange={handleChange} 
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-omega-red" 
                        placeholder="Short summary for cards..."
                        required 
                    />
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Publishing</h3>
                    <div className="mb-4">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Author</label>
                        <select 
                            name="authorId" 
                            value={formData.author?.id} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-omega-red"
                        >
                            {authors.map(a => (
                                <option key={a.id} value={a.id}>{a.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Category</label>
                        <select 
                            name="category" 
                            value={formData.category} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-omega-red"
                        >
                            {categories.map(c => (
                                <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Publish Date</label>
                        <input 
                            type="date" 
                            name="date" 
                            value={typeof formData.date === 'string' ? formData.date.split('T')[0] : ''} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-omega-red"
                        />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Media</h3>
                    <div className="mb-4">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Featured Image URL</label>
                        <input 
                            type="text" 
                            name="imageUrl" 
                            value={formData.imageUrl} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-omega-red text-sm"
                        />
                    </div>
                    {formData.imageUrl && (
                        <div className="mt-2 rounded overflow-hidden aspect-video border border-gray-200">
                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Metadata</h3>
                    <div className="mb-4">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Tags (comma separated)</label>
                        <input 
                            type="text" 
                            name="tags" 
                            value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags} 
                            onChange={(e) => setFormData(prev => ({...prev, tags: e.target.value.split(',').map(s => s.trim())}))} 
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-omega-red text-sm"
                            placeholder="News, Tech, World"
                        />
                    </div>
                </div>
            </div>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;