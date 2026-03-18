import React, { useState } from 'react';
import AdminMenu from './AdminMenu'; 
import Chef from './Chef'; 
import Manager from './Manager';

function StaffLayout({ socket }) {
  // Thay vì để ở App, ta mang thanh điều hướng nội bộ vào đây
  const [currentTab, setCurrentTab] = useState('manager'); 

  return (
    <div>
      {/* THANH ĐIỀU HƯỚNG DÀNH RIÊNG CHO NHÂN VIÊN */}
      <div style={{ backgroundColor: '#2c3e50', padding: '15px', textAlign: 'center' }}>
        <h3 style={{ color: 'white', display: 'inline-block', marginRight: '20px' }}>🔐 KHU VỰC NỘI BỘ</h3>
        <button 
          onClick={() => setCurrentTab('manager')} 
          style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: currentTab === 'manager' ? '#16a085' : '#7f8c8d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          💼 Thu ngân / Quản lý
        </button>
        <button 
          onClick={() => setCurrentTab('chef')} 
          style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: currentTab === 'chef' ? '#e74c3c' : '#7f8c8d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          👨‍🍳 Màn hình Bếp
        </button>
        <button 
          onClick={() => setCurrentTab('admin')} 
          style={{ margin: '0 10px', padding: '10px 20px', backgroundColor: currentTab === 'admin' ? '#e67e22' : '#7f8c8d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          ⚙️ Admin
        </button>
      </div>

      {/* HIỂN THỊ CÁC MÀN HÌNH NHÂN VIÊN */}
      {currentTab === 'manager' && <Manager socket={socket} />}
      {currentTab === 'chef' && <Chef socket={socket} />}
      {currentTab === 'admin' && <AdminMenu />}
    </div>
  );
}

export default StaffLayout;