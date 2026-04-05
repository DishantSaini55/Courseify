import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Appbar } from '../Appbar/Appbar';
import { useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { PlusCircle, Image as ImageIcon, Tag, FileText, Type } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [published, setPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getToken } = useAuth();
  const navigate = useNavigate();

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!title || !description || !price || !imageLink) {
      toast.error('All fields are required!', { style: { background: '#1E293B', color: '#fff' }});
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Publishing course...', { style: { background: '#1E293B', color: '#fff' }});

    try {
      const token = await getToken();
      const response = await axios.post('http://localhost:3000/admin/courses', {
        title,
        description,
        price: Number(price),
        imageLink,
        published
      }, {
        headers: { Authorization: 'Bearer ' + token }
      });
      
      if (response.data.courseId) {
        toast.success('Course created successfully!', { id: toastId, style: { background: '#1E293B', color: '#fff' }});
        setTimeout(() => navigate('/admin/courses'), 1000);
      } else {
        throw new Error('Failed to create course');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred.', { id: toastId, style: { background: '#1E293B', color: '#fff' }});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary pt-24 pb-12">
      <Appbar />
      <Toaster position="bottom-right" />
      
      <div className="max-w-3xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-3xl p-8 md:p-12 border border-white/10"
        >
          <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
              <PlusCircle size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Publish a Course</h1>
            <p className="text-slate-400">Share your knowledge with thousands of students world-wide.</p>
          </div>

          <form onSubmit={handleCreateCourse} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Type size={16} className="text-accent" /> Course Title
              </label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="e.g. Master Modern React"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <FileText size={16} className="text-accent" /> Description
              </label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                maxLength={300}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                placeholder="What will students learn in this course?"
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
                  placeholder="99.99"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <ImageIcon size={16} className="text-accent" /> Base Image URL
                </label>
                <input 
                  type="url" 
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder="https://images.unsplash.com/..."
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
                Publish immediately after creation
              </label>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-8 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Publish Course'
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
