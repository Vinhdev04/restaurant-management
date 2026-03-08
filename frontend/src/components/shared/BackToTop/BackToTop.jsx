import React, { useState, useEffect } from 'react';
import styles from './BackToTop.module.scss';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / windowHeight) * 100;

      setIsVisible(scrolled > 300);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // Initial check

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Calculate circle dash offset for progress ring
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className={`${styles.backToTop} ${isVisible ? styles.visible : ''}`}>
      <button
        onClick={scrollToTop}
        className={styles.scrollButton}
        aria-label="Scroll to top"
        title="Lên đầu trang"
      >
        {/* Progress Ring */}
        <svg className={styles.progressRing} width="56" height="56">
          <circle
            className={styles.progressRingBg}
            cx="28"
            cy="28"
            r={radius}
            strokeWidth="3"
          />
          <circle
            className={styles.progressRingCircle}
            cx="28"
            cy="28"
            r={radius}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        {/* Arrow Icon */}
        <div className={styles.iconWrapper}>
          <svg 
            className={styles.arrowIcon} 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <path 
              d="M12 19V5M12 5L5 12M12 5L19 12" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Hover Ripple Effect */}
        <span className={styles.ripple}></span>
      </button>

      {/* Tooltip */}
      <div className={styles.tooltip}>
        <span className={styles.tooltipText}>Lên đầu trang</span>
        <span className={styles.tooltipArrow}></span>
      </div>
    </div>
  );
};

export default BackToTop;