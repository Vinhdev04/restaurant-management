const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/auth.route');
const User = require('../models/User.model');
const mongoose = require('mongoose');

// Tạo ứng dụng test
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

// Kết nối đến database test
beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant_test');
    console.log('✅ Kết nối database test thành công');
  } catch (error) {
    console.error('❌ Lỗi kết nối database test:', error);
  }
});

// Xóa dữ liệu sau khi test
afterAll(async () => {
  await User.deleteMany({});
  await mongoose.disconnect();
});

describe('Authentication API', () => {
  describe('POST /api/auth/login', () => {
    test('Đăng nhập thành công với thông tin hợp lệ', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: '123',
          role: 'admin'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Đăng nhập thành công!');
      expect(response.body.user).toHaveProperty('username', 'admin');
      expect(response.body.user).toHaveProperty('role', 'admin');
    });

    test('Đăng nhập thất bại khi sai mật khẩu', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: 'wrongpassword',
          role: 'admin'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Sai tên đăng nhập hoặc mật khẩu!');
    });

    test('Đăng nhập thất bại khi sai username', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'nonexistent',
          password: '123',
          role: 'admin'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Sai tên đăng nhập hoặc mật khẩu!');
    });

    test('Đăng nhập thất bại khi vai trò không khớp', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: '123',
          role: 'chef'
        });

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('message', 'Vai trò không khớp với tài khoản này!');
    });

    test('Đăng nhập với role manager', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'quanly',
          password: '123',
          role: 'manager'
        });

      expect(response.status).toBe(200);
      expect(response.body.user).toHaveProperty('role', 'manager');
    });

    test('Đăng nhập với role chef', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'daubep',
          password: '123',
          role: 'chef'
        });

      expect(response.status).toBe(200);
      expect(response.body.user).toHaveProperty('role', 'chef');
    });

    test('Đăng nhập không có body', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({});

      expect(response.status).toBe(401);
    });
  });
});
