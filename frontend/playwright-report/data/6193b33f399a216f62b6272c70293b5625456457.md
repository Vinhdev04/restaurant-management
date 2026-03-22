# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: reservation.spec.js >> Đặt bàn >> Đặt bàn với số lượng khách không hợp lệ
- Location: tests\reservation.spec.js:64:3

# Error details

```
Error: dialog.accept: Test ended.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // Kịch bản test: Đặt bàn
  4  | test.describe('Đặt bàn', () => {
  5  |   test('Hiển thị form đặt bàn', async ({ page }) => {
  6  |     await page.goto('/reservation');
  7  | 
  8  |     // Kiểm tra tiêu đề
  9  |     await expect(page.locator('h2:has-text("Đặt Bàn Trực Tuyến")')).toBeVisible();
  10 | 
  11 |     // Kiểm tra form có các trường cần thiết
  12 |     await expect(page.locator('input[name="name"]')).toBeVisible();
  13 |     await expect(page.locator('input[name="email"]')).toBeVisible();
  14 |     await expect(page.locator('input[name="phone"]')).toBeVisible();
  15 |     await expect(page.locator('input[name="date"]')).toBeVisible();
  16 |     await expect(page.locator('select[name="time"]')).toBeVisible();
  17 |     await expect(page.locator('select[name="guests"]')).toBeVisible();
  18 |     await expect(page.locator('textarea[name="notes"]')).toBeVisible();
  19 |   });
  20 | 
  21 |   test('Đặt bàn thành công', async ({ page }) => {
  22 |     await page.goto('/reservation');
  23 | 
  24 |     // Điền thông tin đặt bàn
  25 |     await page.fill('input[name="name"]', 'Nguyễn Văn B');
  26 |     await page.fill('input[name="email"]', 'nguyenvanb@example.com');
  27 |     await page.fill('input[name="phone"]', '0123456789');
  28 |     await page.fill('input[name="date"]', '2024-12-25');
  29 |     await page.selectOption('select[name="time"]', '19:00');
  30 |     await page.selectOption('select[name="guests"]', '4');
  31 |     await page.fill('textarea[name="notes"]', 'Bàn gần cửa sổ');
  32 | 
  33 |     // Click nút đặt bàn
  34 |     await page.click('button:has-text("Xác nhận đặt bàn")');
  35 | 
  36 |     // Kiểm tra thông báo thành công (alert)
  37 |     page.on('dialog', async dialog => {
  38 |       expect(dialog.message()).toContain('Cảm ơn bạn! Yêu cầu đặt bàn của bạn đã được gửi đi.');
  39 |       await dialog.accept();
  40 |     });
  41 |   });
  42 | 
  43 |   test('Đặt bàn với ngày trong quá khứ', async ({ page }) => {
  44 |     await page.goto('/reservation');
  45 | 
  46 |     // Điền thông tin với ngày trong quá khứ
  47 |     await page.fill('input[name="name"]', 'Test User');
  48 |     await page.fill('input[name="email"]', 'test@example.com');
  49 |     await page.fill('input[name="phone"]', '0123456789');
  50 |     await page.fill('input[name="date"]', '2020-01-01'); // Ngày trong quá khứ
  51 |     await page.selectOption('select[name="time"]', '19:00');
  52 |     await page.selectOption('select[name="guests"]', '2');
  53 | 
  54 |     // Click đặt bàn
  55 |     await page.click('button:has-text("Xác nhận đặt bàn")');
  56 | 
  57 |     // Kiểm tra thông báo lỗi (tùy backend)
  58 |     page.on('dialog', async dialog => {
  59 |       expect(dialog.message()).toContain('Lỗi');
  60 |       await dialog.accept();
  61 |     });
  62 |   });
  63 | 
  64 |   test('Đặt bàn với số lượng khách không hợp lệ', async ({ page }) => {
  65 |     await page.goto('/reservation');
  66 | 
  67 |     // Chọn số lượng khách "Nhiều hơn 10 khách"
  68 |     await page.selectOption('select[name="guests"]', 'more');
  69 | 
  70 |     // Điền các trường khác
  71 |     await page.fill('input[name="name"]', 'Test User');
  72 |     await page.fill('input[name="email"]', 'test@example.com');
  73 |     await page.fill('input[name="phone"]', '0123456789');
  74 |     await page.fill('input[name="date"]', '2024-12-25');
  75 |     await page.selectOption('select[name="time"]', '19:00');
  76 | 
  77 |     // Click đặt bàn
  78 |     await page.click('button:has-text("Xác nhận đặt bàn")');
  79 | 
  80 |     // Kiểm tra thông báo (có thể backend sẽ xử lý)
  81 |     page.on('dialog', async dialog => {
  82 |       // Có thể là thành công hoặc lỗi tùy backend
> 83 |       await dialog.accept();
     |                    ^ Error: dialog.accept: Test ended.
  84 |     });
  85 |   });
  86 | });
```