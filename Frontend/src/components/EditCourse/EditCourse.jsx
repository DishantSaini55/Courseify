import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Appbar } from '../Appbar/Appbar';
import { useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Type, FileText, Tag, Image as ImageIcon, CheckCircle, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export const EditCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`http://localhost:3000/admin/courses/${courseId}`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        setCourse(response.data.course);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load course details', { style: { background: '#1E293B', color: '#fff' }});
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId, getToken]);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary pt-24 flex items-center justify-center">
        <Appbar />
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-primary pt-24 pb-12 flex flex-col items-center justify-center">
        <Appbar />
        <h2 className="text-2xl font-bold text-white mb-4">Course not found</h2>
        <button onClick={() => navigate('/admin/courses')} className="text-accent hover:text-white transition">
           Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary pt-24 pb-12">
      <Appbar />
      <Toaster position="bottom-right" />
      
      <div className="max-w-6xl mx-auto px-6">
        <button 
          onClick={() => navigate('/admin/courses')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 order-2 lg:order-1">
             <CoursePreview course={course} />
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
             <EditForm course={course} setCourse={setCourse} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CoursePreview = ({ course }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-effect rounded-3xl border border-white/10 overflow-hidden sticky top-32"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900 relative">
        {course.imageLink ? (
          <img 
            src={course.imageLink} 
            alt={course.title}
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600">
            No Image Provided
          </div>
        )}
        <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
          <span className="text-white font-bold tracking-wide">${course.price || 0}</span>
        </div>
      </div>
      <div className="p-8">
        <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Live Preview</div>
        <h2 className="text-2xl font-bold text-white mb-2 line-clamp-2">{course.title || 'Untitled Course'}</h2>
        <p className="text-sm text-slate-400 line-clamp-4">{course.description || 'No description provided.'}</p>
      </div>
    </motion.div>
  );
};

const EditForm = ({ course, setCourse }) => {
  const [title, setTitle] = useState(course.title || '');
  const [description, setDescription] = useState(course.description || '');
  const [price, setPrice] = useState(course.price || '');
  const [imageLink, setImageLink] = useState(course.imageLink || '');
  const [published, setPublished] = useState(course.published || false);
  const [isSaving, setIsSaving] = useState(false);
  const { getToken } = useAuth();
  
  // Realtime updates to parent preview
  useEffect(() => {
    setCourse((prev) => ({ ...prev, title, description, price, imageLink, published }));
  }, [title, description, price, imageLink, published, setCourse]);

  const handleEditCourse = async (e) => {
    e.preventDefault();
    if (!title || !description || !price || !imageLink) {
      toast.error('All fields are required!', { style: { background: '#1E293B', color: '#fff' }});
      return;
    }

    setIsSaving(true);
    const toastId = toast.loading('Saving changes...', { style: { background: '#1E293B', color: '#fff' }});

    try {
      const token = await getToken();
      await axios.put(`http://localhost:3000/admin/courses/${course._id}`, {
        title,
        description,
        price: Number(price),
        imageLink,
        published
      }, {
        headers: { Authorization: 'Bearer ' + token }
      });
      
      toast.success('Course updated successfully!', { id: toastId, style: { background: '#1E293B', color: '#fff' }});
    } catch (error) {
      console.error(error);
      toast.error('Failed to update course', { id: toastId, style: { background: '#1E293B', color: '#fff' }});
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-3xl p-8 md:p-10 border border-white/10"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Edit Course</h1>
        <p className="text-slate-400">Update your course details and hit save.</p>
      </div>

      <form onSubmit={handleEditCourse} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Type size={16} className="text-accent" /> Course Title
          </label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <FileText size={16} className="text-accent" /> Description
          </label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            maxLength={300}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
          />
          <div className="text-right text-xs text-slate-500">{description.length}/300</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Tag size={16} className="text-accent" /> Price (USD)
            </label>
            <input 
              type="number" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <ImageIcon size={16} className="text-accent" /> Image URL
            </label>
            <input 
              type="url" 
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            />
          </div>
        </div>
        
        <div className="pt-4 flex items-center gap-3">
          <input 
            type="checkbox" 
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-5 h-5 rounded border-white/10 bg-white/5 text-accent focus:ring-accent focus:ring-offset-primary"
          />
          <label htmlFor="published" className="text-sm font-medium text-slate-300 cursor-pointer">
            Publish this course
          </label>
        </div>

        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isSaving}
          className="w-full py-4 mt-8 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <><CheckCircle size={20} /> Save Changes</>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};
