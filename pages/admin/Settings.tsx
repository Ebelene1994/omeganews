import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Save, Plus, X } from 'lucide-react';

const Settings: React.FC = () => {
    const { settings, updateSettings } = useData();
    const [formData, setFormData] = useState(settings);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSettings(formData);
    };

    const handleNavChange = (index: number, field: string, value: any) => {
        const newNav = [...formData.navigation];
        newNav[index] = { ...newNav[index], [field]: value };
        setFormData({ ...formData, navigation: newNav });
    };

    const addNavItem = () => {
        setFormData({
            ...formData,
            navigation: [...formData.navigation, { label: 'New Link', path: '/', isCategory: false }]
        });
    };

    const removeNavItem = (index: number) => {
        const newNav = [...formData.navigation];
        newNav.splice(index, 1);
        setFormData({ ...formData, navigation: newNav });
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-serif font-bold text-gray-900">Settings</h1>
                <button onClick={handleSubmit} className="bg-omega-red text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition flex items-center">
                    <Save size={18} className="mr-2" /> Save Changes
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">General Settings</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Site Title</label>
                            <input 
                                type="text" 
                                value={formData.siteTitle} 
                                onChange={(e) => setFormData({...formData, siteTitle: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-omega-red" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Logo Text</label>
                            <input 
                                type="text" 
                                value={formData.logoText} 
                                onChange={(e) => setFormData({...formData, logoText: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-omega-red" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Footer Text</label>
                            <input 
                                type="text" 
                                value={formData.footerText} 
                                onChange={(e) => setFormData({...formData, footerText: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-omega-red" 
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">Advertisement</h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-gray-800">Enable Ads</h3>
                            <p className="text-gray-500 text-sm">Toggle global visibility of advertisement placeholders.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={formData.showAds}
                                onChange={(e) => setFormData({...formData, showAds: e.target.checked})}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-omega-red"></div>
                        </label>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6 pb-2 border-b">
                        <h2 className="text-xl font-bold text-gray-900">Navigation Links</h2>
                        <button type="button" onClick={addNavItem} className="text-xs font-bold text-omega-red hover:underline flex items-center">
                            <Plus size={14} className="mr-1"/> Add Link
                        </button>
                    </div>
                    <div className="space-y-4">
                        {formData.navigation?.map((nav, idx) => (
                            <div key={idx} className="flex gap-4 items-center">
                                <input 
                                    type="text" 
                                    value={nav.label} 
                                    onChange={(e) => handleNavChange(idx, 'label', e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                                    placeholder="Label"
                                />
                                <input 
                                    type="text" 
                                    value={nav.path} 
                                    onChange={(e) => handleNavChange(idx, 'path', e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                                    placeholder="Path (e.g., /about)"
                                />
                                <button type="button" onClick={() => removeNavItem(idx)} className="text-gray-400 hover:text-red-600">
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Settings;