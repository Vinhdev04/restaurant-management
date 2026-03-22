# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.js >> Admin Dashboard >> Quản lý thực đơn
- Location: tests\admin.spec.js:26:3

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
  - generic [ref=e6]:
    - button "×" [ref=e7] [cursor=pointer]
    - generic [ref=e8]:
      - img "Khuyến mãi đặc biệt" [ref=e9]
      - generic [ref=e10]: GIẢM 30%
    - generic [ref=e11]:
      - heading "Ưu Đãi Đặc Biệt Hôm Nay!" [level=2] [ref=e12]
      - paragraph [ref=e13]: Thưởng thức hương vị ẩm thực tinh túy với ưu đãi giảm giá lên đến 30% cho thực đơn món chính. Chỉ áp dụng cho khách hàng đặt bàn trực tuyến.
      - button "Nhận Ưu Đãi Ngay" [ref=e14] [cursor=pointer]
  - banner [ref=e16]:
    - generic [ref=e17]:
      - link "🍴 Restaurant Management" [ref=e18] [cursor=pointer]:
        - /url: /
        - generic [ref=e20]: 🍴
        - generic [ref=e21]:
          - generic [ref=e22]: Restaurant
          - generic [ref=e23]: Management
      - navigation [ref=e24]:
        - list [ref=e25]:
          - listitem [ref=e26]:
            - link "🏠 Trang chủ" [ref=e27] [cursor=pointer]:
              - /url: /
              - generic [ref=e28]: 🏠
              - generic [ref=e29]: Trang chủ
          - listitem [ref=e30]:
            - link "📋 Thực đơn ▼" [ref=e31] [cursor=pointer]:
              - /url: /menu
              - generic [ref=e32]: 📋
              - generic [ref=e33]: Thực đơn
              - generic [ref=e34]: ▼
          - listitem [ref=e35]:
            - link "📅 Đặt bàn" [ref=e36] [cursor=pointer]:
              - /url: /reservation
              - generic [ref=e37]: 📅
              - generic [ref=e38]: Đặt bàn
          - listitem [ref=e39]:
            - link "🍽️ Gọi món" [ref=e40] [cursor=pointer]:
              - /url: /tablet
              - generic [ref=e41]: 🍽️
              - generic [ref=e42]: Gọi món
      - link "Đăng nhập" [ref=e45] [cursor=pointer]:
        - /url: /login
    - list [ref=e47]:
      - listitem [ref=e48]:
        - link "🏠 Trang chủ" [ref=e50] [cursor=pointer]:
          - /url: /
          - generic [ref=e51]: 🏠
          - generic [ref=e52]: Trang chủ
      - listitem [ref=e53]:
        - generic [ref=e54]:
          - link "📋 Thực đơn" [ref=e55] [cursor=pointer]:
            - /url: /menu
            - generic [ref=e56]: 📋
            - generic [ref=e57]: Thực đơn
          - button "▼" [ref=e58] [cursor=pointer]:
            - generic [ref=e59]: ▼
        - list [ref=e60]:
          - listitem [ref=e61]:
            - link "Khai vị" [ref=e62] [cursor=pointer]:
              - /url: /menu/appetizers
          - listitem [ref=e63]:
            - link "Món chính" [ref=e64] [cursor=pointer]:
              - /url: /menu/main-dishes
          - listitem [ref=e65]:
            - link "Đồ uống" [ref=e66] [cursor=pointer]:
              - /url: /menu/beverages
          - listitem [ref=e67]:
            - link "Tráng miệng" [ref=e68] [cursor=pointer]:
              - /url: /menu/desserts
      - listitem [ref=e69]:
        - link "📅 Đặt bàn" [ref=e71] [cursor=pointer]:
          - /url: /reservation
          - generic [ref=e72]: 📅
          - generic [ref=e73]: Đặt bàn
      - listitem [ref=e74]:
        - link "🍽️ Gọi món" [ref=e76] [cursor=pointer]:
          - /url: /tablet
          - generic [ref=e77]: 🍽️
          - generic [ref=e78]: Gọi món
  - main [ref=e79]:
    - generic [ref=e80]:
      - generic [ref=e85]:
        - generic [ref=e86]:
          - generic [ref=e87]:
            - generic [ref=e88]: ✨
            - generic [ref=e89]: "Giải pháp quản lý #1 Việt Nam"
          - heading "Hệ thống quản lý nhà hàng thông minh & hiện đại" [level=1] [ref=e90]:
            - text: Hệ thống quản lý
            - generic [ref=e91]: nhà hàng
            - text: thông minh & hiện đại
          - paragraph [ref=e92]: Tối ưu hóa quy trình vận hành, từ đặt món đến thanh toán. Nâng cao trải nghiệm khách hàng và tăng doanh thu cho nhà hàng của bạn.
          - generic [ref=e93]:
            - button "Bắt đầu gọi món (Cần PIN)" [ref=e94]:
              - generic [ref=e95]: Bắt đầu gọi món (Cần PIN)
              - img [ref=e96]
            - link "Xem thực đơn" [ref=e98] [cursor=pointer]:
              - /url: /menu
              - generic [ref=e99]: Xem thực đơn
          - generic [ref=e100]:
            - generic [ref=e101]:
              - generic [ref=e102]: ⭐
              - generic [ref=e103]: 4.9/5 rating
            - generic [ref=e105]:
              - generic [ref=e106]: 👥
              - generic [ref=e107]: 500+ nhà hàng
        - generic [ref=e108]:
          - generic [ref=e114]:
            - generic [ref=e115]:
              - generic [ref=e116]: 🍜
              - generic [ref=e117]:
                - paragraph [ref=e118]: Phở bò đặc biệt
                - paragraph [ref=e119]: Đang nấu...
              - generic [ref=e120]: New
            - generic [ref=e121]:
              - generic [ref=e122]: 🥗
              - generic [ref=e123]:
                - paragraph [ref=e124]: Salad rau củ
                - paragraph [ref=e125]: Hoàn thành
              - generic [ref=e126]: ✓
          - generic [ref=e127]:
            - generic [ref=e128]: 🔔
            - paragraph [ref=e129]: "Bàn #5 gọi thêm món"
      - generic [ref=e131]:
        - generic [ref=e132]:
          - generic [ref=e133]: 📦
          - heading "1000+" [level=3] [ref=e134]
          - paragraph [ref=e135]: Đơn hàng
        - generic [ref=e136]:
          - generic [ref=e137]: 🏪
          - heading "500+" [level=3] [ref=e138]
          - paragraph [ref=e139]: Khách hàng
        - generic [ref=e140]:
          - generic [ref=e141]: ⭐
          - heading "4.9/5" [level=3] [ref=e142]
          - paragraph [ref=e143]: Đánh giá
        - generic [ref=e144]:
          - generic [ref=e145]: 💬
          - heading "24/7" [level=3] [ref=e146]
          - paragraph [ref=e147]: Hỗ trợ
      - generic [ref=e149]:
        - generic [ref=e150]:
          - generic [ref=e151]: Tính năng
          - heading "Mọi thứ bạn cần để quản lý nhà hàng" [level=2] [ref=e152]:
            - text: Mọi thứ bạn cần để
            - generic [ref=e153]: quản lý nhà hàng
          - paragraph [ref=e154]: Giải pháp toàn diện từ A-Z, giúp bạn tập trung vào việc phục vụ khách hàng
        - generic [ref=e155]:
          - link "🍽️ Quản lý thực đơn Dễ dàng cập nhật món ăn, giá cả và hình ảnh với giao diện trực quan" [ref=e156] [cursor=pointer]:
            - /url: /menu
            - generic [ref=e157]: 🍽️
            - heading "Quản lý thực đơn" [level=3] [ref=e158]
            - paragraph [ref=e159]: Dễ dàng cập nhật món ăn, giá cả và hình ảnh với giao diện trực quan
            - img [ref=e161]
          - link "📋 Đặt bàn trực tuyến Khách hàng đặt bàn nhanh chóng, quản lý reservation hiệu quả" [ref=e163] [cursor=pointer]:
            - /url: /reservation
            - generic [ref=e164]: 📋
            - heading "Đặt bàn trực tuyến" [level=3] [ref=e165]
            - paragraph [ref=e166]: Khách hàng đặt bàn nhanh chóng, quản lý reservation hiệu quả
            - img [ref=e168]
          - link "👨‍🍳 Kết nối bếp Đồng bộ đơn hàng realtime từ bàn ăn đến khu vực bếp" [ref=e170] [cursor=pointer]:
            - /url: /admin/dashboard
            - generic [ref=e171]: 👨‍🍳
            - heading "Kết nối bếp" [level=3] [ref=e172]
            - paragraph [ref=e173]: Đồng bộ đơn hàng realtime từ bàn ăn đến khu vực bếp
            - img [ref=e175]
          - link "💳 Thanh toán nhanh Xử lý bill, áp dụng khuyến mãi và in hóa đơn tự động" [ref=e177] [cursor=pointer]:
            - /url: /admin/dashboard
            - generic [ref=e178]: 💳
            - heading "Thanh toán nhanh" [level=3] [ref=e179]
            - paragraph [ref=e180]: Xử lý bill, áp dụng khuyến mãi và in hóa đơn tự động
            - img [ref=e182]
          - link "📊 Báo cáo chi tiết Thống kê doanh thu, món bán chạy theo ngày/tháng/năm" [ref=e184] [cursor=pointer]:
            - /url: /admin/dashboard
            - generic [ref=e185]: 📊
            - heading "Báo cáo chi tiết" [level=3] [ref=e186]
            - paragraph [ref=e187]: Thống kê doanh thu, món bán chạy theo ngày/tháng/năm
            - img [ref=e189]
          - link "👥 Quản lý nhân sự Phân quyền, theo dõi hiệu suất làm việc của từng nhân viên" [ref=e191] [cursor=pointer]:
            - /url: /admin/dashboard
            - generic [ref=e192]: 👥
            - heading "Quản lý nhân sự" [level=3] [ref=e193]
            - paragraph [ref=e194]: Phân quyền, theo dõi hiệu suất làm việc của từng nhân viên
            - img [ref=e196]
      - generic [ref=e199]:
        - generic [ref=e200]:
          - generic [ref=e201]: Quy trình
          - heading "Từ đặt món đến thanh toán" [level=2] [ref=e202]:
            - text: Từ đặt món đến
            - generic [ref=e203]: thanh toán
          - paragraph [ref=e204]: 4 bước đơn giản, tối ưu hóa trải nghiệm cho cả khách hàng và nhân viên
        - generic [ref=e205]:
          - generic [ref=e206]:
            - generic [ref=e207]: "01"
            - generic [ref=e208]:
              - generic [ref=e209]: 📱
              - heading "Khách đặt món" [level=3] [ref=e210]
              - paragraph [ref=e211]: Quét QR hoặc gọi nhân viên để đặt món từ thực đơn điện tử
            - img [ref=e213]
          - generic [ref=e215]:
            - generic [ref=e216]: "02"
            - generic [ref=e217]:
              - generic [ref=e218]: 🔔
              - heading "Bếp tiếp nhận" [level=3] [ref=e219]
              - paragraph [ref=e220]: Đầu bếp nhận order tự động và cập nhật trạng thái món ăn
            - img [ref=e222]
          - generic [ref=e224]:
            - generic [ref=e225]: "03"
            - generic [ref=e226]:
              - generic [ref=e227]: 🍜
              - heading "Phục vụ món" [level=3] [ref=e228]
              - paragraph [ref=e229]: Nhân viên mang món ra bàn khi bếp hoàn thành chế biến
            - img [ref=e231]
          - generic [ref=e233]:
            - generic [ref=e234]: "04"
            - generic [ref=e235]:
              - generic [ref=e236]: ✅
              - heading "Thanh toán" [level=3] [ref=e237]
              - paragraph [ref=e238]: Thu ngân xử lý bill, áp dụng giảm giá và in hóa đơn
      - generic [ref=e241]:
        - heading "Sẵn sàng nâng cấp nhà hàng của bạn?" [level=2] [ref=e242]:
          - text: Sẵn sàng nâng cấp
          - generic [ref=e243]: nhà hàng của bạn?
        - paragraph [ref=e244]: Hàng trăm nhà hàng đã tin tưởng và sử dụng hệ thống của chúng tôi. Bắt đầu ngay hôm nay!
        - generic [ref=e245]:
          - link "Trải nghiệm ngay" [ref=e246] [cursor=pointer]:
            - /url: /login
            - generic [ref=e247]: Trải nghiệm ngay
            - img [ref=e248]
          - link "Tìm hiểu thêm" [ref=e250] [cursor=pointer]:
            - /url: /menu
            - generic [ref=e251]: Tìm hiểu thêm
  - contentinfo [ref=e255]:
    - generic [ref=e258]:
      - generic [ref=e259]:
        - generic [ref=e260]:
          - generic [ref=e262]: 🍴
          - generic [ref=e263]:
            - heading "Restaurant" [level=3] [ref=e264]
            - paragraph [ref=e265]: Management System
        - paragraph [ref=e266]: Hệ thống quản lý nhà hàng chuyên nghiệp, giúp tối ưu hóa quy trình vận hành và nâng cao trải nghiệm khách hàng.
        - generic [ref=e267]:
          - link "Facebook" [ref=e268] [cursor=pointer]:
            - /url: "#"
          - link "Instagram" [ref=e269] [cursor=pointer]:
            - /url: "#"
          - link "Twitter" [ref=e270] [cursor=pointer]:
            - /url: "#"
          - link "YouTube" [ref=e271] [cursor=pointer]:
            - /url: "#"
      - generic [ref=e272]:
        - heading "Liên kết nhanh" [level=4] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - link "→ Trang chủ" [ref=e276] [cursor=pointer]:
              - /url: /
              - generic [ref=e277]: →
              - generic [ref=e278]: Trang chủ
          - listitem [ref=e279]:
            - link "→ Thực đơn" [ref=e280] [cursor=pointer]:
              - /url: /menu
              - generic [ref=e281]: →
              - generic [ref=e282]: Thực đơn
          - listitem [ref=e283]:
            - link "→ Đặt bàn" [ref=e284] [cursor=pointer]:
              - /url: /reservation
              - generic [ref=e285]: →
              - generic [ref=e286]: Đặt bàn
          - listitem [ref=e287]:
            - link "→ Về chúng tôi" [ref=e288] [cursor=pointer]:
              - /url: /about
              - generic [ref=e289]: →
              - generic [ref=e290]: Về chúng tôi
      - generic [ref=e291]:
        - heading "Quản lý" [level=4] [ref=e292]
        - list [ref=e293]:
          - listitem [ref=e294]:
            - link "→ Dashboard" [ref=e295] [cursor=pointer]:
              - /url: /admin/dashboard
              - generic [ref=e296]: →
              - generic [ref=e297]: Dashboard
          - listitem [ref=e298]:
            - link "→ Quản lý đơn hàng" [ref=e299] [cursor=pointer]:
              - /url: /admin/orders
              - generic [ref=e300]: →
              - generic [ref=e301]: Quản lý đơn hàng
          - listitem [ref=e302]:
            - link "→ Quản lý bàn" [ref=e303] [cursor=pointer]:
              - /url: /admin/tables
              - generic [ref=e304]: →
              - generic [ref=e305]: Quản lý bàn
          - listitem [ref=e306]:
            - link "→ Báo cáo" [ref=e307] [cursor=pointer]:
              - /url: /admin/reports
              - generic [ref=e308]: →
              - generic [ref=e309]: Báo cáo
      - generic [ref=e310]:
        - heading "Liên hệ" [level=4] [ref=e311]
        - generic [ref=e312]:
          - generic [ref=e313]:
            - generic [ref=e314]: 📍
            - generic [ref=e315]:
              - paragraph [ref=e316]: Địa chỉ
              - paragraph [ref=e317]: 123 Đường ABC, Quận 1, TP.HCM
          - generic [ref=e318]:
            - generic [ref=e319]: 📞
            - generic [ref=e320]:
              - paragraph [ref=e321]: Điện thoại
              - paragraph [ref=e322]:
                - link "+84 123 456 789" [ref=e323] [cursor=pointer]:
                  - /url: tel:+84123456789
          - generic [ref=e324]:
            - generic [ref=e325]: ✉️
            - generic [ref=e326]:
              - paragraph [ref=e327]: Email
              - paragraph [ref=e328]:
                - link "contact@restaurant.com" [ref=e329] [cursor=pointer]:
                  - /url: mailto:contact@restaurant.com
    - generic [ref=e332]:
      - paragraph [ref=e333]:
        - text: © 2026
        - strong [ref=e334]: Restaurant Management System
        - text: . All rights reserved.
      - generic [ref=e335]:
        - link "Chính sách bảo mật" [ref=e336] [cursor=pointer]:
          - /url: /privacy
        - generic [ref=e337]: "|"
        - link "Điều khoản sử dụng" [ref=e338] [cursor=pointer]:
          - /url: /terms
        - generic [ref=e339]: "|"
        - link "Sitemap" [ref=e340] [cursor=pointer]:
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