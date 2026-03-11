import React, { useState } from 'react';
import styles from './OrderForm.module.scss';

const OrderForm = ({ item, onSubmit }) => {
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    tableNumber: '',
    note: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      item,
      quantity,
      ...formData,
      total: item.price * quantity
    });
  };

  return (
    <form className={styles.orderForm} onSubmit={handleSubmit}>
      <div className={styles.itemPreview}>
        <img src={item.image} alt={item.name} />
        <div className={styles.itemInfo}>
          <h3>{item.name}</h3>
          <p className={styles.price}>{formatPrice(item.price)}</p>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Số lượng</label>
        <div className={styles.quantityControl}>
          <button type="button" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
          <span>{quantity}</span>
          <button type="button" onClick={() => handleQuantityChange(1)}>+</button>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tableNumber">Số bàn</label>
        <select 
          id="tableNumber" 
          name="tableNumber" 
          value={formData.tableNumber} 
          onChange={handleChange} 
          required
        >
          <option value="">Chọn bàn của bạn</option>
          {[...Array(20)].map((_, i) => (
            <option key={i + 1} value={i + 1}>Bàn {i + 1}</option>
          ))}
        </select>
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

      <div className={styles.totalSection}>
        <span>TỔNG CỘNG:</span>
        <span className={styles.totalPrice}>{formatPrice(item.price * quantity)}</span>
      </div>

      <button type="submit" className={styles.submitBtn}>
        Xác nhận đặt món
      </button>
    </form>
  );
};

export default OrderForm;
