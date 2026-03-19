import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './HomePage.module.scss';
import { features, workflows } from '@constants/homeContent.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(null);
  const [stats, setStats] = useState([
    { number: '1000+', label: 'Đơn hàng', icon: '📦' },
    { number: '500+', label: 'Khách hàng', icon: '🏪' },
    { number: '4.9/5', label: 'Đánh giá', icon: '⭐' },
    { number: '24/7', label: 'Hỗ trợ', icon: '💬' }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/stats`);
        if (res.ok) {
          const data = await res.json();
          setStats([
            { number: `${data.totalOrders}+`, label: 'Đơn hàng', icon: '📦' },
            { number: data.customers, label: 'Khách hàng', icon: '🏪' },
            { number: data.rating, label: 'Đánh giá', icon: '⭐' },
            { number: '24/7', label: 'Hỗ trợ', icon: '💬' }
          ]);
        }
      } catch (error) {
        console.error("Lỗi tải thống kê:", error);
      }
    };

    fetchStats();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroPattern}></div>
          <div className={styles.heroGradient}></div>
        </div>
        
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>✨</span>
              <span className={styles.badgeText}>Giải pháp quản lý #1 Việt Nam</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              Hệ thống quản lý
              <span className={styles.highlight}> nhà hàng </span>
              <br />
              thông minh & hiện đại
            </h1>
            
            <p className={styles.heroDescription}>
              Tối ưu hóa quy trình vận hành, từ đặt món đến thanh toán. 
              Nâng cao trải nghiệm khách hàng và tăng doanh thu cho nhà hàng của bạn.
            </p>

            <div className={styles.heroCta}>
              <button onClick={() => navigate('/tablet')} className={styles.btnPrimary}>
                <span>Order tại bàn (Tablet)</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <Link to="/menu" className={styles.btnSecondary}>
                <span>Xem thực đơn</span>
              </Link>
            </div>

            <div className={styles.heroTrust}>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>⭐</span>
                <span className={styles.trustText}>4.9/5 rating</span>
              </div>
              <div className={styles.trustDivider}></div>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>👥</span>
                <span className={styles.trustText}>500+ nhà hàng</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.visualCard} style={{ transform: `translateY(${scrollY * -0.1}px)` }}>
              <div className={styles.cardHeader}>
                <div className={styles.cardDot}></div>
                <div className={styles.cardDot}></div>
                <div className={styles.cardDot}></div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.orderItem}>
                  <span className={styles.orderIcon}>🍜</span>
                  <div className={styles.orderInfo}>
                    <p className={styles.orderName}>Phở bò đặc biệt</p>
                    <p className={styles.orderStatus}>Đang nấu...</p>
                  </div>
                  <span className={styles.orderBadge}>New</span>
                </div>
                <div className={styles.orderItem}>
                  <span className={styles.orderIcon}>🥗</span>
                  <div className={styles.orderInfo}>
                    <p className={styles.orderName}>Salad rau củ</p>
                    <p className={styles.orderStatus}>Hoàn thành</p>
                  </div>
                  <span className={`${styles.orderBadge} ${styles.success}`}>✓</span>
                </div>
              </div>
            </div>

            <div className={styles.floatingElement} style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
              <span className={styles.floatingIcon}>🔔</span>
              <p className={styles.floatingText}>Bàn #5 gọi thêm món</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={styles.statCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className={styles.statIcon}>{stat.icon}</span>
              <h3 className={styles.statNumber}>{stat.number}</h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featuresContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Tính năng</span>
            <h2 className={styles.sectionTitle}>
              Mọi thứ bạn cần để
              <span className={styles.highlight}> quản lý nhà hàng</span>
            </h2>
            <p className={styles.sectionDescription}>
              Giải pháp toàn diện từ A-Z, giúp bạn tập trung vào việc phục vụ khách hàng
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <Link 
                to={feature.path}
                key={index}
                className={`${styles.featureCard} ${activeFeature === index ? styles.active : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  '--feature-color': feature.color,
                  textDecoration: 'none'
                }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
                <div className={styles.featureArrow}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className={styles.workflow}>
        <div className={styles.workflowContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Quy trình</span>
            <h2 className={styles.sectionTitle}>
              Từ đặt món đến
              <span className={styles.highlight}> thanh toán</span>
            </h2>
            <p className={styles.sectionDescription}>
              4 bước đơn giản, tối ưu hóa trải nghiệm cho cả khách hàng và nhân viên
            </p>
          </div>

          <div className={styles.workflowSteps}>
            {workflows.map((workflow, index) => (
              <div key={index} className={styles.workflowStep}>
                <div className={styles.stepNumber}>{workflow.step}</div>
                <div className={styles.stepContent}>
                  <div className={styles.stepIcon}>{workflow.icon}</div>
                  <h3 className={styles.stepTitle}>{workflow.title}</h3>
                  <p className={styles.stepDescription}>{workflow.description}</p>
                </div>
                {index < workflows.length - 1 && (
                  <div className={styles.stepConnector}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Sẵn sàng nâng cấp
              <span className={styles.highlight}> nhà hàng của bạn?</span>
            </h2>
            <p className={styles.ctaDescription}>
              Hàng trăm nhà hàng đã tin tưởng và sử dụng hệ thống của chúng tôi. 
              Bắt đầu ngay hôm nay!
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/login" className={styles.btnLarge}>
                <span>Trải nghiệm ngay</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </Link>
              <Link to="/menu" className={styles.btnOutline}>
                <span>Tìm hiểu thêm</span>
              </Link>
            </div>
          </div>
          
          <div className={styles.ctaVisual}>
            <div className={styles.ctaCircle}></div>
            <div className={styles.ctaGlow}></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;