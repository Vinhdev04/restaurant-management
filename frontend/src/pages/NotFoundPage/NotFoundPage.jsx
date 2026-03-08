import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { suggestions, floatingItems } from '@constants/notFoundContent.js';
const NotFoundPage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate('/');
    }
  }, [countdown, navigate]);

 
  return (
    <div className={styles.notFoundPage}>
      {/* Background Effects */}
      <div className={styles.background}>
        <div className={styles.gradientOrb} style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}></div>
        <div className={styles.gridPattern}></div>
      </div>

      {/* Floating Food Items */}
      <div className={styles.floatingItems}>
        {floatingItems.map((item, index) => (
          <div 
            key={index}
            className={styles.floatingItem}
            style={{ 
              animationDelay: `${item.delay}s`,
              left: `${(index * 12.5) + 5}%`
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      <div className={styles.container}>
        {/* 404 Visual */}
        <div className={styles.errorVisual}>
          <div className={styles.errorNumber}>
            <span className={styles.digit}>4</span>
            <div className={styles.plateWrapper}>
              <div className={styles.plate}>
                <div className={styles.plateInner}>
                  <span className={styles.zeroIcon}>🍽️</span>
                </div>
              </div>
            </div>
            <span className={styles.digit}>4</span>
          </div>
          
          <div className={styles.utensils}>
            <div className={styles.fork}>🍴</div>
            <div className={styles.knife}>🔪</div>
          </div>
        </div>

        {/* Error Message */}
        <div className={styles.errorContent}>
          <h1 className={styles.errorTitle}>
            Oops! Trang không tìm thấy
          </h1>
          <p className={styles.errorDescription}>
            Có vẻ như món bạn đang tìm kiếm đã hết. 
            Hãy thử một trong những lựa chọn dưới đây nhé! 🍜
          </p>

          {/* Countdown Timer */}
          <div className={styles.countdown}>
            <div className={styles.countdownCircle}>
              <svg className={styles.countdownSvg} viewBox="0 0 100 100">
                <circle 
                  className={styles.countdownTrack} 
                  cx="50" 
                  cy="50" 
                  r="45"
                />
                <circle 
                  className={styles.countdownProgress} 
                  cx="50" 
                  cy="50" 
                  r="45"
                  style={{
                    strokeDashoffset: (283 * countdown) / 10
                  }}
                />
              </svg>
              <div className={styles.countdownNumber}>{countdown}</div>
            </div>
            <p className={styles.countdownText}>
              Tự động chuyển về trang chủ sau {countdown} giây
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.suggestions}>
            {suggestions.map((suggestion, index) => (
              <Link
                key={index}
                to={suggestion.path}
                className={styles.suggestionCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.suggestionIcon}>{suggestion.icon}</div>
                <div className={styles.suggestionContent}>
                  <h3 className={styles.suggestionTitle}>{suggestion.title}</h3>
                  <p className={styles.suggestionDescription}>{suggestion.description}</p>
                </div>
                <div className={styles.suggestionArrow}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M5 12H19M19 12L12 5M19 12L12 19" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <Link to="/" className={styles.btnPrimary}>
              <span>Về trang chủ</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            </Link>
            
            <button 
              onClick={() => window.history.back()} 
              className={styles.btnSecondary}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M15 18L9 12L15 6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
              <span>Quay lại</span>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={styles.decorations}>
        <div className={styles.decoration} style={{ top: '10%', left: '5%' }}>🌟</div>
        <div className={styles.decoration} style={{ top: '20%', right: '8%' }}>✨</div>
        <div className={styles.decoration} style={{ bottom: '15%', left: '10%' }}>💫</div>
        <div className={styles.decoration} style={{ bottom: '25%', right: '12%' }}>⭐</div>
      </div>
    </div>
  );
};

export default NotFoundPage;