import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Author } from '../../types';
import { Save, ArrowLeft } from 'lucide-react';

const AuthorEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authors, addAuthor, updateAuthor } = useData();
  const isEdit = !!id;

  const [formData, setFormData] = useState<Partial<Author>>({
    name: '',
    avatar: 'https://picsum.photos/200',
    bio: '',
    role: 'Contributor',
    email: '',
    social: { twitter: '', facebook: '' }
  });

  useEffect(() => {
    if (isEdit) {
      const author = authors.find(a => a.id === id);
      if (author) {
        setFormData(author);
      } else {
        navigate('/admin/authors');
      }
    }
  }, [id, authors, navigate, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const author: Author = {
      ...formData as Author,
      id: isEdit ? id! : Date.now().toString(),
    };

    if (isEdit) {
      updateAuthor(author);
    } else {
      addAuthor(author);
    }
    navigate('/admin/authors');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
        const socialKey = name.split('.')[1];
        setFormData(prev => ({
            ...prev,
            social: { ...prev.social, [socialKey]: value }
        }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
         <div className="flex items-center">
            <button onClick={() => navigate('/admin/authors')} className="mr-4 text-gray-500 hover:text-gray-900">
                <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-serif font-bold text-gray-900">{isEdit ? 'Edit Author' : 'New Author'}</h1>
         </div>
         <button onClick={handleSubmit} className="bg-omega-red text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition flex items-center">
             <Save size={18} className="mr-2" /> Save Author
         </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-omega-red" 
                        required 
                    />
                </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Role / Title</label>
                    <input 
                        type="text" 
                        name="role" 
                        value={formData.role} 
                        onChange={handleChange} 
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-omega-red" 
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Avatar URL</label>
                <input 
                    type="text" 
                    name="avatar" 
                    value={formData.avatar} 
                    onChange={handleChange} 
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-omega-red mb-2" 
                    required 
                />
                <div className="flex items-center gap-4 mt-2">
                    <img src={formData.avatar} alt="Preview" className="w-16 h-16 rounded-full border border-gray-200" />
                    <span className="text-xs text-gray-500">Avatar Preview</span>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Bio</label>
                <textarea 
                    name="bio" 
                    value={formData.bio} 
                    onChange={handleChange} 
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-omega-red" 
                />
            </div>
            
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Twitter (X)</label>
                    <input 
                        type="text" 
                        name="social.twitter" 
                        value={formData.social?.twitter} 
                        onChange={handleChange} 
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-omega-red" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Facebook</label>
                    <input 
                        type="text" 
                        name="social.facebook" 
                        value={formData.social?.facebook} 
                        onChange={handleChange} 
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-omega-red" 
                    />
                </div>
            </div>
        </div>
      </form>
    </div>
  );
};

export default AuthorEditor;