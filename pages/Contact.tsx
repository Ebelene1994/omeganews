import React, { useState } from 'react';
import { Sidebar } from '../components/Layout';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact: React.FC = () => {
    const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('success');
        // Mock API call
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-xs text-gray-500 mb-6 uppercase font-bold tracking-wide">
                <Link to="/" className="hover:text-omega-red">Home</Link>
                <span className="mx-2 text-gray-300">/</span>
                <span className="text-black">Contact Us</span>
            </div>

            <div className="mb-10 text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-black mb-4">Get in Touch</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Have a story tip, a question, or just want to say hello? We'd love to hear from you.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8">
                    {formStatus === 'success' ? (
                        <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-lg text-center">
                            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                            <p>Thank you for reaching out. We will get back to you as soon as possible.</p>
                            <button onClick={() => setFormStatus('idle')} className="mt-4 text-sm font-bold underline">Send another message</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Name</label>
                                    <input type="text" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-omega-red bg-gray-50 focus:bg-white transition" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Email</label>
                                    <input type="email" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-omega-red bg-gray-50 focus:bg-white transition" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Subject</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-omega-red bg-gray-50 focus:bg-white transition" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Message</label>
                                <textarea rows={6} className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-omega-red bg-gray-50 focus:bg-white transition" required></textarea>
                            </div>
                            <button type="submit" className="bg-omega-dark text-white px-8 py-4 font-bold uppercase tracking-wider rounded hover:bg-omega-red transition flex items-center">
                                Send Message <Send size={16} className="ml-2" />
                            </button>
                        </form>
                    )}
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-gray-50 p-6 rounded border border-gray-200">
                        <h3 className="font-serif font-bold text-xl mb-6">Contact Info</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start text-gray-600">
                                <MapPin size={20} className="mr-3 text-omega-red mt-1 flex-shrink-0" />
                                <span>123 News Avenue, Suite 400<br/>New York, NY 10001<br/>USA</span>
                            </li>
                            <li className="flex items-center text-gray-600">
                                <Phone size={20} className="mr-3 text-omega-red flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center text-gray-600">
                                <Mail size={20} className="mr-3 text-omega-red flex-shrink-0" />
                                <span>contact@omeganews.com</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-omega-dark text-white p-6 rounded">
                         <h3 className="font-serif font-bold text-xl mb-4">Work With Us</h3>
                         <p className="text-gray-400 text-sm mb-4">We are always looking for talented writers and photographers.</p>
                         <Link to="/contact" className="text-omega-red font-bold uppercase text-xs hover:text-white transition">See Openings &rarr;</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;