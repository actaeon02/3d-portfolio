/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Home from './pages/Home';
import Freelance from './pages/Freelance';
import ProjectDetail from './pages/ProjectDetail';
import { ThemeProvider } from './components/ThemeProvider';
import { ContactProvider } from './context/ContactContext';
import { AnimatePresence, motion } from 'motion/react';

import ImmersiveLoader from './components/ImmersiveLoader';

function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // 1. Capture exact scroll position right BEFORE we reset it or navigate away
    if (prevPathname.current === '/freelance') {
      sessionStorage.setItem('freelanceScroll', window.scrollY.toString());
    }

    const isReturningToFreelance = 
      prevPathname.current.startsWith('/project/') && 
      pathname === '/freelance';

    if (isReturningToFreelance) {
      const savedScroll = sessionStorage.getItem('freelanceScroll');
      if (savedScroll) {
        // Restore scroll position after a slight delay to let Framer Motion render the new DOM
        setTimeout(() => window.scrollTo(0, parseInt(savedScroll, 10)), 50);
      }
    } else {
      window.scrollTo(0, 0);
    }
    
    prevPathname.current = pathname;
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Home />
          </motion.div>
        } />
        <Route id="freelance" path="/freelance" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            <Freelance />
          </motion.div>
        } />
        <Route path="/project/:id" element={
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <ProjectDetail />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

import { LoadingProvider } from './context/LoadingContext';

export default function App() {
  return (
    <ThemeProvider>
      <ContactProvider>
        <LoadingProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ImmersiveLoader />
            <ScrollToTop />
            <AnimatedRoutes />
          </Router>
        </LoadingProvider>
      </ContactProvider>
    </ThemeProvider>
  );
}
