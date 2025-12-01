import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const NewsletterSuccess: React.FC = () => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center container mx-auto px-4">
            <div className="text-center max-w-lg bg-gray-50 p-10 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-center mb-6">
                    <CheckCircle size={64} className="text-green-500" />
                </div>
                <h1 className="text-3xl font-serif font-black mb-4">Subscription Confirmed!</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Thank you for subscribing to the OmegaNews newsletter. You will now receive the latest headlines, in-depth analysis, and exclusive updates directly in your inbox.
                </p>
                <div className="space-y-4">
                    <Link to="/" className="inline-block bg-omega-dark text-white px-8 py-3 uppercase font-bold text-xs tracking-wider rounded hover:bg-omega-red transition w-full sm:w-auto">
                        Return to Home
                    </Link>
                    <div className="block">
                        <Link to="/latest-news" className="inline-flex items-center text-gray-500 hover:text-omega-red text-sm font-bold mt-4">
                            Read Latest News <ArrowRight size={14} className="ml-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsletterSuccess;