const request = require('supertest');
const express = require('express');
const reservationRoutes = require('../routes/reservation.route');
const Reservation = require('../models/Reservation.model');
const mongoose = require('mongoose');

// Tạo ứng dụng test
const app = express();
app.use(express.json());
app.use('/api/reservation', reservationRoutes);

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
  await Reservation.deleteMany({});
});

// Xóa dữ liệu sau khi test
afterAll(async () => {
  await Reservation.deleteMany({});
  await mongoose.disconnect();
});

describe('Reservation API', () => {
  describe('POST /api/reservation/add', () => {
    test('Tạo đặt bàn thành công', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);

      const response = await request(app)
        .post('/api/reservation/add')
        .send({
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com',
          phone: '0123456789',
          date: futureDate.toISOString().split('T')[0],
          time: '19:00',
          guests: 4,
          notes: 'Bàn gần cửa sổ'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('reservation');
      expect(response.body.reservation).toHaveProperty('name', 'Nguyễn Văn A');
      expect(response.body.reservation).toHaveProperty('guests', 4);
    });

    test('Đặt bàn thất bại khi thiếu thông tin', async () => {
      const response = await request(app)
        .post('/api/reservation/add')
        .send({
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com'
          // Thiếu phone, date, time, guests
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    test('Đặt bàn thất bại khi ngày trong quá khứ', async () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);

      const response = await request(app)
        .post('/api/reservation/add')
        .send({
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com',
          phone: '0123456789',
          date: pastDate.toISOString().split('T')[0],
          time: '19:00',
          guests: 4,
          notes: 'Bàn gần cửa sổ'
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    test('Đặt bàn thất bại khi số lượng khách không hợp lệ', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);

      const response = await request(app)
        .post('/api/reservation/add')
        .send({
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com',
          phone: '0123456789',
          date: futureDate.toISOString().split('T')[0],
          time: '19:00',
          guests: 0, // Số lượng khách không hợp lệ
          notes: ''
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    test('Đặt bàn thất bại khi email không hợp lệ', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);

      const response = await request(app)
        .post('/api/reservation/add')
        .send({
          name: 'Nguyễn Văn A',
          email: 'invalidemail', // Email không hợp lệ
          phone: '0123456789',
          date: futureDate.toISOString().split('T')[0],
          time: '19:00',
          guests: 4,
          notes: ''
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });

  describe('GET /api/reservation/all', () => {
    test('Lấy tất cả đặt bàn', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);

      // Tạo một vài đặt bàn
      await Reservation.create({
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0123456789',
        date: futureDate,
        time: '19:00',
        guests: 4,
        notes: 'Bàn gần cửa sổ'
      });

      const response = await request(app)
        .get('/api/reservation/all');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('Lấy đặt bàn khi không có dữ liệu', async () => {
      const response = await request(app)
        .get('/api/reservation/all');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });
  });

  describe('PUT /api/reservation/update-status/:id', () => {
    test('Cập nhật trạng thái đặt bàn', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);

      const reservation = await Reservation.create({
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0123456789',
        date: futureDate,
        time: '19:00',
        guests: 4,
        notes: 'Bàn gần cửa sổ',
        status: 'pending'
      });

      const response = await request(app)
        .put(`/api/reservation/update-status/${reservation._id}`)
        .send({ status: 'confirmed' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
    });

    test('Cập nhật trạng thái với ID không hợp lệ', async () => {
      const response = await request(app)
        .put('/api/reservation/update-status/invalidid')
        .send({ status: 'confirmed' });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });

  describe('DELETE /api/reservation/delete/:id', () => {
    test('Xóa đặt bàn', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);

      const reservation = await Reservation.create({
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0123456789',
        date: futureDate,
        time: '19:00',
        guests: 4,
        notes: 'Bàn gần cửa sổ'
      });

      const response = await request(app)
        .delete(`/api/reservation/delete/${reservation._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');

      // Kiểm tra đặt bàn đã bị xóa
      const deleted = await Reservation.findById(reservation._id);
      expect(deleted).toBeNull();
    });

    test('Xóa đặt bàn với ID không hợp lệ', async () => {
      const response = await request(app)
        .delete('/api/reservation/delete/invalidid');

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });
});
