import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Check, X, Trash2, Filter } from 'lucide-react';

const Comments: React.FC = () => {
    const { comments, updateCommentStatus, deleteComment } = useData();
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

    const filteredComments = comments.filter(c => {
        if (filter === 'all') return true;
        // Handle undefined status as 'pending'
        const status = c.status || 'pending';
        return status === filter;
    });

    const getCount = (status: string) => {
        if (status === 'all') return comments.length;
        return comments.filter(c => (c.status || 'pending') === status).length;
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">Comments</h1>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {(['all', 'pending', 'approved', 'rejected'] as const).map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition border ${
                            filter === status 
                                ? 'bg-omega-dark text-white border-omega-dark' 
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        {status} 
                        <span className={`ml-2 text-xs py-0.5 px-2 rounded-full ${filter === status ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-500'}`}>
                            {getCount(status)}
                        </span>
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {filteredComments.length > 0 ? (
                        filteredComments.map(comment => (
                            <div key={comment.id} className="p-6 flex gap-4 hover:bg-gray-50 transition animate-in fade-in duration-300">
                                <img src={comment.avatar} alt={comment.author} className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <span className="font-bold text-gray-900">{comment.author}</span>
                                            <span className="text-gray-400 text-xs ml-2">{new Date(comment.date).toLocaleString()}</span>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                            comment.status === 'approved' ? 'bg-green-100 text-green-700' : 
                                            comment.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {comment.status || 'Pending'}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{comment.content}</p>
                                    <div className="flex space-x-2">
                                        {comment.status !== 'approved' && (
                                            <button onClick={() => updateCommentStatus(comment.id, 'approved')} className="flex items-center text-xs font-bold text-green-600 hover:bg-green-50 px-3 py-1 rounded border border-green-200 transition">
                                                <Check size={14} className="mr-1" /> Approve
                                            </button>
                                        )}
                                        {comment.status !== 'rejected' && (
                                            <button onClick={() => updateCommentStatus(comment.id, 'rejected')} className="flex items-center text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-1 rounded border border-red-200 transition">
                                                <X size={14} className="mr-1" /> Reject
                                            </button>
                                        )}
                                        <button onClick={() => deleteComment(comment.id)} className="flex items-center text-xs font-bold text-gray-500 hover:bg-gray-100 px-3 py-1 rounded border border-gray-200 ml-auto transition">
                                            <Trash2 size={14} className="mr-1" /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                            <div className="bg-gray-100 p-4 rounded-full mb-4">
                                <Filter size={24} className="text-gray-400" />
                            </div>
                            <p>No {filter !== 'all' ? filter : ''} comments found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comments;