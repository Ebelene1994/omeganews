import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Page } from '../../types';
import { Save, ArrowLeft, Eye, Trash2, CheckCircle, FileText } from 'lucide-react';

const PageEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pages, addPage, updatePage, deletePage, notify } = useData();
  const isEdit = !!id;

  const [formData, setFormData] = useState<Partial<Page>>({
    title: '',
    slug: '',
    content: '',
    status: 'draft',
    metaTitle: '',
    metaDescription: '',
    heroImage: '',
    lastUpdated: new Date().toISOString()
  });

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const page = pages.find(p => p.id === id);
      if (page) {
        setFormData(page);
      } else {
        navigate('/admin/pages');
      }
    }
  }, [id, pages, navigate, isEdit]);

  // Simple autosave simulation
  useEffect(() => {
    const timer = setTimeout(() => {
        if (isDirty && isEdit && id) {
            // In a real app, you'd save silently here. 
            // For now, we just reset dirty to pretend we saved or handled it.
            // We won't trigger global notify to avoid spam.
            setIsDirty(false); 
        }
    }, 5000);
    return () => clearTimeout(timer);
  }, [formData, isDirty, isEdit, id]);

  const handleSave = (status: 'draft' | 'published') => {
    const page: Page = {
      ...formData as Page,
      id: isEdit ? id! : Date.now().toString(),
      status: status,
      lastUpdated: new Date().toISOString(),
    };

    if (isEdit) {
      updatePage(page);
    } else {
      addPage(page);
      if (!isEdit) {
          navigate(`/admin/pages/edit/${page.id}`);
      }
    }
    setIsDirty(false);
  };

  const handleDelete = () => {
      if (confirm("Are you sure you want to delete this page? This cannot be undone.")) {
          if (id) deletePage(id);
          navigate('/admin/pages');
      }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header / Actions */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
         <div className="flex items-center">
            <button onClick={() => navigate('/admin/pages')} className="mr-4 text-gray-500 hover:text-gray-900 p-2 hover:bg-gray-200 rounded-full transition">
                <ArrowLeft size={20} />
            </button>
            <div>
                <h1 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
                    {isEdit ? 'Edit Page' : 'Create New Page'}
                    {isDirty && <span className="text-xs font-sans font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded">Unsaved Changes</span>}
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                    {isEdit ? `Editing: ${formData.title}` : 'Start creating your new page'}
                </p>
            </div>
         </div>
         <div className="flex items-center space-x-3">
             {isEdit && (
                 <>
                    <button 
                        onClick={handleDelete}
                        className="text-red-500 hover:text-red-700 px-3 py-2 rounded-lg font-bold text-sm transition mr-auto"
                    >
                        <Trash2 size={18} />
                    </button>
                    <Link 
                        to={`/admin/pages/preview/${id}`} 
                        target="_blank"
                        className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 transition flex items-center"
                    >
                        <Eye size={16} className="mr-2" /> Preview
                    </Link>
                 </>
             )}
             <button 
                onClick={() => handleSave('draft')} 
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-300 transition flex items-center"
             >
                 <Save size={16} className="mr-2" /> Save Draft
             </button>
             <button 
                onClick={() => handleSave('published')} 
                className="bg-omega-red text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-700 transition flex items-center shadow-sm"
             >
                 <CheckCircle size={16} className="mr-2" /> Publish
             </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Page Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-omega-red text-lg font-bold" 
                        placeholder="Enter page title"
                        required 
                    />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Content Editor</label>
                    <div className="border border-gray-300 rounded overflow-hidden">
                        <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-2 text-gray-600">
                             <button className="p-1 hover:bg-gray-200 rounded font-bold text-xs">B</button>
                             <button className="p-1 hover:bg-gray-200 rounded italic text-xs">I</button>
                             <button className="p-1 hover:bg-gray-200 rounded underline text-xs">U</button>
                             <div className="w-px bg-gray-300 mx-1"></div>
                             <button className="p-1 hover:bg-gray-200 rounded text-xs">H1</button>
                             <button className="p-1 hover:bg-gray-200 rounded text-xs">H2</button>
                             <div className="w-px bg-gray-300 mx-1"></div>
                             <button className="p-1 hover:bg-gray-200 rounded text-xs">Link</button>
                             <button className="p-1 hover:bg-gray-200 rounded text-xs">Image</button>
                        </div>
                        <textarea 
                            name="content" 
                            value={formData.content} 
                            onChange={handleChange} 
                            rows={20}
                            className="w-full p-4 focus:outline-none font-mono text-sm resize-y" 
                            placeholder="<p>Start writing your content...</p>"
                            required 
                        />
                    </div>
                </div>
            </div>

            {/* Sidebar Settings Column */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2 flex items-center">
                        <FileText size={16} className="mr-2 text-gray-500" /> Page Settings
                    </h3>
                    
                    <div className="mb-4">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">URL Slug</label>
                        <div className="flex items-center">
                            <span className="text-gray-400 bg-gray-50 p-2 border border-r-0 border-gray-300 rounded-l text-xs">/page/</span>
                            <input 
                                type="text" 
                                name="slug" 
                                value={formData.slug} 
                                onChange={handleChange} 
                                className="w-full p-2 border border-gray-300 rounded-r focus:outline-none focus:border-omega-red text-sm" 
                                placeholder="about-us"
                                required 
                            />
                        </div>
                    </div>

                     <div className="mb-4">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Current Status</label>
                        <div className={`text-sm font-bold px-3 py-2 rounded border ${formData.status === 'published' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-yellow-50 border-yellow-200 text-yellow-700'}`}>
                            {formData.status === 'published' ? 'Published' : 'Draft'}
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Hero Image</h3>
                    <div className="mb-4">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Image URL</label>
                        <input 
                            type="text" 
                            name="heroImage" 
                            value={formData.heroImage} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-omega-red text-sm"
                            placeholder="https://..."
                        />
                    </div>
                    {formData.heroImage && (
                        <div className="mt-2 rounded overflow-hidden aspect-video border border-gray-200">
                            <img src={formData.heroImage} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">SEO Metadata</h3>
                    <div className="mb-4">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Meta Title</label>
                        <input 
                            type="text" 
                            name="metaTitle" 
                            value={formData.metaTitle} 
                            onChange={handleChange} 
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-omega-red text-sm"
                            placeholder="SEO Title"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Meta Description</label>
                        <textarea 
                            name="metaDescription" 
                            value={formData.metaDescription} 
                            onChange={handleChange} 
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-omega-red text-sm"
                            placeholder="Brief description for search engines"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PageEditor;