import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
             <div className="text-xs text-gray-500 mb-6 uppercase font-bold tracking-wide">
                <Link to="/" className="hover:text-omega-red">Home</Link>
                <span className="mx-2 text-gray-300">/</span>
                <span className="text-black">Privacy Policy</span>
            </div>
            
            <div className="max-w-3xl mx-auto prose prose-lg">
                <h1 className="font-serif font-black text-4xl mb-8">Privacy Policy</h1>
                <p>Last updated: October 26, 2023</p>
                
                <p>At OmegaNews, accessible from www.omeganews.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by OmegaNews and how we use it.</p>
                
                <h3>Information We Collect</h3>
                <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
                
                <h3>How We Use Your Information</h3>
                <p>We use the information we collect in various ways, including to:</p>
                <ul>
                    <li>Provide, operate, and maintain our website</li>
                    <li>Improve, personalize, and expand our website</li>
                    <li>Understand and analyze how you use our website</li>
                    <li>Develop new products, services, features, and functionality</li>
                </ul>

                <h3>Log Files</h3>
                <p>OmegaNews follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;