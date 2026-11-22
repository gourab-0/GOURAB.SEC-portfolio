import { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { staggerContainer, fadeUp } from './motion/motionVariants';
import SectionReveal from './components/SectionReveal';
import './index.css';
import CyberpunkPreloader from './Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import StatsStrip from './components/StatsStrip';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Domains from './components/Domains';
import Terminal from './components/Terminal';
import ActivityFeed from './components/ActivityFeed';
import Contact from './components/Contact';
import ResumeFloatingBtn from './components/ResumeFloatingBtn';
import ScrollTelemetryHUD from './components/ScrollTelemetryHUD';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

    return (
    <MotionConfig reducedMotion="user">
    <>
      <ResumeFloatingBtn />
      {!preloaderDone && (
        <CyberpunkPreloader onComplete={() => setPreloaderDone(true)} />
      )}

      <div className="relative min-h-screen" style={{ display: preloaderDone ? 'block' : 'none' }}>
        {/* Navigation & Telemetry */}
        <ScrollTelemetryHUD />
        <Navbar />

        {/* Sections */}
        <main className="relative z-10">
          <Hero />
          <StatsStrip />
          <About />
          <div className="section-divider" />
          <Experience />
          <div className="section-divider" />
          <Skills />
          <div className="section-divider" />
          <Projects />
          <div className="section-divider" />
          <Domains />
          <SectionReveal id="system-ops" className="section-padding relative">
            <div className="content-wrap--wide">
              {/* Title */}
              <motion.div
                  className="mb-16 text-center"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
              >
                  <motion.p
                      variants={fadeUp}
                      style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          color: 'var(--color-crimson)',
                          letterSpacing: '0.15em',
                          marginBottom: '0.5rem',
                      }}
                  >
                      {'// SYSTEM OPERATIONS'}
                  </motion.p>
                  <motion.h3
                      variants={fadeUp}
                      style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                          fontWeight: 700,
                      }}
                  >
                      <span style={{ color: '#F8FAFC' }}>Terminal &amp; </span>
                      <span style={{ color: 'var(--color-crimson)', textShadow: '0 0 20px rgba(195, 23, 62, 0.4)' }}>Activity</span>
                  </motion.h3>
              </motion.div>

              <motion.div 
                  style={{ maxWidth: '64rem', margin: '0 auto', width: '100%' }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
              >
                  <Terminal />
                  <ActivityFeed />
              </motion.div>
            </div>
          </SectionReveal>
          <div className="section-divider" />
          <Contact />
        </main>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showTopBtn && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              aria-label="Back to top"
              className="btn-kali btn-kali-crimson"
              style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 100,
                padding: '0.6rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '45px',
                height: '45px'
              }}
            >
              <span className="btn-kali-cmd" style={{ fontSize: '1.2rem', margin: 0, padding: 0 }}>↑</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
    </MotionConfig>
  );
}
