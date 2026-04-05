import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Appbar } from '../Appbar/Appbar';
import { useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export const UserCourses = () => {
  const { userId, getToken } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/users/courses')
      .then((response) => response.json())
      .then((courseObject) => {
        setCourses(courseObject.courses);
        setLoading(false);
      });
  }, []);

  const handleBuyCourse = async (courseId) => {
    if (!userId) {
      toast.error('Please Sign In before buying.', { style: { background: '#1E293B', color: '#fff' }});
      navigate('/sign-in');
      return;
    }
    const toastId = toast.loading('Processing your purchase...', { style: { background: '#1E293B', color: '#fff' }});
    try {
      const token = await getToken();
      const response = await axios.post(`http://localhost:3000/users/courses/${courseId}`, null, {
        headers: { Authorization: 'Bearer ' + token },
      });
      toast.success(response.data.message, { id: toastId, style: { background: '#1E293B', color: '#fff' }});
    } catch (error) {
      toast.error('An error occurred.', { id: toastId, style: { background: '#1E293B', color: '#fff' }});
    }
  };

  return (
    <div className="min-h-screen bg-primary pt-24 pb-12">
      <Appbar />
      <Toaster position="bottom-right" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Explore Courses</h1>
          <p className="text-slate-400">Discover hand-crafted courses designed to elevate your skills.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="h-[400px] rounded-2xl glass-effect animate-pulse" />
            ))}
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
                </div>

                <div className="p-6 flex-1 flex flex-col relative z-20">
                  <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">{course.title}</h2>
                  <p className="text-sm text-slate-400 line-clamp-2 mb-6 flex-1">{course.description}</p>
                  
                  <button 
                    onClick={() => handleBuyCourse(course._id)}
                    className="w-full py-3 px-4 bg-white/5 hover:bg-accent text-white font-medium rounded-xl border border-white/10 group-hover:border-transparent transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Enroll Now
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
