import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Appbar } from '../Appbar/Appbar';
import { useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Edit, BookOpen } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export const AdminCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { getToken } = useAuth();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = await getToken();
                const response = await axios.get('http://localhost:3000/admin/courses', {
                    headers: { Authorization: 'Bearer ' + token },
                });
                setCourses(response.data.courses || []);
            } catch (error) {
                console.error('Failed to fetch courses', error);
                toast.error('Failed to load courses', { style: { background: '#1E293B', color: '#fff' }});
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [getToken]);

    return (
        <div className="min-h-screen bg-primary pt-24 pb-12">
            <Appbar />
            <Toaster position="bottom-right" />
            
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-4">Instructor Panel</h1>
                        <p className="text-slate-400">Manage and edit your published courses.</p>
                    </div>
                    <button 
                        onClick={() => navigate('/admin/createCourse')}
                        className="px-6 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2"
                    >
                        <BookOpen size={18} /> Add New Course
                    </button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(n => (
                            <div key={n} className="h-[400px] rounded-2xl glass-effect animate-pulse" />
                        ))}
                    </div>
                ) : courses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-24 glass-effect border border-white/10 rounded-3xl text-center">
                        <BookOpen size={48} className="text-slate-500 mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">No Courses Published</h2>
                        <p className="text-slate-400 mb-6 max-w-sm">You haven't created any courses yet. Start sharing your knowledge today!</p>
                        <button 
                            onClick={() => navigate('/admin/createCourse')}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium rounded-xl transition-all"
                        >
                            Create Your First Course
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course, index) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                key={course._id} 
                                className="group relative glass-effect rounded-2xl border border-white/10 overflow-hidden flex flex-col hover:border-accent/50 transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-10 pointer-events-none" />
                                
                                <div className="aspect-[4/3] w-full overflow-hidden relative">
                                    <img 
                                        src={course.imageLink || 'https://via.placeholder.com/400x300'} 
                                        alt={course.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                                    />
                                    <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                                        <span className="text-white font-bold tracking-wide">\</span>
                                    </div>
                                    {!course.published && (
                                        <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-highlight/80 backdrop-blur-md rounded-full border border-highlight/20 text-white text-xs font-bold uppercase tracking-wider">
                                            Draft
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 flex-1 flex flex-col relative z-20">
                                    <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">{course.title}</h2>
                                    <p className="text-sm text-slate-400 line-clamp-2 mb-6 flex-1">{course.description}</p>
                                    
                                    <button 
                                        onClick={() => navigate(/courses/ + course._id)}
                                        className="w-full py-3 px-4 bg-white/5 hover:bg-accent text-white font-medium rounded-xl border border-white/10 group-hover:border-transparent transition-all flex items-center justify-center gap-2"
                                    >
                                        <Edit size={18} />
                                        Edit Course
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
