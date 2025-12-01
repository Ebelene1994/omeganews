import React from 'react';
import { Sidebar } from '../components/Layout';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-xs text-gray-500 mb-6 uppercase font-bold tracking-wide">
                <Link to="/" className="hover:text-omega-red">Home</Link>
                <span className="mx-2 text-gray-300">/</span>
                <span className="text-black">About Us</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <div className="mb-8">
                        <img src="https://picsum.photos/seed/office/1200/600" alt="Office" className="w-full h-[400px] object-cover rounded-lg mb-8" />
                        <h1 className="text-4xl md:text-5xl font-serif font-black mb-6">About OmegaNews</h1>
                        <p className="text-xl text-gray-600 leading-relaxed mb-6 font-serif">
                            OmegaNews is a premier digital news publication dedicated to delivering accurate, unbiased, and thought-provoking journalism from around the globe.
                        </p>
                        
                        <div className="prose prose-lg max-w-none text-gray-700">
                            <p>
                                Founded in 2010, our mission has always been to empower our readers with the information they need to make sense of a complex world. We believe in the power of storytelling to bridge divides and foster understanding across cultures and borders.
                            </p>
                            <h3>Our Mission</h3>
                            <p>
                                To provide fearless, independent reporting that holds power to account and gives voice to the voiceless. We are committed to the highest standards of journalistic integrity and transparency.
                            </p>
                            <h3>Our Team</h3>
                            <p>
                                Our newsroom consists of award-winning journalists, editors, and photographers who are passionate about their craft. From breaking news to in-depth investigations, our team works around the clock to bring you the stories that matter.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-8 rounded border border-gray-100">
                        <h3 className="text-2xl font-serif font-bold mb-6 text-center">Meet the Editors</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                             {[1, 2, 3].map(i => (
                                 <div key={i} className="flex flex-col items-center">
                                     <img src={`https://picsum.photos/seed/editor${i}/150/150`} alt="Editor" className="w-24 h-24 rounded-full mb-3 border-4 border-white shadow" />
                                     <h4 className="font-bold">Editor Name</h4>
                                     <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Senior Editor</p>
                                 </div>
                             ))}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-4">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default About;