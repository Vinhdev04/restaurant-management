import React, { useState, useEffect } from 'react';
import styles from './OrderForm.module.scss';
import { menuItems } from '@constants/menuContent';

const OrderForm = ({ item: initialItem, onSubmit }) => {
  const [item, setItem] = useState(initialItem);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formData, setFormData] = useState({
    tableNumber: '',
    note: ''
  });

  // Update item when initialItem changes (for recommendations)
  useEffect(() => {
    setItem(initialItem);
    setQuantity(1);
    setSelectedOptions([]);
  }, [initialItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleOptionToggle = (option) => {
    setSelectedOptions(prev => {
      const isSelected = prev.find(o => o.id === option.id);
      if (isSelected) {
        return prev.filter(o => o.id !== option.id);
      }
      return [...prev, option];
    });
  };

  const handleRecommendationClick = (recId) => {
    const recItem = menuItems.find(i => i.id === recId);
    if (recItem) {
      setItem(recItem);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const optionsTotal = selectedOptions.reduce((acc, opt) => acc + opt.price, 0);
  const totalPrice = (item.price + optionsTotal) * quantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      item,
      quantity,
      selectedOptions,
      ...formData,
      total: totalPrice
    });
  };

  const recommendedItems = item.recommendations 
    ? menuItems.filter(mi => item.recommendations.includes(mi.id))
    : [];

  return (
    <form className={styles.orderForm} onSubmit={handleSubmit}>
      <div className={styles.itemPreview}>
        <img src={item.image} alt={item.name} />
        <div className={styles.itemInfo}>
          <h3>{item.name}</h3>
          <p className={styles.price}>{formatPrice(item.price)}</p>
        </div>
      </div>

      {item.options && item.options.length > 0 && (
        <div className={styles.optionsSection}>
          <span className={styles.optionsTitle}>Tùy chọn thêm:</span>
          <div className={styles.optionsList}>
            {item.options.map(option => (
              <div 
                key={option.id} 
                className={`${styles.optionItem} ${selectedOptions.find(o => o.id === option.id) ? styles.active : ''}`}
                onClick={() => handleOptionToggle(option)}
              >
                <div className={styles.optionName}>
                  <input 
                    type="checkbox" 
                    checked={!!selectedOptions.find(o => o.id === option.id)}
                    readOnly
                  />
                  <span>{option.name}</span>
                </div>
                <span className={styles.optionPrice}>
                  {option.price > 0 ? `+${formatPrice(option.price)}` : 'Miễn phí'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.quantityRow}>
        <label>Số lượng</label>
        <div className={styles.quantityControl}>
          <button type="button" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
          <span>{quantity}</span>
          <button type="button" onClick={() => handleQuantityChange(1)}>+</button>
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="tableNumber">Số bàn</label>
          <select 
            id="tableNumber" 
            name="tableNumber" 
            value={formData.tableNumber} 
            onChange={handleChange} 
            required
          >
            <option value="">Chọn bàn</option>
            {[...Array(20)].map((_, i) => (
              <option key={i + 1} value={i + 1}>Bàn {i + 1}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="note">Ghi chú thêm</label>
        <textarea 
          id="note" 
          name="note" 
          value={formData.note} 
          onChange={handleChange} 
          placeholder="Ví dụ: Ít cay, không hành..."
        ></textarea>
      </div>

      {recommendedItems.length > 0 && (
        <div className={styles.recommendationsSection}>
          <span className={styles.recTitle}><i>💡</i> Gợi ý món dùng kèm:</span>
          <div className={styles.recList}>
            {recommendedItems.map(rec => (
              <div key={rec.id} className={styles.recItem} onClick={() => handleRecommendationClick(rec.id)}>
                <img src={rec.image} alt={rec.name} />
                <span className={styles.recName}>{rec.name}</span>
                <span className={styles.recPrice}>{formatPrice(rec.price)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.totalSection}>
        <span>TỔNG CỘNG:</span>
        <span className={styles.totalPrice}>{formatPrice(totalPrice)}</span>
      </div>

      <button type="submit" className={styles.submitBtn}>
        Xác nhận đặt món
      </button>
    </form>
  );
};

export default OrderForm;

