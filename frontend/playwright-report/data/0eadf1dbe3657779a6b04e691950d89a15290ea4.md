# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: menu.spec.js >> Thực đơn >> Hiển thị danh sách món ăn
- Location: tests\menu.spec.js:5:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Thực đơn')
Expected: visible
Error: strict mode violation: locator('text=Thực đơn') resolved to 4 elements:
    1) <span>Thực đơn</span> aka locator('nav').getByText('Thực đơn')
    2) <span>Thực đơn</span> aka getByRole('link', { name: '📋 Thực đơn' })
    3) <h1>Thực Đơn Của Chúng Tôi</h1> aka getByRole('heading', { name: 'Thực Đơn Của Chúng Tôi' })
    4) <span>Thực đơn</span> aka getByRole('link', { name: '→ Thực đơn' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Thực đơn')

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - banner [ref=e5]:
    - generic [ref=e6]:
      - link "🍴 Restaurant" [ref=e7]:
        - /url: /
        - generic [ref=e9]: 🍴
        - generic [ref=e11]: Restaurant
      - button "Toggle menu" [ref=e12] [cursor=pointer]
    - list [ref=e17]:
      - listitem [ref=e18]:
        - link "🏠 Trang chủ" [ref=e20]:
          - /url: /
          - generic [ref=e21]: 🏠
          - generic [ref=e22]: Trang chủ
      - listitem [ref=e23]:
        - generic [ref=e24]:
          - link "📋 Thực đơn" [ref=e25]:
            - /url: /menu
            - generic [ref=e26]: 📋
            - generic [ref=e27]: Thực đơn
          - button "▼" [ref=e28] [cursor=pointer]:
            - generic [ref=e29]: ▼
        - list [ref=e30]:
          - listitem [ref=e31]:
            - link "Khai vị" [ref=e32]:
              - /url: /menu/appetizers
          - listitem [ref=e33]:
            - link "Món chính" [ref=e34]:
              - /url: /menu/main-dishes
          - listitem [ref=e35]:
            - link "Đồ uống" [ref=e36]:
              - /url: /menu/beverages
          - listitem [ref=e37]:
            - link "Tráng miệng" [ref=e38]:
              - /url: /menu/desserts
      - listitem [ref=e39]:
        - link "📅 Đặt bàn" [ref=e41]:
          - /url: /reservation
          - generic [ref=e42]: 📅
          - generic [ref=e43]: Đặt bàn
      - listitem [ref=e44]:
        - link "🍽️ Gọi món" [ref=e46]:
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
  - contentinfo [ref=e104]:
    - generic [ref=e107]:
      - generic [ref=e108]:
        - generic [ref=e109]:
          - generic [ref=e111]: 🍴
          - generic [ref=e112]:
            - heading "Restaurant" [level=3] [ref=e113]
            - paragraph [ref=e114]: Management System
        - paragraph [ref=e115]: Hệ thống quản lý nhà hàng chuyên nghiệp, giúp tối ưu hóa quy trình vận hành và nâng cao trải nghiệm khách hàng.
        - generic [ref=e116]:
          - link "Facebook" [ref=e117]:
            - /url: "#"
          - link "Instagram" [ref=e118]:
            - /url: "#"
          - link "Twitter" [ref=e119]:
            - /url: "#"
          - link "YouTube" [ref=e120]:
            - /url: "#"
      - generic [ref=e121]:
        - heading "Liên kết nhanh" [level=4] [ref=e122]
        - list [ref=e123]:
          - listitem [ref=e124]:
            - link "→ Trang chủ" [ref=e125]:
              - /url: /
              - generic [ref=e126]: →
              - generic [ref=e127]: Trang chủ
          - listitem [ref=e128]:
            - link "→ Thực đơn" [ref=e129]:
              - /url: /menu
              - generic [ref=e130]: →
              - generic [ref=e131]: Thực đơn
          - listitem [ref=e132]:
            - link "→ Đặt bàn" [ref=e133]:
              - /url: /reservation
              - generic [ref=e134]: →
              - generic [ref=e135]: Đặt bàn
          - listitem [ref=e136]:
            - link "→ Về chúng tôi" [ref=e137]:
              - /url: /about
              - generic [ref=e138]: →
              - generic [ref=e139]: Về chúng tôi
      - generic [ref=e140]:
        - heading "Quản lý" [level=4] [ref=e141]
        - list [ref=e142]:
          - listitem [ref=e143]:
            - link "→ Dashboard" [ref=e144]:
              - /url: /admin/dashboard
              - generic [ref=e145]: →
              - generic [ref=e146]: Dashboard
          - listitem [ref=e147]:
            - link "→ Quản lý đơn hàng" [ref=e148]:
              - /url: /admin/orders
              - generic [ref=e149]: →
              - generic [ref=e150]: Quản lý đơn hàng
          - listitem [ref=e151]:
            - link "→ Quản lý bàn" [ref=e152]:
              - /url: /admin/tables
              - generic [ref=e153]: →
              - generic [ref=e154]: Quản lý bàn
          - listitem [ref=e155]:
            - link "→ Báo cáo" [ref=e156]:
              - /url: /admin/reports
              - generic [ref=e157]: →
              - generic [ref=e158]: Báo cáo
      - generic [ref=e159]:
        - heading "Liên hệ" [level=4] [ref=e160]
        - generic [ref=e161]:
          - generic [ref=e162]:
            - generic [ref=e163]: 📍
            - generic [ref=e164]:
              - paragraph [ref=e165]: Địa chỉ
              - paragraph [ref=e166]: 123 Đường ABC, Quận 1, TP.HCM
          - generic [ref=e167]:
            - generic [ref=e168]: 📞
            - generic [ref=e169]:
              - paragraph [ref=e170]: Điện thoại
              - paragraph [ref=e171]:
                - link "+84 123 456 789" [ref=e172]:
                  - /url: tel:+84123456789
          - generic [ref=e173]:
            - generic [ref=e174]: ✉️
            - generic [ref=e175]:
              - paragraph [ref=e176]: Email
              - paragraph [ref=e177]:
                - link "contact@restaurant.com" [ref=e178]:
                  - /url: mailto:contact@restaurant.com
    - generic [ref=e181]:
      - paragraph [ref=e182]:
        - text: © 2026
        - strong [ref=e183]: Restaurant Management System
        - text: . All rights reserved.
      - generic [ref=e184]:
        - link "Chính sách bảo mật" [ref=e185]:
          - /url: /privacy
        - generic [ref=e186]: "|"
        - link "Điều khoản sử dụng" [ref=e187]:
          - /url: /terms
        - generic [ref=e188]: "|"
        - link "Sitemap" [ref=e189]:
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
> 9  |     await expect(page.locator('text=Thực đơn')).toBeVisible();
     |                                                 ^ Error: expect(locator).toBeVisible() failed
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
  35 |     await page.locator('.menu-item').first().locator('button.add-to-cart').click();
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