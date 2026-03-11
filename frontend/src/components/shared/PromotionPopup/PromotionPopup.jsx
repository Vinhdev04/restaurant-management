import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PromotionPopup.module.scss';

const PromotionPopup = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(100); // 100%
  const POPUP_DURATION = 10000; // 10 seconds

  useEffect(() => {
    // Show popup after a small delay on first visit
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Logic for progress bar and auto close
      const interval = 100; // update every 100ms
      const step = (interval / POPUP_DURATION) * 100;
      
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            setIsVisible(false);
            return 0;
          }
          return prev - step;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleActionClick = () => {
    navigate('/reservation');
    handleClose();
  };

  if (!isVisible) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className={styles.popupOverlay} onClick={handleOverlayClick}>
      <div className={styles.popupContent}>
        <button className={styles.closeBtn} onClick={handleClose}>&times;</button>
        
        <div className={styles.imageWrapper}>
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800" 
            alt="Khuyến mãi đặc biệt" 
          />
          <div className={styles.discountBadge}>GIẢM 30%</div>
        </div>

        <div className={styles.textSection}>
          <h2>Ưu Đãi Đặc Biệt Hôm Nay!</h2>
          <p>Thưởng thức hương vị ẩm thực tinh túy với ưu đãi giảm giá lên đến 30% cho thực đơn món chính. Chỉ áp dụng cho khách hàng đặt bàn trực tuyến.</p>
          <button className={styles.actionBtn} onClick={handleActionClick}>Nhận Ưu Đãi Ngay</button>
        </div>

        <div 
          className={styles.timerBar} 
          style={{ transform: `scaleX(${timeLeft / 100})` }}
        ></div>
      </div>
    </div>
  );
};

export default PromotionPopup;
