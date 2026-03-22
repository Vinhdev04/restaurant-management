# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.js >> Admin Dashboard >> Hiển thị dashboard với thống kê
- Location: tests\admin.spec.js:14:3

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[name="email"]')

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
    - generic [ref=e50]:
      - generic [ref=e55]:
        - generic [ref=e56]:
          - generic [ref=e57]:
            - generic [ref=e58]: ✨
            - generic [ref=e59]: "Giải pháp quản lý #1 Việt Nam"
          - heading "Hệ thống quản lý nhà hàng thông minh & hiện đại" [level=1] [ref=e60]:
            - text: Hệ thống quản lý
            - generic [ref=e61]: nhà hàng
            - text: thông minh & hiện đại
          - paragraph [ref=e62]: Tối ưu hóa quy trình vận hành, từ đặt món đến thanh toán. Nâng cao trải nghiệm khách hàng và tăng doanh thu cho nhà hàng của bạn.
          - generic [ref=e63]:
            - button "Bắt đầu gọi món (Cần PIN)" [ref=e64]:
              - generic [ref=e65]: Bắt đầu gọi món (Cần PIN)
              - img [ref=e66]
            - link "Xem thực đơn" [ref=e68] [cursor=pointer]:
              - /url: /menu
              - generic [ref=e69]: Xem thực đơn
          - generic [ref=e70]:
            - generic [ref=e71]:
              - generic [ref=e72]: ⭐
              - generic [ref=e73]: 4.9/5 rating
            - generic [ref=e75]:
              - generic [ref=e76]: 👥
              - generic [ref=e77]: 500+ nhà hàng
        - generic [ref=e84]:
          - generic [ref=e85]:
            - generic [ref=e86]: 🍜
            - generic [ref=e87]:
              - paragraph [ref=e88]: Phở bò đặc biệt
              - paragraph [ref=e89]: Đang nấu...
            - generic [ref=e90]: New
          - generic [ref=e91]:
            - generic [ref=e92]: 🥗
            - generic [ref=e93]:
              - paragraph [ref=e94]: Salad rau củ
              - paragraph [ref=e95]: Hoàn thành
            - generic [ref=e96]: ✓
      - generic [ref=e98]:
        - generic [ref=e99]:
          - generic [ref=e100]: 📦
          - heading "1000+" [level=3] [ref=e101]
          - paragraph [ref=e102]: Đơn hàng
        - generic [ref=e103]:
          - generic [ref=e104]: 🏪
          - heading "500+" [level=3] [ref=e105]
          - paragraph [ref=e106]: Khách hàng
        - generic [ref=e107]:
          - generic [ref=e108]: ⭐
          - heading "4.9/5" [level=3] [ref=e109]
          - paragraph [ref=e110]: Đánh giá
        - generic [ref=e111]:
          - generic [ref=e112]: 💬
          - heading "24/7" [level=3] [ref=e113]
          - paragraph [ref=e114]: Hỗ trợ
      - generic [ref=e116]:
        - generic [ref=e117]:
          - generic [ref=e118]: Tính năng
          - heading "Mọi thứ bạn cần để quản lý nhà hàng" [level=2] [ref=e119]:
            - text: Mọi thứ bạn cần để
            - generic [ref=e120]: quản lý nhà hàng
          - paragraph [ref=e121]: Giải pháp toàn diện từ A-Z, giúp bạn tập trung vào việc phục vụ khách hàng
        - generic [ref=e122]:
          - link "🍽️ Quản lý thực đơn Dễ dàng cập nhật món ăn, giá cả và hình ảnh với giao diện trực quan" [ref=e123] [cursor=pointer]:
            - /url: /menu
            - generic [ref=e124]: 🍽️
            - heading "Quản lý thực đơn" [level=3] [ref=e125]
            - paragraph [ref=e126]: Dễ dàng cập nhật món ăn, giá cả và hình ảnh với giao diện trực quan
            - img [ref=e128]
          - link "📋 Đặt bàn trực tuyến Khách hàng đặt bàn nhanh chóng, quản lý reservation hiệu quả" [ref=e130] [cursor=pointer]:
            - /url: /reservation
            - generic [ref=e131]: 📋
            - heading "Đặt bàn trực tuyến" [level=3] [ref=e132]
            - paragraph [ref=e133]: Khách hàng đặt bàn nhanh chóng, quản lý reservation hiệu quả
            - img [ref=e135]
          - link "👨‍🍳 Kết nối bếp Đồng bộ đơn hàng realtime từ bàn ăn đến khu vực bếp" [ref=e137] [cursor=pointer]:
            - /url: /admin/dashboard
            - generic [ref=e138]: 👨‍🍳
            - heading "Kết nối bếp" [level=3] [ref=e139]
            - paragraph [ref=e140]: Đồng bộ đơn hàng realtime từ bàn ăn đến khu vực bếp
            - img [ref=e142]
          - link "💳 Thanh toán nhanh Xử lý bill, áp dụng khuyến mãi và in hóa đơn tự động" [ref=e144] [cursor=pointer]:
            - /url: /admin/dashboard
            - generic [ref=e145]: 💳
            - heading "Thanh toán nhanh" [level=3] [ref=e146]
            - paragraph [ref=e147]: Xử lý bill, áp dụng khuyến mãi và in hóa đơn tự động
            - img [ref=e149]
          - link "📊 Báo cáo chi tiết Thống kê doanh thu, món bán chạy theo ngày/tháng/năm" [ref=e151] [cursor=pointer]:
            - /url: /admin/dashboard
            - generic [ref=e152]: 📊
            - heading "Báo cáo chi tiết" [level=3] [ref=e153]
            - paragraph [ref=e154]: Thống kê doanh thu, món bán chạy theo ngày/tháng/năm
            - img [ref=e156]
          - link "👥 Quản lý nhân sự Phân quyền, theo dõi hiệu suất làm việc của từng nhân viên" [ref=e158] [cursor=pointer]:
            - /url: /admin/dashboard
            - generic [ref=e159]: 👥
            - heading "Quản lý nhân sự" [level=3] [ref=e160]
            - paragraph [ref=e161]: Phân quyền, theo dõi hiệu suất làm việc của từng nhân viên
            - img [ref=e163]
      - generic [ref=e166]:
        - generic [ref=e167]:
          - generic [ref=e168]: Quy trình
          - heading "Từ đặt món đến thanh toán" [level=2] [ref=e169]:
            - text: Từ đặt món đến
            - generic [ref=e170]: thanh toán
          - paragraph [ref=e171]: 4 bước đơn giản, tối ưu hóa trải nghiệm cho cả khách hàng và nhân viên
        - generic [ref=e172]:
          - generic [ref=e173]:
            - generic [ref=e174]: "01"
            - generic [ref=e175]:
              - generic [ref=e176]: 📱
              - heading "Khách đặt món" [level=3] [ref=e177]
              - paragraph [ref=e178]: Quét QR hoặc gọi nhân viên để đặt món từ thực đơn điện tử
          - generic [ref=e179]:
            - generic [ref=e180]: "02"
            - generic [ref=e181]:
              - generic [ref=e182]: 🔔
              - heading "Bếp tiếp nhận" [level=3] [ref=e183]
              - paragraph [ref=e184]: Đầu bếp nhận order tự động và cập nhật trạng thái món ăn
          - generic [ref=e185]:
            - generic [ref=e186]: "03"
            - generic [ref=e187]:
              - generic [ref=e188]: 🍜
              - heading "Phục vụ món" [level=3] [ref=e189]
              - paragraph [ref=e190]: Nhân viên mang món ra bàn khi bếp hoàn thành chế biến
          - generic [ref=e191]:
            - generic [ref=e192]: "04"
            - generic [ref=e193]:
              - generic [ref=e194]: ✅
              - heading "Thanh toán" [level=3] [ref=e195]
              - paragraph [ref=e196]: Thu ngân xử lý bill, áp dụng giảm giá và in hóa đơn
      - generic [ref=e199]:
        - heading "Sẵn sàng nâng cấp nhà hàng của bạn?" [level=2] [ref=e200]:
          - text: Sẵn sàng nâng cấp
          - generic [ref=e201]: nhà hàng của bạn?
        - paragraph [ref=e202]: Hàng trăm nhà hàng đã tin tưởng và sử dụng hệ thống của chúng tôi. Bắt đầu ngay hôm nay!
        - generic [ref=e203]:
          - link "Trải nghiệm ngay" [ref=e204] [cursor=pointer]:
            - /url: /login
            - generic [ref=e205]: Trải nghiệm ngay
            - img [ref=e206]
          - link "Tìm hiểu thêm" [ref=e208] [cursor=pointer]:
            - /url: /menu
            - generic [ref=e209]: Tìm hiểu thêm
  - contentinfo [ref=e210]:
    - generic [ref=e213]:
      - generic [ref=e214]:
        - generic [ref=e215]:
          - generic [ref=e217]: 🍴
          - generic [ref=e218]:
            - heading "Restaurant" [level=3] [ref=e219]
            - paragraph [ref=e220]: Management System
        - paragraph [ref=e221]: Hệ thống quản lý nhà hàng chuyên nghiệp, giúp tối ưu hóa quy trình vận hành và nâng cao trải nghiệm khách hàng.
        - generic [ref=e222]:
          - link "Facebook" [ref=e223] [cursor=pointer]:
            - /url: "#"
          - link "Instagram" [ref=e224] [cursor=pointer]:
            - /url: "#"
          - link "Twitter" [ref=e225] [cursor=pointer]:
            - /url: "#"
          - link "YouTube" [ref=e226] [cursor=pointer]:
            - /url: "#"
      - generic [ref=e227]:
        - heading "Liên kết nhanh" [level=4] [ref=e228]
        - list [ref=e229]:
          - listitem [ref=e230]:
            - link "→ Trang chủ" [ref=e231] [cursor=pointer]:
              - /url: /
              - generic [ref=e232]: →
              - generic [ref=e233]: Trang chủ
          - listitem [ref=e234]:
            - link "→ Thực đơn" [ref=e235] [cursor=pointer]:
              - /url: /menu
              - generic [ref=e236]: →
              - generic [ref=e237]: Thực đơn
          - listitem [ref=e238]:
            - link "→ Đặt bàn" [ref=e239] [cursor=pointer]:
              - /url: /reservation
              - generic [ref=e240]: →
              - generic [ref=e241]: Đặt bàn
          - listitem [ref=e242]:
            - link "→ Về chúng tôi" [ref=e243] [cursor=pointer]:
              - /url: /about
              - generic [ref=e244]: →
              - generic [ref=e245]: Về chúng tôi
      - generic [ref=e246]:
        - heading "Quản lý" [level=4] [ref=e247]
        - list [ref=e248]:
          - listitem [ref=e249]:
            - link "→ Dashboard" [ref=e250] [cursor=pointer]:
              - /url: /admin/dashboard
              - generic [ref=e251]: →
              - generic [ref=e252]: Dashboard
          - listitem [ref=e253]:
            - link "→ Quản lý đơn hàng" [ref=e254] [cursor=pointer]:
              - /url: /admin/orders
              - generic [ref=e255]: →
              - generic [ref=e256]: Quản lý đơn hàng
          - listitem [ref=e257]:
            - link "→ Quản lý bàn" [ref=e258] [cursor=pointer]:
              - /url: /admin/tables
              - generic [ref=e259]: →
              - generic [ref=e260]: Quản lý bàn
          - listitem [ref=e261]:
            - link "→ Báo cáo" [ref=e262] [cursor=pointer]:
              - /url: /admin/reports
              - generic [ref=e263]: →
              - generic [ref=e264]: Báo cáo
      - generic [ref=e265]:
        - heading "Liên hệ" [level=4] [ref=e266]
        - generic [ref=e267]:
          - generic [ref=e268]:
            - generic [ref=e269]: 📍
            - generic [ref=e270]:
              - paragraph [ref=e271]: Địa chỉ
              - paragraph [ref=e272]: 123 Đường ABC, Quận 1, TP.HCM
          - generic [ref=e273]:
            - generic [ref=e274]: 📞
            - generic [ref=e275]:
              - paragraph [ref=e276]: Điện thoại
              - paragraph [ref=e277]:
                - link "+84 123 456 789" [ref=e278] [cursor=pointer]:
                  - /url: tel:+84123456789
          - generic [ref=e279]:
            - generic [ref=e280]: ✉️
            - generic [ref=e281]:
              - paragraph [ref=e282]: Email
              - paragraph [ref=e283]:
                - link "contact@restaurant.com" [ref=e284] [cursor=pointer]:
                  - /url: mailto:contact@restaurant.com
    - generic [ref=e287]:
      - paragraph [ref=e288]:
        - text: © 2026
        - strong [ref=e289]: Restaurant Management System
        - text: . All rights reserved.
      - generic [ref=e290]:
        - link "Chính sách bảo mật" [ref=e291] [cursor=pointer]:
          - /url: /privacy
        - generic [ref=e292]: "|"
        - link "Điều khoản sử dụng" [ref=e293] [cursor=pointer]:
          - /url: /terms
        - generic [ref=e294]: "|"
        - link "Sitemap" [ref=e295] [cursor=pointer]:
          - /url: /sitemap
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // Kịch bản test: Admin Dashboard
  4  | test.describe('Admin Dashboard', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     // Đăng nhập trước mỗi test
  7  |     await page.goto('/auth/login');
> 8  |     await page.fill('input[name="email"]', 'admin@example.com');
     |                ^ Error: page.fill: Test timeout of 30000ms exceeded.
  9  |     await page.fill('input[name="password"]', 'password123');
  10 |     await page.click('button[type="submit"]');
  11 |     await expect(page).toHaveURL(/.*admin/);
  12 |   });
  13 | 
  14 |   test('Hiển thị dashboard với thống kê', async ({ page }) => {
  15 |     await page.goto('/admin/dashboard');
  16 | 
  17 |     // Kiểm tra tiêu đề
  18 |     await expect(page.locator('text=Dashboard')).toBeVisible();
  19 | 
  20 |     // Kiểm tra các thống kê
  21 |     await expect(page.locator('text=Tổng doanh thu')).toBeVisible();
  22 |     await expect(page.locator('text=Số đơn hàng')).toBeVisible();
  23 |     await expect(page.locator('text=Khách hàng')).toBeVisible();
  24 |   });
  25 | 
  26 |   test('Quản lý thực đơn', async ({ page }) => {
  27 |     await page.goto('/admin/menu');
  28 | 
  29 |     // Kiểm tra danh sách món ăn
  30 |     await expect(page.locator('.menu-item-admin')).toHaveCountGreaterThan(0);
  31 | 
  32 |     // Click thêm món mới
  33 |     await page.click('button.add-menu-item');
  34 | 
  35 |     // Điền thông tin món mới
  36 |     await page.fill('input[name="name"]', 'Phở bò');
  37 |     await page.fill('input[name="price"]', '50000');
  38 |     await page.selectOption('select[name="category"]', 'Món chính');
  39 | 
  40 |     // Lưu món
  41 |     await page.click('button.save');
  42 | 
  43 |     // Kiểm tra món mới xuất hiện
  44 |     await expect(page.locator('text=Phở bò')).toBeVisible();
  45 |   });
  46 | 
  47 |   test('Xem danh sách đặt bàn', async ({ page }) => {
  48 |     await page.goto('/admin/reservations');
  49 | 
  50 |     // Kiểm tra danh sách reservations
  51 |     await expect(page.locator('.reservation-item')).toHaveCountGreaterThan(0);
  52 | 
  53 |     // Kiểm tra thông tin chi tiết
  54 |     const firstReservation = page.locator('.reservation-item').first();
  55 |     await expect(firstReservation.locator('.customer-name')).toBeVisible();
  56 |     await expect(firstReservation.locator('.date-time')).toBeVisible();
  57 |     await expect(firstReservation.locator('.guests')).toBeVisible();
  58 |   });
  59 | 
  60 |   test('Quản lý nhân viên', async ({ page }) => {
  61 |     await page.goto('/admin/staff');
  62 | 
  63 |     // Kiểm tra danh sách nhân viên
  64 |     await expect(page.locator('.staff-item')).toHaveCountGreaterThan(0);
  65 | 
  66 |     // Click thêm nhân viên
  67 |     await page.click('button.add-staff');
  68 | 
  69 |     // Điền thông tin nhân viên
  70 |     await page.fill('input[name="name"]', 'Trần Thị C');
  71 |     await page.fill('input[name="email"]', 'tranthic@example.com');
  72 |     await page.selectOption('select[name="role"]', 'Chef');
  73 | 
  74 |     // Lưu nhân viên
  75 |     await page.click('button.save');
  76 | 
  77 |     // Kiểm tra nhân viên mới
  78 |     await expect(page.locator('text=Trần Thị C')).toBeVisible();
  79 |   });
  80 | });
```