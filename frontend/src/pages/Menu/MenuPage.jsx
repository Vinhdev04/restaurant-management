import React, { useState, useEffect } from 'react';
import styles from './MenuPage.module.scss';
import { menuCategories, menuItems } from '@constants/menuContent';
import { useParams, useNavigate } from 'react-router-dom';

const MenuPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  // Map internal IDs to URL params for filter buttons
  const reverseCategoryMap = {
    'starters': 'appetizers',
    'main-courses': 'main-dishes',
    'drinks': 'beverages',
    'desserts': 'desserts',
    'all': ''
  };

  const handleFilterClick = (catId) => {
    const urlParam = reverseCategoryMap[catId];
    if (urlParam) {
      navigate(`/menu/${urlParam}`);
    } else {
      navigate('/menu');
    }
  };

  // Map URL params to internal category IDs
  const categoryMap = {
    'appetizers': 'starters',
    'main-dishes': 'main-courses',
    'beverages': 'drinks',
    'desserts': 'desserts'
  };

  useEffect(() => {
    if (category && categoryMap[category]) {
      setActiveCategory(categoryMap[category]);
    } else {
      setActiveCategory('all');
    }
  }, [category]);

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.categoryId === activeCategory);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className={styles.menuPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Thực Đơn Của Chúng Tôi</h1>
          <p>Khám phá những món ăn tinh túy, được chế biến từ những nguyên liệu tươi ngon nhất bởi các đầu bếp hàng đầu.</p>
        </header>

        <section className={styles.filterSection}>
          {menuCategories.map(category => (
            <button
              key={category.id}
              className={`${styles.filterBtn} ${activeCategory === category.id ? styles.active : ''}`}
              onClick={() => handleFilterClick(category.id)}
            >
              {category.name}
            </button>
          ))}
        </section>

        <div className={styles.menuGrid}>
          {filteredItems.map(item => (
            <div key={item.id} className={styles.menuItem}>
              <div className={styles.itemImage}>
                <img src={item.image} alt={item.name} loading="lazy" />
                <span className={styles.priceTag}>{formatPrice(item.price)}</span>
              </div>
              <div className={styles.itemContent}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <button className={styles.orderBtn}>Đặt món ngay</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
