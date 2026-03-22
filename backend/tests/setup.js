/**
 * Test Setup File
 * Cấu hình chung cho tất cả tests
 */

// Load environment variables
require('dotenv').config({ path: '.env.test' });

// Thiết lập timeout mặc định
jest.setTimeout(30000);

// Suppress console errors during tests (optional)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Deprecation Warning') || args[0].includes('Warning'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Global test utilities
global.testUtils = {
  /**
   * Tạo một user object cho test
   */
  createTestUser: (overrides = {}) => ({
    username: 'testuser',
    password: 'testpass',
    role: 'chef',
    ...overrides
  }),

  /**
   * Tạo một reservation object cho test
   */
  createTestReservation: (overrides = {}) => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    
    return {
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '0123456789',
      date: futureDate.toISOString().split('T')[0],
      time: '19:00',
      guests: 4,
      notes: 'Test reservation',
      ...overrides
    };
  },

  /**
   * Tạo một menu item object cho test
   */
  createTestMenuItem: (overrides = {}) => ({
    name: 'Test Dish',
    price: 50000,
    category: 'Main Course',
    description: 'Test description',
    image: 'test.jpg',
    ...overrides
  }),

  /**
   * Tạo một table object cho test
   */
  createTestTable: (overrides = {}) => ({
    tableNumber: 1,
    capacity: 4,
    pin: '1234',
    status: 'available',
    ...overrides
  }),

  /**
   * Tạo một order object cho test
   */
  createTestOrder: (tableId, menuId, overrides = {}) => ({
    tableId,
    items: [
      {
        menuId,
        quantity: 1,
        note: ''
      }
    ],
    totalPrice: 50000,
    status: 'pending',
    ...overrides
  })
};
