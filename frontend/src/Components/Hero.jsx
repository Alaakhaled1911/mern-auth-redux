import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    setDarkMode(isDarkMode);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setDarkMode(document.body.classList.contains('dark-mode'));
        }
      });
    });

    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05, y: -3 },
    tap: { scale: 0.98 }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  return (
    <div className={`hero-section ${darkMode ? 'dark' : ''}`}>
      <div className="hero-background">
        <div className="hero-shapes">
          <motion.div 
            className="shape shape-1"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="shape shape-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="shape shape-3"
            animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="shape shape-4"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      <motion.div 
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            variants={itemVariants}
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              MERN Authentication
              <motion.span 
                className="title-highlight"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </motion.h1>
            
            <motion.p 
              className="hero-description"
              variants={itemVariants}
            >
              A complete authentication solution built with the MERN stack. Secure JWT storage in HTTP-Only cookies, Redux Toolkit for state management, and a beautiful responsive UI.
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              variants={itemVariants}
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link to="/login" className="hero-button primary">
                  <span>Sign In</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                </Link>
              </motion.div>
              
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link to="/register" className="hero-button secondary">
                  <span>Register</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="hero-features"
              variants={itemVariants}
            >
              <div className="feature-item">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <span>Secure Authentication</span>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <span>HTTP-Only Cookies</span>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 3 21 3 21 8"></polyline>
                    <line x1="4" y1="20" x2="21" y2="3"></line>
                    <polyline points="21 16 21 21 16 21"></polyline>
                    <line x1="15" y1="15" x2="21" y2="21"></line>
                    <line x1="4" y1="4" x2="9" y2="9"></line>
                  </svg>
                </div>
                <span>Redux Toolkit</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hero-image"
            variants={itemVariants}
            animate={floatingAnimation}
          >
            <div className="image-container">
              <div className="image-wrapper">
                <div className="image-element login-card">
                  <div className="card-header">
                    <div className="card-title">Login</div>
                  </div>
                  <div className="card-body">
                    <div className="input-field"></div>
                    <div className="input-field"></div>
                    <div className="button-field"></div>
                  </div>
                </div>
                
                <div className="image-element register-card">
                  <div className="card-header">
                    <div className="card-title">Register</div>
                  </div>
                  <div className="card-body">
                    <div className="input-field"></div>
                    <div className="input-field"></div>
                    <div className="input-field"></div>
                    <div className="button-field"></div>
                  </div>
                </div>
                
                <div className="image-element profile-card">
                  <div className="profile-header">
                    <div className="avatar"></div>
                  </div>
                  <div className="card-body">
                    <div className="info-field"></div>
                    <div className="info-field"></div>
                    <div className="button-field"></div>
                  </div>
                </div>
                
                <div className="connector c1"></div>
                <div className="connector c2"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
