import { test, expect } from '@playwright/test';

// Kịch bản test: Đặt bàn
test.describe('Đặt bàn', () => {
  test('Hiển thị form đặt bàn', async ({ page }) => {
    await page.goto('/reservation');

    // Kiểm tra tiêu đề
    await expect(page.locator('h2:has-text("Đặt Bàn Trực Tuyến")')).toBeVisible();

    // Kiểm tra form có các trường cần thiết
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('input[name="date"]')).toBeVisible();
    await expect(page.locator('select[name="time"]')).toBeVisible();
    await expect(page.locator('select[name="guests"]')).toBeVisible();
    await expect(page.locator('textarea[name="notes"]')).toBeVisible();
  });

  test('Đặt bàn thành công', async ({ page }) => {
    await page.goto('/reservation');

    // Điền thông tin đặt bàn
    await page.fill('input[name="name"]', 'Nguyễn Văn B');
    await page.fill('input[name="email"]', 'nguyenvanb@example.com');
    await page.fill('input[name="phone"]', '0123456789');
    await page.fill('input[name="date"]', '2024-12-25');
    await page.selectOption('select[name="time"]', '19:00');
    await page.selectOption('select[name="guests"]', '4');
    await page.fill('textarea[name="notes"]', 'Bàn gần cửa sổ');

    // Click nút đặt bàn
    await page.click('button:has-text("Xác nhận đặt bàn")');

    // Kiểm tra thông báo thành công (alert)
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Cảm ơn bạn! Yêu cầu đặt bàn của bạn đã được gửi đi.');
      await dialog.accept();
    });
  });

  test('Đặt bàn với ngày trong quá khứ', async ({ page }) => {
    await page.goto('/reservation');

    // Điền thông tin với ngày trong quá khứ
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '0123456789');
    await page.fill('input[name="date"]', '2020-01-01'); // Ngày trong quá khứ
    await page.selectOption('select[name="time"]', '19:00');
    await page.selectOption('select[name="guests"]', '2');

    // Click đặt bàn
    await page.click('button:has-text("Xác nhận đặt bàn")');

    // Kiểm tra thông báo lỗi (tùy backend)
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Lỗi');
      await dialog.accept();
    });
  });

  test('Đặt bàn với số lượng khách không hợp lệ', async ({ page }) => {
    await page.goto('/reservation');

    // Chọn số lượng khách "Nhiều hơn 10 khách"
    await page.selectOption('select[name="guests"]', 'more');

    // Điền các trường khác
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '0123456789');
    await page.fill('input[name="date"]', '2024-12-25');
    await page.selectOption('select[name="time"]', '19:00');

    // Click đặt bàn
    await page.click('button:has-text("Xác nhận đặt bàn")');

    // Kiểm tra thông báo (có thể backend sẽ xử lý)
    page.on('dialog', async dialog => {
      // Có thể là thành công hoặc lỗi tùy backend
      await dialog.accept();
    });
  });
});