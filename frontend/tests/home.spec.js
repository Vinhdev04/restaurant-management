import { test, expect } from '@playwright/test';

// Kịch bản test: Kiểm tra trang chủ
test.describe('Trang chủ', () => {
  test('Hiển thị trang chủ với các tính năng chính', async ({ page }) => {
    // Điều hướng đến trang chủ
    await page.goto('/');

    // Kiểm tra tiêu đề trang
    await expect(page).toHaveTitle(/Restaurant Management/);

    // Kiểm tra các tính năng được hiển thị
    await expect(page.locator('text=Quản lý thực đơn')).toBeVisible();
    await expect(page.locator('text=Đặt bàn trực tuyến')).toBeVisible();
    await expect(page.locator('text=Kết nối bếp')).toBeVisible();
    await expect(page.locator('text=Thanh toán nhanh')).toBeVisible();
    await expect(page.locator('text=Báo cáo chi tiết')).toBeVisible();
    await expect(page.locator('text=Quản lý nhân sự')).toBeVisible();

    // Kiểm tra thống kê
    await expect(page.locator('text=1000+')).toBeVisible();
    await expect(page.locator('text=500+')).toBeVisible();
    await expect(page.locator('text=4.9/5')).toBeVisible();
    await expect(page.locator('text=24/7')).toBeVisible();
  });

  test('Điều hướng đến trang thực đơn từ trang chủ', async ({ page }) => {
    await page.goto('/');

    // Click vào liên kết thực đơn
    await page.locator('text=Quản lý thực đơn').click();

    // Kiểm tra đã chuyển đến trang thực đơn
    await expect(page).toHaveURL(/.*menu/);
  });

  test('Điều hướng đến trang đặt bàn từ trang chủ', async ({ page }) => {
    await page.goto('/');

    // Click vào liên kết đặt bàn
    await page.locator('text=Đặt bàn trực tuyến').click();

    // Kiểm tra đã chuyển đến trang đặt bàn
    await expect(page).toHaveURL(/.*reservation/);
  });
});