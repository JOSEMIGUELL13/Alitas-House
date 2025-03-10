import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFire, FaHamburger, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ activeSection, setActiveSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cambiar el estilo del navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 1000;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navLinks = [
    { id: 'home', label: 'Inicio', icon: <FaFire /> },
    { id: 'menu', label: 'Menú', icon: <FaHamburger /> },
    { id: 'salsas', label: 'Salsas', icon: null },
    { id: 'snacks', label: 'Snacks', icon: null },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  // Determinar si mostrar la línea indicadora (solo cuando no estamos en home)
  const shouldShowIndicator = activeSection !== 'home';

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          onClick={() => scrollToSection('home')}
          style={{ cursor: 'pointer' }}
        >
          <div className="mr-2 text-orange-500">
            <FaFire size={24} />
          </div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
            Alitas House
          </h1>
        </motion.div>

        {/* Navegación para escritorio */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              className={`relative flex items-center space-x-1 text-white hover:text-orange-400 transition-colors ${
                activeSection === link.id ? 'text-orange-500 font-medium' : ''
              }`}
              onClick={() => scrollToSection(link.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon && <span>{link.icon}</span>}
              <span>{link.label}</span>
              
              {/* Línea indicadora - solo se muestra si no estamos en home */}
              {shouldShowIndicator && activeSection === link.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                  layoutId="navbar-underline"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Botón para menú móvil */}
        <motion.button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </motion.button>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-sm"
          >
            <div className="container mx-auto px-4 py-4">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  className={`block w-full text-left py-3 px-4 text-white hover:bg-orange-900/30 hover:text-orange-400 rounded-md ${
                    activeSection === link.id ? 'bg-orange-900/20 text-orange-500' : ''
                  }`}
                  onClick={() => scrollToSection(link.id)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    {link.icon && <span className="mr-2">{link.icon}</span>}
                    <span>{link.label}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;