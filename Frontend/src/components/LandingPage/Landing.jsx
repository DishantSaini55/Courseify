import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Appbar } from '../Appbar/Appbar';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BookOpen, Users, PlayCircle, Code } from 'lucide-react';

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary">
      <Appbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            
            <motion.div 
              initial="hidden" animate="visible" variants={FADE_UP} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border-white/10 mb-8 text-sm text-slate-300"
            >
              <Sparkles size={16} className="text-highlight" />
              <span>The #1 platform for modern tech skills</span>
            </motion.div>

            <motion.h1 
              initial="hidden" animate="visible" variants={FADE_UP} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-tight max-w-4xl"
            >
              Learn Without <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Limits.</span>
            </motion.h1>

            <motion.p 
              initial="hidden" animate="visible" variants={FADE_UP} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
            >
              Unlock your true potential with Courseify's premium online education. 
              Master new frameworks, design patterns, and engineering skills from top industry experts.
            </motion.p>

            <motion.div 
              initial="hidden" animate="visible" variants={FADE_UP} transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <button 
                onClick={() => navigate('/users/courses')}
                className="px-8 py-4 bg-accent hover:bg-accent/90 text-white font-semibold rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(79,70,229,0.3)]"
              >
                Explore Courses <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => navigate('/admin/courses')}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/10 flex items-center gap-2 transition-all"
              >
                <Code size={20} /> Become an Instructor
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 glass-effect rounded-2xl">
              <h3 className="text-4xl font-bold text-white mb-2">50K+</h3>
              <p className="text-slate-400 font-medium">Active Students</p>
            </div>
            <div className="p-6 glass-effect rounded-2xl">
              <h3 className="text-4xl font-bold text-accent mb-2">200+</h3>
              <p className="text-slate-400 font-medium">Premium Courses</p>
            </div>
            <div className="p-6 glass-effect rounded-2xl">
              <h3 className="text-4xl font-bold text-highlight mb-2">4.9/5</h3>
              <p className="text-slate-400 font-medium">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24" id="aboutUs">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Built for builders.</h2>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                At Courseify, we are redefining modern education. Our platform provides high-quality, practical knowledge that bridges the gap between learning and doing.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: BookOpen, text: 'Comprehensive, project-based curriculum' },
                  { icon: Users, text: 'Community of ambitious developers' },
                  { icon: PlayCircle, text: 'High-definition video courses' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="p-2 rounded-full bg-accent/20 text-accent"><item.icon size={20} /></div>
                    <span className="font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent to-purple-500 rounded-3xl blur-2xl opacity-20" />
              <div className="relative glass-effect rounded-3xl border border-white/10 p-8 aspect-video flex items-center justify-center">
                <PlayCircle size={64} className="text-white/50" />
                <span className="absolute bottom-6 left-6 text-xl font-bold">Courseify Preview</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12" id="footer">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-black text-white mb-4 md:mb-0">Courseify.</div>
          <div className="flex gap-6 text-slate-400 text-sm font-medium">
            <span className="hover:text-white cursor-pointer transition">Courseify@gmail.com</span>
            <span className="hover:text-white cursor-pointer transition">+91 9370837735</span>
            <span className="hover:text-white transition">Designed by Dishant</span>
            <span>&copy; 2026 All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
