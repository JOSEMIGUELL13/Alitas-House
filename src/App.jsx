import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Menu from './components/menu';
import Salsas from './components/salsas';
import Snacks from './components/snacks';
import Footer from './components/footer';
import LoadingScreen from './components/loadingScreen';
import Particles from './components/particles';
import { ImageProvider } from './components/ImageImports';
import './App.css';

// Enhanced smooth scrolling function
const smoothScrollTo = (target, duration = 1000) => {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;
  
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Easing function - easeInOutQuad
    const ease = progress => {
      return progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    };
    
    window.scrollTo(0, startPosition + distance * ease(progress));
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }
  
  requestAnimationFrame(animation);
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Enhanced loading sequence
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    // Set up smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        smoothScrollTo(this.getAttribute('href'));
      });
    });
    
    return () => clearTimeout(timer);
  }, []);

  // Enhanced section detection
  useEffect(() => {
    const sections = ['home', 'menu', 'salsas', 'snacks'];
    
    const observerOptions = {
      rootMargin: '-20% 0px -80% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);
    
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    
    return () => {
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [loading]);

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    out: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <ImageProvider>
      <div className="relative bg-black min-h-screen">
        {/* Enhanced particles with scroll parallax */}
        <div 
          className="fixed inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <Particles />
        </div>
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LoadingScreen />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
            >
              <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
              
              <motion.main 
                className="relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Hero setActiveSection={setActiveSection} />
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Menu />
                  <Salsas />
                  <Snacks />
                </motion.div>
              </motion.main>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Footer />
              </motion.div>
              
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ImageProvider>
  );
};

export default App;