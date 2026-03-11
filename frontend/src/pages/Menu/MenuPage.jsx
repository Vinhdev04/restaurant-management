import React, { useState, useEffect, useRef } from 'react';
import styles from './MenuPage.module.scss';
import { menuCategories, menuItems } from '@constants/menuContent';
import { useParams, useNavigate } from 'react-router-dom';
import SkeletonItem from './SkeletonItem';
import Modal from '@components/shared/Modal/Modal';
import OrderForm from './OrderForm/OrderForm';

const MenuPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [displayItems, setDisplayItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loaderRef = useRef(null);
  const itemsPerPage = 6;

  const handleOpenOrderModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleOrderSubmit = (orderData) => {
    console.log('Order Submitted:', orderData);
    alert(`Đặt món thành công!\n${orderData.quantity}x ${orderData.item.name}\nBàn số: ${orderData.tableNumber}\nTổng cộng: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderData.total)}`);
    handleCloseModal();
  };

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
    setPage(1);
  };

  // Map URL params to internal category IDs
  const categoryMap = {
    'appetizers': 'starters',
    'main-dishes': 'main-courses',
    'beverages': 'drinks',
    'desserts': 'desserts'
  };

  useEffect(() => {
    setLoading(true);
    if (category && categoryMap[category]) {
      setActiveCategory(categoryMap[category]);
    } else {
      setActiveCategory('all');
    }
    setPage(1);
    
    // Simulate initial fetch
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [category]);

  const allFilteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.categoryId === activeCategory);

  useEffect(() => {
    const newItems = allFilteredItems.slice(0, page * itemsPerPage);
    setDisplayItems(newItems);
    setHasMore(newItems.length < allFilteredItems.length);
  }, [page, activeCategory]);

  // Infinite Scroll Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const totalPages = Math.ceil(allFilteredItems.length / itemsPerPage);

  return (
    <div className={styles.menuPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Thực Đơn Của Chúng Tôi</h1>
          <p>Khám phá những món ăn tinh túy, được chế biến từ những nguyên liệu tươi ngon nhất bởi các đầu bếp hàng đầu.</p>
        </header>

        <section className={styles.filterSection}>
          {menuCategories.map(cat => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.active : ''}`}
              onClick={() => handleFilterClick(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </section>

        <div className={styles.menuGrid}>
          {loading ? (
            // Show skeletons while initial loading
            [...Array(6)].map((_, index) => <SkeletonItem key={index} />)
          ) : (
            displayItems.map(item => (
              <div key={item.id} className={styles.menuItem}>
                <div className={styles.itemImage}>
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <span className={styles.priceTag}>{formatPrice(item.price)}</span>
                </div>
                <div className={styles.itemContent}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <button 
                    className={styles.orderBtn}
                    onClick={() => handleOpenOrderModal(item)}
                  >
                    Đặt món ngay
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal for Ordering */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          title="Đặt Món Trực Tiếp"
        >
          {selectedItem && (
            <OrderForm 
              item={selectedItem} 
              onSubmit={handleOrderSubmit} 
            />
          )}
        </Modal>

        {/* Pagination Controls */}
        {!loading && allFilteredItems.length > itemsPerPage && (
          <div className={styles.pagination}>
            <button 
              className={styles.pageBtn} 
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
            >
              &laquo;
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i + 1} 
                className={`${styles.pageBtn} ${page === i + 1 ? styles.active : ''}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button 
              className={styles.pageBtn} 
              disabled={page === totalPages}
              onClick={() => setPage(prev => prev + 1)}
            >
              &raquo;
            </button>
          </div>
        )}

        {/* Infinite Scroll Loader */}
        {hasMore && !loading && (
          <div ref={loaderRef} className={styles.loader}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;

