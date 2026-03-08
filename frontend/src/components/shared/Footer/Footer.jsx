import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Thực đơn', path: '/menu' },
    { name: 'Đặt bàn', path: '/reservation' },
    { name: 'Về chúng tôi', path: '/about' }
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Quản lý đơn hàng', path: '/admin/orders' },
    { name: 'Quản lý bàn', path: '/admin/tables' },
    { name: 'Báo cáo', path: '/admin/reports' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'facebook', url: '#', color: '#1877F2' },
    { name: 'Instagram', icon: 'instagram', url: '#', color: '#E4405F' },
    { name: 'Twitter', icon: 'twitter', url: '#', color: '#1DA1F2' },
    { name: 'YouTube', icon: 'youtube', url: '#', color: '#FF0000' }
  ];

  return (
    <footer className={styles.footer}>
      {/* Main Footer Content */}
      <div className={styles.footerMain}>
        <div className={styles.footerContainer}>
          <div className={styles.footerGrid}>
            {/* Brand Section */}
            <div className={styles.footerBrand}>
              <div className={styles.brandLogo}>
                <div className={styles.brandIcon}>
                  <span className={styles.brandIconInner}>🍴</span>
                </div>
                <div className={styles.brandText}>
                  <h3 className={styles.brandTitle}>Restaurant</h3>
                  <p className={styles.brandSubtitle}>Management System</p>
                </div>
              </div>
              <p className={styles.brandDescription}>
                Hệ thống quản lý nhà hàng chuyên nghiệp, giúp tối ưu hóa 
                quy trình vận hành và nâng cao trải nghiệm khách hàng.
              </p>
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={styles.socialLink}
                    aria-label={social.name}
                    style={{ '--social-color': social.color }}
                  >
                    <i className={`fab fa-${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.footerColumn}>
              <h4 className={styles.columnTitle}>Liên kết nhanh</h4>
              <ul className={styles.linkList}>
                {quickLinks.map((link, index) => (
                  <li key={index} className={styles.linkItem}>
                    <Link to={link.path} className={styles.link}>
                      <span className={styles.linkArrow}>→</span>
                      <span className={styles.linkText}>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Admin Links */}
            <div className={styles.footerColumn}>
              <h4 className={styles.columnTitle}>Quản lý</h4>
              <ul className={styles.linkList}>
                {adminLinks.map((link, index) => (
                  <li key={index} className={styles.linkItem}>
                    <Link to={link.path} className={styles.link}>
                      <span className={styles.linkArrow}>→</span>
                      <span className={styles.linkText}>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className={styles.footerColumn}>
              <h4 className={styles.columnTitle}>Liên hệ</h4>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📍</div>
                  <div className={styles.contactText}>
                    <p className={styles.contactLabel}>Địa chỉ</p>
                    <p className={styles.contactValue}>123 Đường ABC, Quận 1, TP.HCM</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📞</div>
                  <div className={styles.contactText}>
                    <p className={styles.contactLabel}>Điện thoại</p>
                    <p className={styles.contactValue}>
                      <a href="tel:+84123456789" className={styles.contactLink}>
                        +84 123 456 789
                      </a>
                    </p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>✉️</div>
                  <div className={styles.contactText}>
                    <p className={styles.contactLabel}>Email</p>
                    <p className={styles.contactValue}>
                      <a href="mailto:contact@restaurant.com" className={styles.contactLink}>
                        contact@restaurant.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.footerContainer}>
          <div className={styles.footerBottomContent}>
            <p className={styles.copyright}>
              © {currentYear} <strong>Restaurant Management System</strong>. All rights reserved.
            </p>
            <div className={styles.footerBottomLinks}>
              <Link to="/privacy" className={styles.bottomLink}>
                Chính sách bảo mật
              </Link>
              <span className={styles.divider}>|</span>
              <Link to="/terms" className={styles.bottomLink}>
                Điều khoản sử dụng
              </Link>
              <span className={styles.divider}>|</span>
              <Link to="/sitemap" className={styles.bottomLink}>
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={styles.decorativePattern}></div>
    </footer>
  );
};

export default Footer;