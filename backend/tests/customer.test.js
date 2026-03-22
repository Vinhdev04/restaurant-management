const request = require('supertest');
const express = require('express');
const customerRoutes = require('../routes/customer.route');
const Order = require('../models/Order.model');
const Table = require('../models/Table.model');
const Menu = require('../models/Menu.model');
const mongoose = require('mongoose');

// Tạo ứng dụng test
const app = express();
app.use(express.json());
app.use('/api/customer', customerRoutes);

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
  await Order.deleteMany({});
  await Table.deleteMany({});
  await Menu.deleteMany({});
});

// Xóa dữ liệu sau khi test
afterAll(async () => {
  await Order.deleteMany({});
  await Table.deleteMany({});
  await Menu.deleteMany({});
  await mongoose.disconnect();
});

describe('Customer API', () => {
  describe('POST /api/customer/verify-pin', () => {
    test('Xác minh PIN bàn thành công', async () => {
      // Tạo một bàn với PIN
      const table = await Table.create({
        tableNumber: 1,
        capacity: 4,
        pin: '1234',
        status: 'available'
      });

      const response = await request(app)
        .post('/api/customer/verify-pin')
        .send({
          tableId: table._id.toString(),
          pin: '1234'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('table');
    });

    test('Xác minh PIN thất bại khi PIN sai', async () => {
      const table = await Table.create({
        tableNumber: 1,
        capacity: 4,
        pin: '1234',
        status: 'available'
      });

      const response = await request(app)
        .post('/api/customer/verify-pin')
        .send({
          tableId: table._id.toString(),
          pin: 'wrongpin'
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    test('Xác minh PIN thất bại khi bàn không tồn tại', async () => {
      const response = await request(app)
        .post('/api/customer/verify-pin')
        .send({
          tableId: '000000000000000000000000',
          pin: '1234'
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });

  describe('POST /api/customer/order', () => {
    test('Đặt hàng thành công', async () => {
      // Tạo bàn
      const table = await Table.create({
        tableNumber: 1,
        capacity: 4,
        pin: '1234',
        status: 'occupied'
      });

      // Tạo menu items
      const menuItem = await Menu.create({
        name: 'Phở bò',
        price: 50000,
        category: 'Món chính',
        description: 'Phở bò ngon'
      });

      const response = await request(app)
        .post('/api/customer/order')
        .send({
          tableId: table._id.toString(),
          items: [
            {
              menuId: menuItem._id.toString(),
              quantity: 2,
              note: 'Thêm hành'
            }
          ],
          totalPrice: 100000
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('order');
      expect(response.body.order).toHaveProperty('items');
    });

    test('Đặt hàng thất bại khi không có items', async () => {
      const table = await Table.create({
        tableNumber: 1,
        capacity: 4,
        pin: '1234',
        status: 'occupied'
      });

      const response = await request(app)
        .post('/api/customer/order')
        .send({
          tableId: table._id.toString(),
          items: [],
          totalPrice: 0
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    test('Đặt hàng thất bại khi bàn không tồn tại', async () => {
      const response = await request(app)
        .post('/api/customer/order')
        .send({
          tableId: '000000000000000000000000',
          items: [{ quantity: 1 }],
          totalPrice: 50000
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });

  describe('GET /api/customer/:tableId', () => {
    test('Lấy đơn hàng của bàn', async () => {
      const table = await Table.create({
        tableNumber: 1,
        capacity: 4,
        pin: '1234',
        status: 'occupied'
      });

      const menuItem = await Menu.create({
        name: 'Phở bò',
        price: 50000,
        category: 'Món chính'
      });

      await Order.create({
        tableId: table._id,
        items: [
          {
            menuId: menuItem._id,
            quantity: 1,
            note: ''
          }
        ],
        totalPrice: 50000,
        status: 'pending'
      });

      const response = await request(app)
        .get(`/api/customer/${table._id.toString()}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('Lấy đơn hàng khi bàn không có đơn', async () => {
      const table = await Table.create({
        tableNumber: 1,
        capacity: 4,
        pin: '1234',
        status: 'available'
      });

      const response = await request(app)
        .get(`/api/customer/${table._id.toString()}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });
  });

  describe('POST /api/customer/request-payment', () => {
    test('Yêu cầu thanh toán thành công', async () => {
      const table = await Table.create({
        tableNumber: 1,
        capacity: 4,
        pin: '1234',
        status: 'occupied'
      });

      const menuItem = await Menu.create({
        name: 'Phở bò',
        price: 50000,
        category: 'Món chính'
      });

      const order = await Order.create({
        tableId: table._id,
        items: [
          {
            menuId: menuItem._id,
            quantity: 1,
            note: ''
          }
        ],
        totalPrice: 50000,
        status: 'completed'
      });

      const response = await request(app)
        .post('/api/customer/request-payment')
        .send({
          tableId: table._id.toString(),
          orderId: order._id.toString(),
          amount: 50000
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
    });

    test('Yêu cầu thanh toán thất bại khi không có đơn hàng', async () => {
      const table = await Table.create({
        tableNumber: 1,
        capacity: 4,
        pin: '1234',
        status: 'occupied'
      });

      const response = await request(app)
        .post('/api/customer/request-payment')
        .send({
          tableId: table._id.toString(),
          orderId: '000000000000000000000000',
          amount: 50000
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });
});
