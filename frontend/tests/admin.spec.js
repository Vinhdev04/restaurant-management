import { test, expect } from '@playwright/test';

// Kịch bản test: Admin Dashboard
test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Đăng nhập trước mỗi test
    await page.goto('/auth/login');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*admin/);
  });

  test('Hiển thị dashboard với thống kê', async ({ page }) => {
    await page.goto('/admin/dashboard');

    // Kiểm tra tiêu đề
    await expect(page.locator('text=Dashboard')).toBeVisible();

    // Kiểm tra các thống kê
    await expect(page.locator('text=Tổng doanh thu')).toBeVisible();
    await expect(page.locator('text=Số đơn hàng')).toBeVisible();
    await expect(page.locator('text=Khách hàng')).toBeVisible();
  });

  test('Quản lý thực đơn', async ({ page }) => {
    await page.goto('/admin/menu');

    // Kiểm tra danh sách món ăn
    await expect(page.locator('.menu-item-admin')).toHaveCountGreaterThan(0);

    // Click thêm món mới
    await page.click('button.add-menu-item');

    // Điền thông tin món mới
    await page.fill('input[name="name"]', 'Phở bò');
    await page.fill('input[name="price"]', '50000');
    await page.selectOption('select[name="category"]', 'Món chính');

    // Lưu món
    await page.click('button.save');

    // Kiểm tra món mới xuất hiện
    await expect(page.locator('text=Phở bò')).toBeVisible();
  });

  test('Xem danh sách đặt bàn', async ({ page }) => {
    await page.goto('/admin/reservations');

    // Kiểm tra danh sách reservations
    await expect(page.locator('.reservation-item')).toHaveCountGreaterThan(0);

    // Kiểm tra thông tin chi tiết
    const firstReservation = page.locator('.reservation-item').first();
    await expect(firstReservation.locator('.customer-name')).toBeVisible();
    await expect(firstReservation.locator('.date-time')).toBeVisible();
    await expect(firstReservation.locator('.guests')).toBeVisible();
  });

  test('Quản lý nhân viên', async ({ page }) => {
    await page.goto('/admin/staff');

    // Kiểm tra danh sách nhân viên
    await expect(page.locator('.staff-item')).toHaveCountGreaterThan(0);

    // Click thêm nhân viên
    await page.click('button.add-staff');

    // Điền thông tin nhân viên
    await page.fill('input[name="name"]', 'Trần Thị C');
    await page.fill('input[name="email"]', 'tranthic@example.com');
    await page.selectOption('select[name="role"]', 'Chef');

    // Lưu nhân viên
    await page.click('button.save');

    // Kiểm tra nhân viên mới
    await expect(page.locator('text=Trần Thị C')).toBeVisible();
  });
});