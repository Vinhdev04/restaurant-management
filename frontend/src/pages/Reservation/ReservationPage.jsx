import React, { useState } from 'react';
import styles from './ReservationPage.module.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/reservation/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Cảm ơn bạn! Yêu cầu đặt bàn của bạn đã được gửi đi. Chúng tôi sẽ sớm liên hệ lại để xác nhận.');
        setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: '' });
      } else {
        alert(data.message || 'Lỗi khi gửi yêu cầu đặt bàn');
      }
    } catch (error) {
      alert('Lỗi kết nối đến máy chủ!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.reservationPage}>
      <div className={styles.container}>
        <div className={styles.reservationCard}>
          <div className={styles.infoSection}>
            <h2>Đặt Bàn Trực Tuyến</h2>
            <p>Trải nghiệm không gian ấm cúng và những món ăn tinh tế. Hãy để chúng tôi phục vụ bạn một cách chu đáo nhất.</p>
            
            <div className={styles.contactInfo}>
              <div className={styles.infoItem}>
                <i>📍</i>
                <span>123 Đường Ẩm Thực, Quận 1, TP.HCM</span>
              </div>
              <div className={styles.infoItem}>
                <i>📞</i>
                <span>+84 123 456 789</span>
              </div>
              <div className={styles.infoItem}>
                <i>✉️</i>
                <span>contact@restaurant.com</span>
              </div>
              <div className={styles.infoItem}>
                <i>🕒</i>
                <span>Mở cửa: 09:00 - 22:00 hàng ngày</span>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <form className={styles.reservationForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Họ và tên</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Nhập họ và tên của bạn" 
                  required 
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="example@gmail.com" 
                    required 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Số điện thoại</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="Nhập số điện thoại" 
                    required 
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="date">Ngày đặt</label>
                  <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="time">Giờ đặt</label>
                  <select 
                    id="time" 
                    name="time" 
                    value={formData.time} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Chọn khung giờ</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="18:00">06:00 PM</option>
                    <option value="19:00">07:00 PM</option>
                    <option value="20:00">08:00 PM</option>
                    <option value="21:00">09:00 PM</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="guests">Số lượng khách</label>
                <select 
                  id="guests" 
                  name="guests" 
                  value={formData.guests} 
                  onChange={handleChange} 
                  required
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} khách</option>
                  ))}
                  <option value="more">Nhiều hơn 10 khách</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="notes">Yêu cầu đặc biệt (Ghi chú)</label>
                <textarea 
                  id="notes" 
                  name="notes" 
                  value={formData.notes} 
                  onChange={handleChange} 
                  placeholder="Ví dụ: Bàn gần cửa sổ, tiệc sinh nhật, dị ứng món ăn..." 
                ></textarea>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? 'Đang gửi...' : 'Xác nhận đặt bàn'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
