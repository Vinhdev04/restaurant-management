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
      - link "🍴 Restaurant Management" [ref=e7]:
        - /url: /
        - generic [ref=e9]: 🍴
        - generic [ref=e10]:
          - generic [ref=e11]: Restaurant
          - generic [ref=e12]: Management
      - navigation [ref=e13]:
        - list [ref=e14]:
          - listitem [ref=e15]:
            - link "🏠 Trang chủ" [ref=e16]:
              - /url: /
              - generic [ref=e17]: 🏠
              - generic [ref=e18]: Trang chủ
          - listitem [ref=e19]:
            - link "📋 Thực đơn ▼" [ref=e20]:
              - /url: /menu
              - generic [ref=e21]: 📋
              - generic [ref=e22]: Thực đơn
              - generic [ref=e23]: ▼
          - listitem [ref=e24]:
            - link "📅 Đặt bàn" [ref=e25]:
              - /url: /reservation
              - generic [ref=e26]: 📅
              - generic [ref=e27]: Đặt bàn
          - listitem [ref=e28]:
            - link "🍽️ Gọi món" [ref=e29]:
              - /url: /tablet
              - generic [ref=e30]: 🍽️
              - generic [ref=e31]: Gọi món
      - link "Đăng nhập" [ref=e34]:
        - /url: /login
    - list [ref=e36]:
      - listitem [ref=e37]:
        - link "🏠 Trang chủ" [ref=e39]:
          - /url: /
          - generic [ref=e40]: 🏠
          - generic [ref=e41]: Trang chủ
      - listitem [ref=e42]:
        - generic [ref=e43]:
          - link "📋 Thực đơn" [ref=e44]:
            - /url: /menu
            - generic [ref=e45]: 📋
            - generic [ref=e46]: Thực đơn
          - button "▼" [ref=e47] [cursor=pointer]:
            - generic [ref=e48]: ▼
        - list [ref=e49]:
          - listitem [ref=e50]:
            - link "Khai vị" [ref=e51]:
              - /url: /menu/appetizers
          - listitem [ref=e52]:
            - link "Món chính" [ref=e53]:
              - /url: /menu/main-dishes
          - listitem [ref=e54]:
            - link "Đồ uống" [ref=e55]:
              - /url: /menu/beverages
          - listitem [ref=e56]:
            - link "Tráng miệng" [ref=e57]:
              - /url: /menu/desserts
      - listitem [ref=e58]:
        - link "📅 Đặt bàn" [ref=e60]:
          - /url: /reservation
          - generic [ref=e61]: 📅
          - generic [ref=e62]: Đặt bàn
      - listitem [ref=e63]:
        - link "🍽️ Gọi món" [ref=e65]:
          - /url: /tablet
          - generic [ref=e66]: 🍽️
          - generic [ref=e67]: Gọi món
  - main [ref=e68]:
    - generic [ref=e70]:
      - generic [ref=e71]:
        - heading "Thực Đơn Của Chúng Tôi" [level=1] [ref=e72]
        - paragraph [ref=e73]: Khám phá những món ăn tinh túy, được chế biến từ những nguyên liệu tươi ngon nhất bởi các đầu bếp hàng đầu.
      - generic [ref=e74]:
        - button "Tất cả" [ref=e75] [cursor=pointer]
        - button "Món Khai Vị" [ref=e76] [cursor=pointer]
        - button "Món Chính" [ref=e77] [cursor=pointer]
        - button "Tráng Miệng" [ref=e78] [cursor=pointer]
        - button "Đồ Uống" [ref=e79] [cursor=pointer]
  - contentinfo [ref=e80]:
    - generic [ref=e83]:
      - generic [ref=e84]:
        - generic [ref=e85]:
          - generic [ref=e87]: 🍴
          - generic [ref=e88]:
            - heading "Restaurant" [level=3] [ref=e89]
            - paragraph [ref=e90]: Management System
        - paragraph [ref=e91]: Hệ thống quản lý nhà hàng chuyên nghiệp, giúp tối ưu hóa quy trình vận hành và nâng cao trải nghiệm khách hàng.
        - generic [ref=e92]:
          - link "Facebook" [ref=e93]:
            - /url: "#"
          - link "Instagram" [ref=e94]:
            - /url: "#"
          - link "Twitter" [ref=e95]:
            - /url: "#"
          - link "YouTube" [ref=e96]:
            - /url: "#"
      - generic [ref=e97]:
        - heading "Liên kết nhanh" [level=4] [ref=e98]
        - list [ref=e99]:
          - listitem [ref=e100]:
            - link "→ Trang chủ" [ref=e101]:
              - /url: /
              - generic [ref=e102]: →
              - generic [ref=e103]: Trang chủ
          - listitem [ref=e104]:
            - link "→ Thực đơn" [ref=e105]:
              - /url: /menu
              - generic [ref=e106]: →
              - generic [ref=e107]: Thực đơn
          - listitem [ref=e108]:
            - link "→ Đặt bàn" [ref=e109]:
              - /url: /reservation
              - generic [ref=e110]: →
              - generic [ref=e111]: Đặt bàn
          - listitem [ref=e112]:
            - link "→ Về chúng tôi" [ref=e113]:
              - /url: /about
              - generic [ref=e114]: →
              - generic [ref=e115]: Về chúng tôi
      - generic [ref=e116]:
        - heading "Quản lý" [level=4] [ref=e117]
        - list [ref=e118]:
          - listitem [ref=e119]:
            - link "→ Dashboard" [ref=e120]:
              - /url: /admin/dashboard
              - generic [ref=e121]: →
              - generic [ref=e122]: Dashboard
          - listitem [ref=e123]:
            - link "→ Quản lý đơn hàng" [ref=e124]:
              - /url: /admin/orders
              - generic [ref=e125]: →
              - generic [ref=e126]: Quản lý đơn hàng
          - listitem [ref=e127]:
            - link "→ Quản lý bàn" [ref=e128]:
              - /url: /admin/tables
              - generic [ref=e129]: →
              - generic [ref=e130]: Quản lý bàn
          - listitem [ref=e131]:
            - link "→ Báo cáo" [ref=e132]:
              - /url: /admin/reports
              - generic [ref=e133]: →
              - generic [ref=e134]: Báo cáo
      - generic [ref=e135]:
        - heading "Liên hệ" [level=4] [ref=e136]
        - generic [ref=e137]:
          - generic [ref=e138]:
            - generic [ref=e139]: 📍
            - generic [ref=e140]:
              - paragraph [ref=e141]: Địa chỉ
              - paragraph [ref=e142]: 123 Đường ABC, Quận 1, TP.HCM
          - generic [ref=e143]:
            - generic [ref=e144]: 📞
            - generic [ref=e145]:
              - paragraph [ref=e146]: Điện thoại
              - paragraph [ref=e147]:
                - link "+84 123 456 789" [ref=e148]:
                  - /url: tel:+84123456789
          - generic [ref=e149]:
            - generic [ref=e150]: ✉️
            - generic [ref=e151]:
              - paragraph [ref=e152]: Email
              - paragraph [ref=e153]:
                - link "contact@restaurant.com" [ref=e154]:
                  - /url: mailto:contact@restaurant.com
    - generic [ref=e157]:
      - paragraph [ref=e158]:
        - text: © 2026
        - strong [ref=e159]: Restaurant Management System
        - text: . All rights reserved.
      - generic [ref=e160]:
        - link "Chính sách bảo mật" [ref=e161]:
          - /url: /privacy
        - generic [ref=e162]: "|"
        - link "Điều khoản sử dụng" [ref=e163]:
          - /url: /terms
        - generic [ref=e164]: "|"
        - link "Sitemap" [ref=e165]:
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