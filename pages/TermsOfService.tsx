import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
             <div className="text-xs text-gray-500 mb-6 uppercase font-bold tracking-wide">
                <Link to="/" className="hover:text-omega-red">Home</Link>
                <span className="mx-2 text-gray-300">/</span>
                <span className="text-black">Terms of Service</span>
            </div>
            
            <div className="max-w-3xl mx-auto prose prose-lg">
                <h1 className="font-serif font-black text-4xl mb-8">Terms of Service</h1>
                <p>Last updated: October 26, 2023</p>
                
                <p>Please read these terms of service carefully before using OmegaNews website operated by OmegaNews.</p>

                <h3>Conditions of Use</h3>
                <p>By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to leave the website accordingly.</p>
                
                <h3>Intellectual Property</h3>
                <p>You agree that all materials, products, and services provided on this website are the property of OmegaNews, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other intellectual property.</p>

                <h3>User Accounts</h3>
                <p>As a user of this website, you may be asked to register with us and provide private information. You are responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of your identifying information.</p>
            </div>
        </div>
    );
};

export default TermsOfService;