import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Loader2 } from 'lucide-react';

const ProtectedAdminRoute: React.FC = () => {
    const { isAuthenticated } = useData();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Brief delay to prevent flash of redirect
        const timer = setTimeout(() => {
            setIsChecking(false);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <Loader2 size={40} className="animate-spin text-omega-red mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Verifying access...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedAdminRoute;