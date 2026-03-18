import React, { useState } from 'react';
import { io } from 'socket.io-client';
import AdminMenu from './AdminMenu'; 
import Tablet from './Tablet'; 
import Chef from './Chef'; 
import Manager from './Manager';

const socket = io('http://localhost:5000');

function App() {
  // Biến lưu thông tin người đang đăng nhập (Lưu vào localStorage để F5 không bị văng ra)
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('restaurant_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Mặc định hiển thị Tablet khách hàng (showLogin = false)
  const [showLogin, setShowLogin] = useState(false); 
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        setCurrentUser(data.user);
        localStorage.setItem('restaurant_user', JSON.stringify(data.user)); 
        setShowLogin(false); // Đăng nhập xong thì tắt form
        setUsername('');
        setPassword('');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Lỗi kết nối đến máy chủ!");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('restaurant_user');
    setShowLogin(false); // Khi đăng xuất, tự động đưa về lại màn hình Khách
  };

  // ========================================================
  // 1. NẾU ĐÃ ĐĂNG NHẬP -> CHỈ HIỂN THỊ MÀN HÌNH CỦA NHÂN VIÊN
  // ========================================================
  if (currentUser) {
    return (
      <div>
        <div style={{ backgroundColor: '#2c3e50', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid #e74c3c' }}>
          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
            👤 Xin chào: <span style={{ color: '#f1c40f' }}>{currentUser.username.toUpperCase()}</span> ({currentUser.role})
          </div>
          <button onClick={handleLogout} style={{ padding: '8px 15px', backgroundColor: '#c0392b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Đăng xuất 🚪
          </button>
        </div>

        {currentUser.role === 'admin' && <AdminMenu socket={socket} />}
        {currentUser.role === 'manager' && <Manager socket={socket} />}
        {currentUser.role === 'chef' && <Chef socket={socket} />}
        
        {!['admin', 'manager', 'chef'].includes(currentUser.role) && (
          <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Tài khoản không có quyền truy cập!</h2>
        )}
      </div>
    );
  }

  // ========================================================
  // 2. NẾU BẤM NÚT ĐĂNG NHẬP -> HIỆN FORM LOGIN CHO NHÂN VIÊN
  // ========================================================
  if (showLogin) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2c3e50', flexDirection: 'column' }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', width: '350px', textAlign: 'center' }}>
          <h2 style={{ color: '#2c3e50', margin: '0 0 20px 0' }}>🔐 ĐĂNG NHẬP HỆ THỐNG</h2>
          
          <input 
            type="text" placeholder="Tên đăng nhập..." required value={username} onChange={e => setUsername(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px' }}
          />
          <input 
            type="password" placeholder="Mật khẩu..." required value={password} onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '25px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px' }}
          />
          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#2980b9', color: 'white', border: 'none', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px' }}>
            ĐĂNG NHẬP
          </button>
          
          <button type="button" onClick={() => setShowLogin(false)} style={{ width: '100%', padding: '10px', backgroundColor: 'transparent', color: '#7f8c8d', border: '1px solid #7f8c8d', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Quay lại màn hình Khách
          </button>
        </form>
      </div>
    );
  }

  // ========================================================
  // 3. MẶC ĐỊNH -> HIỂN THỊ MÀN HÌNH TABLET CHO KHÁCH
  // ========================================================
  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      
      {/* Nút Đăng Nhập Hệ Thống ẩn ở góc cho nhân viên */}
      <button 
        onClick={() => setShowLogin(true)} 
        style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000, padding: '8px 12px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        ⚙️ Đăng nhập hệ thống
      </button>
      
      <Tablet socket={socket} />
    </div>
  );
}

export default App;