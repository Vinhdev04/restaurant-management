# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: menu.spec.js >> Thực đơn >> Thêm món vào giỏ hàng
- Location: tests\menu.spec.js:31:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.menu-item').first().locator('button.add-to-cart')

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - banner [ref=e5]:
    - generic [ref=e6]:
      - link "🍴 Restaurant" [ref=e7] [cursor=pointer]:
        - /url: /
        - generic [ref=e9]: 🍴
        - generic [ref=e11]: Restaurant
      - button "Toggle menu" [ref=e12] [cursor=pointer]
    - list [ref=e17]:
      - listitem [ref=e18]:
        - link "🏠 Trang chủ" [ref=e20] [cursor=pointer]:
          - /url: /
          - generic [ref=e21]: 🏠
          - generic [ref=e22]: Trang chủ
      - listitem [ref=e23]:
        - generic [ref=e24]:
          - link "📋 Thực đơn" [ref=e25] [cursor=pointer]:
            - /url: /menu
            - generic [ref=e26]: 📋
            - generic [ref=e27]: Thực đơn
          - button "▼" [ref=e28] [cursor=pointer]:
            - generic [ref=e29]: ▼
        - list [ref=e30]:
          - listitem [ref=e31]:
            - link "Khai vị" [ref=e32] [cursor=pointer]:
              - /url: /menu/appetizers
          - listitem [ref=e33]:
            - link "Món chính" [ref=e34] [cursor=pointer]:
              - /url: /menu/main-dishes
          - listitem [ref=e35]:
            - link "Đồ uống" [ref=e36] [cursor=pointer]:
              - /url: /menu/beverages
          - listitem [ref=e37]:
            - link "Tráng miệng" [ref=e38] [cursor=pointer]:
              - /url: /menu/desserts
      - listitem [ref=e39]:
        - link "📅 Đặt bàn" [ref=e41] [cursor=pointer]:
          - /url: /reservation
          - generic [ref=e42]: 📅
          - generic [ref=e43]: Đặt bàn
      - listitem [ref=e44]:
        - link "🍽️ Gọi món" [ref=e46] [cursor=pointer]:
          - /url: /tablet
          - generic [ref=e47]: 🍽️
          - generic [ref=e48]: Gọi món
  - main [ref=e49]:
    - generic [ref=e51]:
      - generic [ref=e52]:
        - heading "Thực Đơn Của Chúng Tôi" [level=1] [ref=e53]
        - paragraph [ref=e54]: Khám phá những món ăn tinh túy, được chế biến từ những nguyên liệu tươi ngon nhất bởi các đầu bếp hàng đầu.
      - generic [ref=e55]:
        - button "Tất cả" [ref=e56] [cursor=pointer]
        - button "Món Khai Vị" [ref=e57] [cursor=pointer]
        - button "Món Chính" [ref=e58] [cursor=pointer]
        - button "Tráng Miệng" [ref=e59] [cursor=pointer]
        - button "Đồ Uống" [ref=e60] [cursor=pointer]
  - contentinfo [ref=e61]:
    - generic [ref=e64]:
      - generic [ref=e65]:
        - generic [ref=e66]:
          - generic [ref=e68]: 🍴
          - generic [ref=e69]:
            - heading "Restaurant" [level=3] [ref=e70]
            - paragraph [ref=e71]: Management System
        - paragraph [ref=e72]: Hệ thống quản lý nhà hàng chuyên nghiệp, giúp tối ưu hóa quy trình vận hành và nâng cao trải nghiệm khách hàng.
        - generic [ref=e73]:
          - link "Facebook" [ref=e74] [cursor=pointer]:
            - /url: "#"
          - link "Instagram" [ref=e75] [cursor=pointer]:
            - /url: "#"
          - link "Twitter" [ref=e76] [cursor=pointer]:
            - /url: "#"
          - link "YouTube" [ref=e77] [cursor=pointer]:
            - /url: "#"
      - generic [ref=e78]:
        - heading "Liên kết nhanh" [level=4] [ref=e79]
        - list [ref=e80]:
          - listitem [ref=e81]:
            - link "→ Trang chủ" [ref=e82] [cursor=pointer]:
              - /url: /
              - generic [ref=e83]: →
              - generic [ref=e84]: Trang chủ
          - listitem [ref=e85]:
            - link "→ Thực đơn" [ref=e86] [cursor=pointer]:
              - /url: /menu
              - generic [ref=e87]: →
              - generic [ref=e88]: Thực đơn
          - listitem [ref=e89]:
            - link "→ Đặt bàn" [ref=e90] [cursor=pointer]:
              - /url: /reservation
              - generic [ref=e91]: →
              - generic [ref=e92]: Đặt bàn
          - listitem [ref=e93]:
            - link "→ Về chúng tôi" [ref=e94] [cursor=pointer]:
              - /url: /about
              - generic [ref=e95]: →
              - generic [ref=e96]: Về chúng tôi
      - generic [ref=e97]:
        - heading "Quản lý" [level=4] [ref=e98]
        - list [ref=e99]:
          - listitem [ref=e100]:
            - link "→ Dashboard" [ref=e101] [cursor=pointer]:
              - /url: /admin/dashboard
              - generic [ref=e102]: →
              - generic [ref=e103]: Dashboard
          - listitem [ref=e104]:
            - link "→ Quản lý đơn hàng" [ref=e105] [cursor=pointer]:
              - /url: /admin/orders
              - generic [ref=e106]: →
              - generic [ref=e107]: Quản lý đơn hàng
          - listitem [ref=e108]:
            - link "→ Quản lý bàn" [ref=e109] [cursor=pointer]:
              - /url: /admin/tables
              - generic [ref=e110]: →
              - generic [ref=e111]: Quản lý bàn
          - listitem [ref=e112]:
            - link "→ Báo cáo" [ref=e113] [cursor=pointer]:
              - /url: /admin/reports
              - generic [ref=e114]: →
              - generic [ref=e115]: Báo cáo
      - generic [ref=e116]:
        - heading "Liên hệ" [level=4] [ref=e117]
        - generic [ref=e118]:
          - generic [ref=e119]:
            - generic [ref=e120]: 📍
            - generic [ref=e121]:
              - paragraph [ref=e122]: Địa chỉ
              - paragraph [ref=e123]: 123 Đường ABC, Quận 1, TP.HCM
          - generic [ref=e124]:
            - generic [ref=e125]: 📞
            - generic [ref=e126]:
              - paragraph [ref=e127]: Điện thoại
              - paragraph [ref=e128]:
                - link "+84 123 456 789" [ref=e129] [cursor=pointer]:
                  - /url: tel:+84123456789
          - generic [ref=e130]:
            - generic [ref=e131]: ✉️
            - generic [ref=e132]:
              - paragraph [ref=e133]: Email
              - paragraph [ref=e134]:
                - link "contact@restaurant.com" [ref=e135] [cursor=pointer]:
                  - /url: mailto:contact@restaurant.com
    - generic [ref=e138]:
      - paragraph [ref=e139]:
        - text: © 2026
        - strong [ref=e140]: Restaurant Management System
        - text: . All rights reserved.
      - generic [ref=e141]:
        - link "Chính sách bảo mật" [ref=e142] [cursor=pointer]:
          - /url: /privacy
        - generic [ref=e143]: "|"
        - link "Điều khoản sử dụng" [ref=e144] [cursor=pointer]:
          - /url: /terms
        - generic [ref=e145]: "|"
        - link "Sitemap" [ref=e146] [cursor=pointer]:
          - /url: /sitemap
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // Kịch bản test: Thực đơn
  4  | test.describe('Thực đơn', () => {
  5  |   test('Hiển thị danh sách món ăn', async ({ page }) => {
  6  |     await page.goto('/menu');
  7  | 
  8  |     // Kiểm tra tiêu đề trang
  9  |     await expect(page.locator('text=Thực đơn')).toBeVisible();
  10 | 
  11 |     // Kiểm tra có món ăn hiển thị
  12 |     await expect(page.locator('.menu-item')).toHaveCountGreaterThan(0);
  13 |   });
  14 | 
  15 |   test('Lọc món ăn theo danh mục', async ({ page }) => {
  16 |     await page.goto('/menu');
  17 | 
  18 |     // Click vào danh mục (giả sử có nút lọc)
  19 |     await page.click('button[data-category="món chính"]');
  20 | 
  21 |     // Kiểm tra chỉ hiển thị món chính
  22 |     const menuItems = page.locator('.menu-item');
  23 |     await expect(menuItems).toHaveCountGreaterThan(0);
  24 | 
  25 |     // Kiểm tra tất cả món đều thuộc danh mục đã chọn
  26 |     for (const item of await menuItems.all()) {
  27 |       await expect(item).toContainText('Món chính');
  28 |     }
  29 |   });
  30 | 
  31 |   test('Thêm món vào giỏ hàng', async ({ page }) => {
  32 |     await page.goto('/menu');
  33 | 
  34 |     // Click nút thêm vào giỏ cho món đầu tiên
> 35 |     await page.locator('.menu-item').first().locator('button.add-to-cart').click();
     |                                                                            ^ Error: locator.click: Test timeout of 30000ms exceeded.
  36 | 
  37 |     // Kiểm tra giỏ hàng cập nhật
  38 |     await expect(page.locator('.cart-count')).toContainText('1');
  39 |   });
  40 | 
  41 |   test('Đặt hàng từ thực đơn', async ({ page }) => {
  42 |     await page.goto('/menu');
  43 | 
  44 |     // Thêm món vào giỏ
  45 |     await page.locator('.menu-item').first().locator('button.add-to-cart').click();
  46 | 
  47 |     // Click nút đặt hàng
  48 |     await page.click('button.checkout');
  49 | 
  50 |     // Kiểm tra chuyển đến trang thanh toán
  51 |     await expect(page).toHaveURL(/.*checkout/);
  52 | 
  53 |     // Kiểm tra thông tin đơn hàng
  54 |     await expect(page.locator('.order-summary')).toBeVisible();
  55 |   });
  56 | });
```