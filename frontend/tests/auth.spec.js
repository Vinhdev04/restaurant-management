import { test, expect } from '@playwright/test';

// Kịch bản test: Đăng nhập
test.describe('Đăng nhập', () => {
  test('Đăng nhập thành công với thông tin hợp lệ', async ({ page }) => {
    // Điều hướng đến trang đăng nhập
    await page.goto('/auth/login');

    // Điền thông tin đăng nhập
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password123');

    // Click nút đăng nhập
    await page.click('button[type="submit"]');

    // Kiểm tra chuyển hướng đến dashboard
    await expect(page).toHaveURL(/.*admin/);

    // Kiểm tra hiển thị dashboard
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('Đăng nhập thất bại với thông tin sai', async ({ page }) => {
    await page.goto('/auth/login');

    // Điền thông tin sai
    await page.fill('input[name="email"]', 'wrong@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');

    // Click nút đăng nhập
    await page.click('button[type="submit"]');

    // Kiểm tra thông báo lỗi
    await expect(page.locator('text=Sai thông tin đăng nhập')).toBeVisible();

    // Kiểm tra vẫn ở trang đăng nhập
    await expect(page).toHaveURL(/.*login/);
  });

  test('Đăng ký tài khoản mới', async ({ page }) => {
    await page.goto('/auth/register');

    // Điền thông tin đăng ký
    await page.fill('input[name="name"]', 'Nguyễn Văn A');
    await page.fill('input[name="email"]', 'nguyenvana@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'password123');

    // Click nút đăng ký
    await page.click('button[type="submit"]');

    // Kiểm tra chuyển hướng hoặc thông báo thành công
    await expect(page.locator('text=Đăng ký thành công')).toBeVisible();
  });
});