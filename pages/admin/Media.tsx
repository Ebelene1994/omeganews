import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Trash2, Upload, Copy, Search, X } from 'lucide-react';
import { MediaItem } from '../../types';

const AdminMedia: React.FC = () => {
  const { media, addMedia, deleteMedia, notify } = useData();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMedia = media.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrl) return;

    // Simulate upload
    const newItem: MediaItem = {
        id: Date.now().toString(),
        url: uploadUrl,
        name: `image-${Date.now()}.jpg`,
        type: 'image',
        date: new Date().toISOString()
    };
    
    addMedia(newItem);
    setUploadUrl('');
    setIsUploading(false);
  };

  const handleCopy = (url: string) => {
      navigator.clipboard.writeText(url);
      notify('URL copied to clipboard!');
  };

  const handleDelete = (id: string) => {
      if (confirm('Delete this image?')) {
          deleteMedia(id);
      }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Media Library</h1>
        <button onClick={() => setIsUploading(true)} className="bg-omega-red text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition flex items-center">
          <Upload size={16} className="mr-2" /> Upload Media
        </button>
      </div>

      {/* Upload Modal Overlay */}
      {isUploading && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-8 w-full max-w-md animate-in zoom-in duration-200">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Upload Media</h3>
                      <button onClick={() => setIsUploading(false)}><X size={24} className="text-gray-400 hover:text-black"/></button>
                  </div>
                  <form onSubmit={handleUpload}>
                      <p className="text-sm text-gray-500 mb-4">Enter an image URL (Simulated upload)</p>
                      <input 
                          type="url" 
                          placeholder="https://example.com/image.jpg" 
                          className="w-full border border-gray-300 p-3 rounded mb-4"
                          value={uploadUrl}
                          onChange={(e) => setUploadUrl(e.target.value)}
                          autoFocus
                          required
                      />
                      <button type="submit" className="w-full bg-omega-dark text-white py-3 font-bold rounded hover:bg-omega-red transition">
                          Add to Library
                      </button>
                  </form>
              </div>
          </div>
      )}

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 flex items-center">
        <Search size={20} className="text-gray-400 mr-2" />
        <input 
            type="text" 
            placeholder="Search filenames..." 
            className="flex-1 outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredMedia.map(item => (
              <div key={item.id} className="group relative bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden aspect-square">
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center gap-2 p-4">
                      <button onClick={() => handleCopy(item.url)} className="bg-white text-gray-800 px-3 py-1 rounded text-xs font-bold flex items-center hover:bg-gray-100">
                          <Copy size={12} className="mr-1" /> Copy URL
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold flex items-center hover:bg-red-700">
                          <Trash2 size={12} className="mr-1" /> Delete
                      </button>
                  </div>
              </div>
          ))}
      </div>
      {filteredMedia.length === 0 && <div className="text-center text-gray-500 py-10">No media found.</div>}
    </div>
  );
};

export default AdminMedia;