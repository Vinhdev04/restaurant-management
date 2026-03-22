/**
 * HƯỚNG DẪN CHẠY TEST BACKEND
 * 
 * Các file test được tổ chức theo chức năng:
 * - tests/auth.test.js: Kiểm tra xác thực người dùng
 * - tests/reservation.test.js: Kiểm tra hệ thống đặt bàn
 * - tests/customer.test.js: Kiểm tra đơn hàng của khách
 * - tests/admin.test.js: Kiểm tra chức năng quản lý
 */

// ==========================================
// CÀI ĐẶT
// ==========================================

/**
 * 1. Cài đặt dependencies
 * npm install
 * 
 * 2. Đảm bảo MongoDB chạy trên máy cục bộ
 * mongod
 * 
 * 3. Chạy seed database (tùy chọn)
 * npm run seed
 */

// ==========================================
// CHẠY TEST
// ==========================================

/**
 * Chạy tất cả tests
 * npm test
 * 
 * Chạy test chỉ định
 * npm test -- tests/auth.test.js
 * 
 * Chạy test với watch mode
 * npm run test:watch
 * 
 * Chạy test với coverage report
 * npm run test:coverage
 */

// ==========================================
// CẤU TRÚC TEST
// ==========================================

/**
 * Mỗi test file bao gồm:
 * 
 * 1. Import dependencies
 * 2. Setup database connection
 * 3. beforeAll: Kết nối database
 * 4. beforeEach: Xóa dữ liệu trước mỗi test
 * 5. Test suites (describe blocks)
 * 6. afterAll: Ngắt kết nối database
 */

// ==========================================
// AUTHENTICATION TESTS (auth.test.js)
// ==========================================

/**
 * Test Cases:
 * ✓ Đăng nhập thành công với thông tin hợp lệ
 * ✓ Đăng nhập thất bại khi sai mật khẩu
 * ✓ Đăng nhập thất bại khi sai username
 * ✓ Đăng nhập thất bại khi vai trò không khớp
 * ✓ Đăng nhập với role manager
 * ✓ Đăng nhập với role chef
 * ✓ Đăng nhập không có body
 * 
 * Endpoint:
 * POST /api/auth/login
 */

// ==========================================
// RESERVATION TESTS (reservation.test.js)
// ==========================================

/**
 * Test Cases:
 * ✓ Tạo đặt bàn thành công
 * ✓ Đặt bàn thất bại khi thiếu thông tin
 * ✓ Đặt bàn thất bại khi ngày trong quá khứ
 * ✓ Đặt bàn thất bại khi số lượng khách không hợp lệ
 * ✓ Đặt bàn thất bại khi email không hợp lệ
 * ✓ Lấy tất cả đặt bàn
 * ✓ Lấy đặt bàn khi không có dữ liệu
 * ✓ Cập nhật trạng thái đặt bàn
 * ✓ Xóa đặt bàn
 * 
 * Endpoints:
 * POST /api/reservation/add
 * GET /api/reservation/all
 * PUT /api/reservation/update-status/:id
 * DELETE /api/reservation/delete/:id
 */

// ==========================================
// CUSTOMER TESTS (customer.test.js)
// ==========================================

/**
 * Test Cases:
 * ✓ Xác minh PIN bàn thành công
 * ✓ Xác minh PIN thất bại khi PIN sai
 * ✓ Xác minh PIN thất bại khi bàn không tồn tại
 * ✓ Đặt hàng thành công
 * ✓ Đặt hàng thất bại khi không có items
 * ✓ Đặt hàng thất bại khi bàn không tồn tại
 * ✓ Lấy đơn hàng của bàn
 * ✓ Lấy đơn hàng khi bàn không có đơn
 * ✓ Yêu cầu thanh toán thành công
 * ✓ Yêu cầu thanh toán thất bại
 * 
 * Endpoints:
 * POST /api/customer/verify-pin
 * POST /api/customer/order
 * GET /api/customer/:tableId
 * POST /api/customer/request-payment
 */

// ==========================================
// ADMIN TESTS (admin.test.js)
// ==========================================

/**
 * Test Cases:
 * 
 * MENU MANAGEMENT
 * ✓ Thêm menu item thành công
 * ✓ Thêm menu item thất bại khi thiếu thông tin
 * ✓ Thêm menu item thất bại khi giá không hợp lệ
 * ✓ Lấy tất cả menu items
 * ✓ Lấy menu khi không có items
 * ✓ Cập nhật menu item thành công
 * ✓ Xóa menu item thành công
 * 
 * STAFF MANAGEMENT
 * ✓ Thêm nhân viên thành công
 * ✓ Thêm nhân viên thất bại khi thiếu thông tin
 * ✓ Lấy tất cả nhân viên
 * ✓ Cập nhật thông tin nhân viên
 * ✓ Xóa nhân viên
 * 
 * TABLE MANAGEMENT
 * ✓ Thêm bàn thành công
 * ✓ Thêm bàn thất bại khi thiếu thông tin
 * 
 * STATS
 * ✓ Lấy thống kê chung
 * ✓ Lấy doanh thu
 * 
 * Endpoints:
 * POST /api/admin/menu/add
 * GET /api/admin/menu/all
 * PUT /api/admin/menu/edit/:id
 * DELETE /api/admin/menu/delete/:id
 * POST /api/admin/staff/add
 * GET /api/admin/staff/all
 * PUT /api/admin/staff/edit/:id
 * DELETE /api/admin/staff/delete/:id
 * POST /api/admin/table/add
 * GET /api/admin/stats
 * GET /api/admin/revenue
 */

// ==========================================
// MẪU TEST
// ==========================================

/**
 * const request = require('supertest');
 * const app = require('../app');
 * 
 * describe('API Endpoint', () => {
 *   test('Mô tả test', async () => {
 *     const response = await request(app)
 *       .post('/api/endpoint')
 *       .send({ data: 'value' });
 *     
 *     expect(response.status).toBe(200);
 *     expect(response.body).toHaveProperty('key');
 *   });
 * });
 */

// ==========================================
// DEBUGGING
// ==========================================

/**
 * Để debug test, thêm vào console.log:
 * console.log('Debug info:', variable);
 * 
 * Chạy test cụ thể để dễ debug:
 * npm test -- tests/auth.test.js --verbose
 * 
 * Dừng tại break point:
 * node --inspect-brk node_modules/.bin/jest --runInBand
 */

// ==========================================
// TROUBLESHOOTING
// ==========================================

/**
 * Lỗi: "Cannot connect to MongoDB"
 * - Đảm bảo MongoDB chạy: mongod
 * - Kiểm tra URI trong .env.test
 * 
 * Lỗi: "Port 5000 already in use"
 * - Kill process: lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9
 * 
 * Lỗi: "Test timeout"
 * - Tăng timeout trong jest.config.js
 * - Kiểm tra database connection
 * 
 * Lỗi: "Cannot find module"
 * - Cài lại dependencies: npm install
 * - Kiểm tra đường dẫn import
 */

// ==========================================
// BEST PRACTICES
// ==========================================

/**
 * 1. Sử dụng meaningful test names
 * 2. Một test = một hành động
 * 3. Setup trước, teardown sau
 * 4. Không phụ thuộc vào test khác
 * 5. Mock external dependencies
 * 6. Kiểm tra cả success và failure cases
 * 7. Sử dụng meaningful assertions
 * 8. Giữ test đơn giản và dễ đọc
 */

module.exports = {};
