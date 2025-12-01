import React from 'react';

export const CardSkeleton: React.FC = () => {
    return (
        <div className="animate-pulse flex flex-col h-full">
            <div className="bg-gray-200 aspect-video w-full mb-4 rounded-sm"></div>
            <div className="h-6 bg-gray-200 w-3/4 mb-2 rounded-sm"></div>
            <div className="h-4 bg-gray-200 w-1/2 mb-4 rounded-sm"></div>
            <div className="h-20 bg-gray-200 w-full rounded-sm flex-grow"></div>
        </div>
    );
};

export const HorizontalCardSkeleton: React.FC = () => {
    return (
        <div className="animate-pulse flex gap-5 items-start mb-8">
             <div className="bg-gray-200 w-1/3 md:w-[240px] aspect-video flex-shrink-0 rounded-sm"></div>
             <div className="flex-1">
                 <div className="h-6 bg-gray-200 w-3/4 mb-3 rounded-sm"></div>
                 <div className="h-4 bg-gray-200 w-1/4 mb-4 rounded-sm"></div>
                 <div className="h-16 bg-gray-200 w-full rounded-sm"></div>
             </div>
        </div>
    );
};