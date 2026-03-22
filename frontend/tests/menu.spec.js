import { test, expect } from '@playwright/test';

// Kịch bản test: Thực đơn
test.describe('Thực đơn', () => {
  test('Hiển thị danh sách món ăn', async ({ page }) => {
    await page.goto('/menu');

    // Kiểm tra tiêu đề trang
    await expect(page.locator('text=Thực đơn')).toBeVisible();

    // Kiểm tra có món ăn hiển thị
    await expect(page.locator('.menu-item')).toHaveCountGreaterThan(0);
  });

  test('Lọc món ăn theo danh mục', async ({ page }) => {
    await page.goto('/menu');

    // Click vào danh mục (giả sử có nút lọc)
    await page.click('button[data-category="món chính"]');

    // Kiểm tra chỉ hiển thị món chính
    const menuItems = page.locator('.menu-item');
    await expect(menuItems).toHaveCountGreaterThan(0);

    // Kiểm tra tất cả món đều thuộc danh mục đã chọn
    for (const item of await menuItems.all()) {
      await expect(item).toContainText('Món chính');
    }
  });

  test('Thêm món vào giỏ hàng', async ({ page }) => {
    await page.goto('/menu');

    // Click nút thêm vào giỏ cho món đầu tiên
    await page.locator('.menu-item').first().locator('button.add-to-cart').click();

    // Kiểm tra giỏ hàng cập nhật
    await expect(page.locator('.cart-count')).toContainText('1');
  });

  test('Đặt hàng từ thực đơn', async ({ page }) => {
    await page.goto('/menu');

    // Thêm món vào giỏ
    await page.locator('.menu-item').first().locator('button.add-to-cart').click();

    // Click nút đặt hàng
    await page.click('button.checkout');

    // Kiểm tra chuyển đến trang thanh toán
    await expect(page).toHaveURL(/.*checkout/);

    // Kiểm tra thông tin đơn hàng
    await expect(page.locator('.order-summary')).toBeVisible();
  });
});