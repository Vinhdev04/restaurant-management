const request = require('supertest');
const express = require('express');
const adminRoutes = require('../routes/admin.route');
const Menu = require('../models/Menu.model');
const User = require('../models/User.model');
const Table = require('../models/Table.model');
const Order = require('../models/Order.model');
const mongoose = require('mongoose');

// Tạo ứng dụng test
const app = express();
app.use(express.json());
app.use('/api/admin', adminRoutes);

// Kết nối đến database test
beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant_test');
    console.log('✅ Kết nối database test thành công');
  } catch (error) {
    console.error('❌ Lỗi kết nối database test:', error);
  }
});

// Xóa dữ liệu sau mỗi test
beforeEach(async () => {
  await Menu.deleteMany({});
  await User.deleteMany({});
  await Table.deleteMany({});
  await Order.deleteMany({});
});

// Xóa dữ liệu sau khi test
afterAll(async () => {
  await Menu.deleteMany({});
  await User.deleteMany({});
  await Table.deleteMany({});
  await Order.deleteMany({});
  await mongoose.disconnect();
});

describe('Admin API', () => {
  describe('Menu Management', () => {
    describe('POST /api/admin/menu/add', () => {
      test('Thêm menu item thành công', async () => {
        const response = await request(app)
          .post('/api/admin/menu/add')
          .send({
            name: 'Phở bò',
            price: 50000,
            category: 'Món chính',
            description: 'Phở bò ngon',
            image: 'pho.jpg'
          });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('menuItem');
        expect(response.body.menuItem).toHaveProperty('name', 'Phở bò');
      });

      test('Thêm menu item thất bại khi thiếu thông tin', async () => {
        const response = await request(app)
          .post('/api/admin/menu/add')
          .send({
            name: 'Phở bò'
            // Thiếu price, category
          });

        expect(response.status).toBeGreaterThanOrEqual(400);
      });

      test('Thêm menu item thất bại khi giá không hợp lệ', async () => {
        const response = await request(app)
          .post('/api/admin/menu/add')
          .send({
            name: 'Phở bò',
            price: -50000, // Giá âm
            category: 'Món chính'
          });

        expect(response.status).toBeGreaterThanOrEqual(400);
      });
    });

    describe('GET /api/admin/menu/all', () => {
      test('Lấy tất cả menu items', async () => {
        await Menu.create({
          name: 'Phở bò',
          price: 50000,
          category: 'Món chính'
        });

        await Menu.create({
          name: 'Nước cam',
          price: 20000,
          category: 'Nước uống'
        });

        const response = await request(app)
          .get('/api/admin/menu/all');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(2);
      });

      test('Lấy menu khi không có items', async () => {
        const response = await request(app)
          .get('/api/admin/menu/all');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(0);
      });
    });

    describe('PUT /api/admin/menu/edit/:id', () => {
      test('Cập nhật menu item thành công', async () => {
        const menu = await Menu.create({
          name: 'Phở bò',
          price: 50000,
          category: 'Món chính'
        });

        const response = await request(app)
          .put(`/api/admin/menu/edit/${menu._id}`)
          .send({
            name: 'Phở bò cao cấp',
            price: 60000,
            category: 'Món chính'
          });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.menuItem).toHaveProperty('name', 'Phở bò cao cấp');
      });

      test('Cập nhật menu item thất bại với ID không hợp lệ', async () => {
        const response = await request(app)
          .put('/api/admin/menu/edit/invalidid')
          .send({
            name: 'Phở bò'
          });

        expect(response.status).toBeGreaterThanOrEqual(400);
      });
    });

    describe('DELETE /api/admin/menu/delete/:id', () => {
      test('Xóa menu item thành công', async () => {
        const menu = await Menu.create({
          name: 'Phở bò',
          price: 50000,
          category: 'Món chính'
        });

        const response = await request(app)
          .delete(`/api/admin/menu/delete/${menu._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');

        const deleted = await Menu.findById(menu._id);
        expect(deleted).toBeNull();
      });

      test('Xóa menu item thất bại với ID không hợp lệ', async () => {
        const response = await request(app)
          .delete('/api/admin/menu/delete/invalidid');

        expect(response.status).toBeGreaterThanOrEqual(400);
      });
    });
  });

  describe('Staff Management', () => {
    describe('POST /api/admin/staff/add', () => {
      test('Thêm nhân viên thành công', async () => {
        const response = await request(app)
          .post('/api/admin/staff/add')
          .send({
            username: 'nhanvien1',
            password: '123',
            role: 'chef',
            name: 'Trần Văn B'
          });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('staff');
      });

      test('Thêm nhân viên thất bại khi thiếu thông tin', async () => {
        const response = await request(app)
          .post('/api/admin/staff/add')
          .send({
            username: 'nhanvien1'
            // Thiếu password, role
          });

        expect(response.status).toBeGreaterThanOrEqual(400);
      });
    });

    describe('GET /api/admin/staff/all', () => {
      test('Lấy tất cả nhân viên', async () => {
        await User.create({
          username: 'chef1',
          password: '123',
          role: 'chef'
        });

        const response = await request(app)
          .get('/api/admin/staff/all');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    describe('PUT /api/admin/staff/edit/:id', () => {
      test('Cập nhật thông tin nhân viên', async () => {
        const staff = await User.create({
          username: 'chef1',
          password: '123',
          role: 'chef'
        });

        const response = await request(app)
          .put(`/api/admin/staff/edit/${staff._id}`)
          .send({
            username: 'chef1_updated',
            role: 'manager'
          });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
      });
    });

    describe('DELETE /api/admin/staff/delete/:id', () => {
      test('Xóa nhân viên', async () => {
        const staff = await User.create({
          username: 'chef1',
          password: '123',
          role: 'chef'
        });

        const response = await request(app)
          .delete(`/api/admin/staff/delete/${staff._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');

        const deleted = await User.findById(staff._id);
        expect(deleted).toBeNull();
      });
    });
  });

  describe('Table Management', () => {
    describe('POST /api/admin/table/add', () => {
      test('Thêm bàn thành công', async () => {
        const response = await request(app)
          .post('/api/admin/table/add')
          .send({
            tableNumber: 1,
            capacity: 4,
            pin: '1234',
            status: 'available'
          });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('table');
      });

      test('Thêm bàn thất bại khi thiếu thông tin', async () => {
        const response = await request(app)
          .post('/api/admin/table/add')
          .send({
            tableNumber: 1
            // Thiếu capacity, pin
          });

        expect(response.status).toBeGreaterThanOrEqual(400);
      });
    });
  });

  describe('Stats and Revenue', () => {
    describe('GET /api/admin/stats', () => {
      test('Lấy thống kê chung', async () => {
        const response = await request(app)
          .get('/api/admin/stats');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('totalOrders');
        expect(response.body).toHaveProperty('totalRevenue');
      });
    });

    describe('GET /api/admin/revenue', () => {
      test('Lấy doanh thu', async () => {
        // Tạo một vài đơn hàng
        const table = await Table.create({
          tableNumber: 1,
          capacity: 4,
          pin: '1234',
          status: 'occupied'
        });

        const menu = await Menu.create({
          name: 'Phở bò',
          price: 50000,
          category: 'Món chính'
        });

        await Order.create({
          tableId: table._id,
          items: [
            {
              menuId: menu._id,
              quantity: 1,
              price: 50000
            }
          ],
          totalPrice: 50000,
          status: 'completed'
        });

        const response = await request(app)
          .get('/api/admin/revenue');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('revenue');
      });
    });
  });
});
