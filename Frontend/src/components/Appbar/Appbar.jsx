import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton, useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

export const Appbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const isCoursesPage = location.pathname === '/users/courses';
  const isPurchasedCoursesPage = location.pathname === '/users/purchasedCourses';
  const isCreateCoursesPage = location.pathname === '/admin/createCourse';
  const isAdminView = location.pathname.startsWith('/admin') || location.pathname.startsWith('/courses/');

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass-effect border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand */}
        <div 
          className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400 cursor-pointer"
          onClick={() => navigate('/')}
        >
          Courseify.
        </div>

        {/* Right Side / Auth Side */}
        <div className="flex items-center gap-6">
          <SignedOut>
             <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
               <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
               <button className="hover:text-white transition-colors">About App</button>
             </nav>
             <div className="flex items-center gap-3">
               <SignInButton mode="modal">
                 <button className="px-5 py-2 text-sm font-medium text-slate-200 hover:text-white transition-all">
                   Sign In
                 </button>
               </SignInButton>
               <SignUpButton mode="modal">
                 <button className="px-5 py-2 text-sm font-semibold text-white bg-accent hover:bg-accent/80 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all transform hover:scale-105">
                   Get Started
                 </button>
               </SignUpButton>
             </div>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-4">
              {!isAdminView ? (
                <>
                  {isCoursesPage && (
                    <button onClick={() => navigate('/users/purchasedCourses')} className="text-sm font-medium text-slate-300 hover:text-white transition">My Library</button>
                  )}
                  {isPurchasedCoursesPage && (
                    <button onClick={() => navigate('/users/courses')} className="text-sm font-medium text-slate-300 hover:text-white transition">Explore</button>
                  )}
                  {!isCoursesPage && !isPurchasedCoursesPage && (
                    <button onClick={() => navigate('/users/courses')} className="text-sm font-medium text-slate-300 hover:text-white transition">Browse Courses</button>
                  )}
                  <button onClick={() => navigate('/admin/courses')} className="px-4 py-2 text-xs font-semibold rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                    Instructor Panel
                  </button>
                </>
              ) : (
                <>
                  {!isCreateCoursesPage ? (
                    <button onClick={() => navigate('/admin/createCourse')} className="px-4 py-2 text-xs font-semibold bg-white/10 rounded-full hover:bg-white/20 transition-colors">Add Course</button>
                  ) : (
                    <button onClick={() => navigate('/admin/courses')} className="px-4 py-2 text-xs font-semibold rounded-full border border-white/10 hover:bg-white/5 transition-colors">All Courses</button>
                  )}
                  <button onClick={() => navigate('/users/courses')} className="px-4 py-2 text-xs font-semibold rounded-full border border-white/10 hover:bg-white/5 transition-colors text-accent">
                    Switch to Student
                  </button>
                </>
              )}
              
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <span className="hidden md:block text-sm font-medium text-slate-400">{user?.primaryEmailAddress?.emailAddress}</span>
                <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "h-9 w-9 ring-2 ring-accent" } }} />
              </div>
            </div>
          </SignedIn>
        </div>

      </div>
    </motion.header>
  );
};
