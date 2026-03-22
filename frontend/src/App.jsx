import React, { useState, useEffect } from 'react';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import routes from '@/routes/index.route';
import AdminMenu from './AdminMenu'; 
import Chef from './Chef'; 
import Manager from './Manager';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://127.0.0.1:5000';

const socket = io(SOCKET_URL);

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const element = useRoutes(routes);

  // Biến lưu thông tin người đang đăng nhập
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('restaurant_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('restaurant_user');
    navigate('/');
  };

  // Nếu người dùng đã đăng nhập và đang ở trang login/register, tự động chuyển hướng
  useEffect(() => {
    if (currentUser && (location.pathname === '/login' || location.pathname === '/register')) {
      if (currentUser.role === 'admin') navigate('/admin');
      else if (currentUser.role === 'manager' || currentUser.role === 'chef') navigate('/staff');
      else navigate('/');
    }
  }, [currentUser, location, navigate]);

  // Mặc định trả về hệ thống Route của dự án
  return (
    <div className="app-container">
      {element}
    </div>
  );
}

export default App;