import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { navigationItems } from '@constants/headerConst';
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('restaurant_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('restaurant_user');
    setCurrentUser(null);
    window.location.href = '/';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

 

  const isTabletPage = window.location.pathname === '/tablet';

  const filteredNavigationItems = navigationItems.filter(item => {
    // Only show "Quản lý" to admin, manager, chef
    if (item.name === 'Quản lý') {
      return currentUser && ['admin', 'manager', 'chef'].includes(currentUser.role);
    }
    return true;
  });

  if (isTabletPage) return null;

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContainer}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <span className={styles.logoIconInner}>🍴</span>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Restaurant</span>
            <span className={styles.logoSubtitle}>Management</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.navDesktop}>
          <ul className={styles.navList}>
            {filteredNavigationItems.map((item, index) => (
              <li 
                key={index} 
                className={`${styles.navItem} ${item.dropdown ? styles.hasDropdown : ''}`}
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
              >
                <Link to={item.path} className={styles.navLink}>
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navText}>{item.name}</span>
                  {item.dropdown && (
                    <span className={styles.navArrow}>▼</span>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className={`${styles.dropdown} ${activeDropdown === item.name ? styles.dropdownActive : ''}`}>
                    <ul className={styles.dropdownList}>
                      {item.dropdown.map((subItem, subIndex) => (
                        <li key={subIndex} className={styles.dropdownItem}>
                          <Link to={subItem.path} className={styles.dropdownLink}>
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className={styles.headerActions}>
          {currentUser ? (
            <div className={styles.userProfile}>
              <div className={styles.userAvatarContainer} onMouseEnter={() => setActiveDropdown('user')} onMouseLeave={() => setActiveDropdown(null)}>
                <img 
                  src={`https://ui-avatars.com/api/?name=${currentUser.username}&background=D4734A&color=fff`} 
                  alt="User Avatar" 
                  className={styles.userAvatar}
                />
                <span className={styles.userName}>{currentUser.username}</span>
                
                {activeDropdown === 'user' && (
                  <div className={`${styles.dropdown} ${styles.dropdownActive}`}>
                    <ul className={styles.dropdownList}>
                      {['admin', 'manager', 'chef'].includes(currentUser.role) && (
                        <li className={styles.dropdownItem}>
                          <Link to={currentUser.role === 'admin' ? '/admin' : '/staff'} className={styles.dropdownLink}>
                            Dashboard Quản Lý
                          </Link>
                        </li>
                      )}
                      <li className={styles.dropdownItem}>
                        <button onClick={handleLogout} className={styles.dropdownLink} style={{ width: '100%', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer' }}>
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.btnLogin}>Đăng nhập</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`${styles.mobileMenuToggle} ${mobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`${styles.mobileNav} ${mobileMenuOpen ? styles.mobileNavOpen : ''}`}>
        <ul className={styles.mobileNavList}>
          {filteredNavigationItems.map((item, index) => (
            <li key={index} className={styles.mobileNavItem}>
              <div className={styles.mobileNavLinkWrapper}>
                <Link 
                  to={item.path} 
                  className={styles.mobileNavLink}
                  onClick={() => !item.dropdown && setMobileMenuOpen(false)}
                >
                  <span className={styles.mobileNavIcon}>{item.icon}</span>
                  <span className={styles.mobileNavText}>{item.name}</span>
                </Link>
                {item.dropdown && (
                  <button
                    className={styles.mobileDropdownToggle}
                    onClick={() => toggleDropdown(item.name)}
                  >
                    <span className={`${styles.mobileArrow} ${activeDropdown === item.name ? styles.mobileArrowOpen : ''}`}>
                      ▼
                    </span>
                  </button>
                )}
              </div>

              {/* Mobile Dropdown */}
              {item.dropdown && (
                <div className={`${styles.mobileDropdown} ${activeDropdown === item.name ? styles.mobileDropdownOpen : ''}`}>
                  <ul className={styles.mobileDropdownList}>
                    {item.dropdown.map((subItem, subIndex) => (
                      <li key={subIndex} className={styles.mobileDropdownItem}>
                        <Link 
                          to={subItem.path} 
                          className={styles.mobileDropdownLink}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className={styles.mobileOverlay}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;