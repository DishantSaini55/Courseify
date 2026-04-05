import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Appbar } from '../Appbar/Appbar';
import { useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export const UserPurchasedCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getToken, userId } = useAuth();
  
    useEffect(() => {
      const fetchPurchasedCourses = async () => {
        if (!userId) return;
        const token = await getToken();
        try {
            const response = await axios.get('http://localhost:3000/users/purchasedCourses', {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            setCourses(response.data.purchasedCourses);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
      };
      fetchPurchasedCourses();
    }, [getToken, userId]);
    
  return (
    <div className="min-h-screen bg-primary pt-24 pb-12">
        <Appbar />
        <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">My Library</h1>
                <p className="text-slate-400">Pick up where you left off and continue mastering your skills.</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="h-[400px] rounded-2xl glass-effect animate-pulse" />
                    <div className="h-[400px] rounded-2xl glass-effect animate-pulse" />
                </div>
            ) : courses.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-24 glass-effect border border-white/10 rounded-3xl">
                    <div className="w-24 h-24 mb-6 rounded-full bg-slate-800 flex items-center justify-center">
                        <Play size={40} className="text-slate-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">No Courses Yet!</h2>
                    <p className="text-slate-400 text-center max-w-sm">Looks like you haven't started your learning journey. Head over to Explore to find your first course.</p>
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
                            <div className="aspect-[4/3] w-full overflow-hidden relative">
                                <img 
                                    src={course.imageLink || 'https://via.placeholder.com/400x300'} 
                                    alt={course.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" 
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-16 h-16 rounded-full bg-accent/80 backdrop-blur-sm flex items-center justify-center text-white transform scale-90 group-hover:scale-110 transition-all">
                                        <Play fill="currentColor" size={24} />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col gap-2">
                                <h2 className="text-xl font-bold text-white line-clamp-1">{course.title}</h2>
                                <p className="text-sm text-slate-400 line-clamp-2">{course.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}
