# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.js >> Đăng nhập >> Đăng ký tài khoản mới
- Location: tests\auth.spec.js:40:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[name="name"]')

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
  - banner [ref=e15]:
    - generic [ref=e16]:
      - link "🍴 Restaurant Management" [ref=e17] [cursor=pointer]:
        - /url: /
        - generic [ref=e19]: 🍴
        - generic [ref=e20]:
          - generic [ref=e21]: Restaurant
          - generic [ref=e22]: Management
      - navigation [ref=e23]:
        - list [ref=e24]:
          - listitem [ref=e25]:
            - link "🏠 Trang chủ" [ref=e26] [cursor=pointer]:
              - /url: /
              - generic [ref=e27]: 🏠
              - generic [ref=e28]: Trang chủ
          - listitem [ref=e29]:
            - link "📋 Thực đơn ▼" [ref=e30] [cursor=pointer]:
              - /url: /menu
              - generic [ref=e31]: 📋
              - generic [ref=e32]: Thực đơn
              - generic [ref=e33]: ▼
          - listitem [ref=e34]:
            - link "📅 Đặt bàn" [ref=e35] [cursor=pointer]:
              - /url: /reservation
              - generic [ref=e36]: 📅
              - generic [ref=e37]: Đặt bàn
          - listitem [ref=e38]:
            - link "🍽️ Gọi món" [ref=e39] [cursor=pointer]:
              - /url: /tablet
              - generic [ref=e40]: 🍽️
              - generic [ref=e41]: Gọi món
      - link "Đăng nhập" [ref=e44] [cursor=pointer]:
        - /url: /login
    - list [ref=e46]:
      - listitem [ref=e47]:
        - link "🏠 Trang chủ" [ref=e49] [cursor=pointer]:
          - /url: /
          - generic [ref=e50]: 🏠
          - generic [ref=e51]: Trang chủ
      - listitem [ref=e52]:
        - generic [ref=e53]:
          - link "📋 Thực đơn" [ref=e54] [cursor=pointer]:
            - /url: /menu
            - generic [ref=e55]: 📋
            - generic [ref=e56]: Thực đơn
          - button "▼" [ref=e57] [cursor=pointer]:
            - generic [ref=e58]: ▼
        - list [ref=e59]:
          - listitem [ref=e60]:
            - link "Khai vị" [ref=e61] [cursor=pointer]:
              - /url: /menu/appetizers
          - listitem [ref=e62]:
            - link "Món chính" [ref=e63] [cursor=pointer]:
              - /url: /menu/main-dishes
          - listitem [ref=e64]:
            - link "Đồ uống" [ref=e65] [cursor=pointer]:
              - /url: /menu/beverages
          - listitem [ref=e66]:
            - link "Tráng miệng" [ref=e67] [cursor=pointer]:
              - /url: /menu/desserts
      - listitem [ref=e68]:
        - link "📅 Đặt bàn" [ref=e70] [cursor=pointer]:
          - /url: /reservation
          - generic [ref=e71]: 📅
          - generic [ref=e72]: Đặt bàn
      - listitem [ref=e73]:
        - link "🍽️ Gọi món" [ref=e75] [cursor=pointer]:
          - /url: /tablet
          - generic [ref=e76]: 🍽️
          - generic [ref=e77]: Gọi món
  - main [ref=e78]:
    - generic [ref=e79]:
      - generic [ref=e84]:
        - generic [ref=e85]:
          - generic [ref=e86]:
            - generic [ref=e87]: ✨
            - generic [ref=e88]: "Giải pháp quản lý #1 Việt Nam"
          - heading "Hệ thống quản lý nhà hàng thông minh & hiện đại" [level=1] [ref=e89]:
            - text: Hệ thống quản lý
            - generic [ref=e90]: nhà hàng
            - text: thông minh & hiện đại
          - paragraph [ref=e91]: Tối ưu hóa quy trình vận hành, từ đặt món đến thanh toán. Nâng cao trải nghiệm khách hàng và tăng doanh thu cho nhà hàng của bạn.
          - generic [ref=e92]:
            - button "Bắt đầu gọi món (Cần PIN)" [ref=e93]:
              - generic [ref=e94]: Bắt đầu gọi món (Cần PIN)
              - img [ref=e95]
            - link "Xem thực đơn" [ref=e97] [cursor=pointer]:
              - /url: /menu
              - generic [ref=e98]: Xem thực đơn
          - generic [ref=e99]:
            - generic [ref=e100]:
              - generic [ref=e101]: ⭐
              - generic [ref=e102]: 4.9/5 rating
            - generic [ref=e104]:
              - generic [ref=e105]: 👥
              - generic [ref=e106]: 500+ nhà hàng
        - generic [ref=e107]:
          - generic [ref=e113]:
            - generic [ref=e114]:
              - generic [ref=e115]: 🍜
              - generic [ref=e116]:
                - paragraph [ref=e117]: Phở bò đặc biệt
                - paragraph [ref=e118]: Đang nấu...
              - generic [ref=e119]: New
            - generic [ref=e120]:
              - generic [ref=e121]: 🥗
              - generic [ref=e122]:
                - paragraph [ref=e123]: Salad rau củ
                - paragraph [ref=e124]: Hoàn thành
              - generic [ref=e125]: ✓
          - generic [ref=e126]:
            - generic [ref=e127]: 🔔
            - paragraph [ref=e128]: "Bàn #5 gọi thêm món"
      - generic [ref=e130]:
        - generic [ref=e131]:
          - generic [ref=e132]: 📦
          - heading "1000+" [level=3] [ref=e133]
          - paragraph [ref=e134]: Đơn hàng
        - generic [ref=e135]:
          - generic [ref=e136]: 🏪
          - heading "500+" [level=3] [ref=e137]
          - paragraph [ref=e138]: Khách hàng
        - generic [ref=e139]:
          - generic [ref=e140]: ⭐
          - heading "4.9/5" [level=3] [ref=e141]
          - paragraph [ref=e142]: Đánh giá
        - generic [ref=e143]:
          - generic [ref=e144]: 💬
          - heading "24/7" [level=3] [ref=e145]
          - paragraph [ref=e146]: Hỗ trợ
      - generic [ref=e148]:
        - generic [ref=e149]:
          - generic [ref=e150]: Tính năng
          - heading "Mọi thứ bạn cần để quản lý nhà hàng" [level=2] [ref=e151]:
            - text: Mọi thứ bạn cần để
            - generic [ref=e152]: quản lý nhà hàng
          - paragraph [ref=e153]: Giải pháp toàn diện từ A-Z, giúp bạn tập trung vào việc phục vụ khách hàng
        - generic [ref=e154]:
          - link "🍽️ Quản lý thực đơn Dễ dàng cập nhật món ăn, giá cả và hình ảnh với giao diện trực quan" [ref=e155] [cursor=pointer]:
            - /url: /menu
            - generic [ref=e156]: 🍽️
            - heading "Quản lý thực đơn" [level=3] [ref=e157]
            - paragraph [ref=e158]: Dễ dàng cập nhật món ăn, giá cả và hình ảnh với giao diện trực quan
            - img [ref=e160]
          - link "📋 Đặt bàn trực tuyến Khách hàng đặt bàn nhanh chóng, quản lý reservation hiệu quả" [ref=e162] [cursor=pointer]:
            - /url: /reservation
            - generic [ref=e163]: 📋
            - heading "Đặt bàn trực tuyến" [level=3] [ref=e164]
            - paragraph [ref=e165]: Khách hàng đặt bàn nhanh chóng, quản lý reservation hiệu quả
            - img [ref=e167]
          - link "👨‍🍳 Kết nối bếp Đồng bộ đơn hàng realtime từ bàn ăn đến khu vực bếp" [ref=e169] [cursor=pointer]:
            - /url: /admin/dashboard
            - generic [ref=e170]: 👨‍🍳
            - heading "Kết nối bếp" [level=3] [ref=e171]
            - paragraph [ref=e172]: Đồng bộ đơn hàng realtime từ bàn ăn đến khu vực bếp
            - img [ref=e174]
          - link "💳 Thanh toán nhanh Xử lý bill, áp dụng khuyến mãi và in hóa đơn tự động" [ref=e176] [cursor=pointer]:
            - /url: /admin/dashboard
            - generic [ref=e177]: 💳
            - heading "Thanh toán nhanh" [level=3] [ref=e178]
            - paragraph [ref=e179]: Xử lý bill, áp dụng khuyến mãi và in hóa đơn tự động
            - img [ref=e181]
          - link "📊 Báo cáo chi tiết Thống kê doanh thu, món bán chạy theo ngày/tháng/năm" [ref=e183] [cursor=pointer]:
            - /url: /admin/dashboard
            - generic [ref=e184]: 📊
            - heading "Báo cáo chi tiết" [level=3] [ref=e185]
            - paragraph [ref=e186]: Thống kê doanh thu, món bán chạy theo ngày/tháng/năm
            - img [ref=e188]
          - link "👥 Quản lý nhân sự Phân quyền, theo dõi hiệu suất làm việc của từng nhân viên" [ref=e190] [cursor=pointer]:
            - /url: /admin/dashboard
            - generic [ref=e191]: 👥
            - heading "Quản lý nhân sự" [level=3] [ref=e192]
            - paragraph [ref=e193]: Phân quyền, theo dõi hiệu suất làm việc của từng nhân viên
            - img [ref=e195]
      - generic [ref=e198]:
        - generic [ref=e199]:
          - generic [ref=e200]: Quy trình
          - heading "Từ đặt món đến thanh toán" [level=2] [ref=e201]:
            - text: Từ đặt món đến
            - generic [ref=e202]: thanh toán
          - paragraph [ref=e203]: 4 bước đơn giản, tối ưu hóa trải nghiệm cho cả khách hàng và nhân viên
        - generic [ref=e204]:
          - generic [ref=e205]:
            - generic [ref=e206]: "01"
            - generic [ref=e207]:
              - generic [ref=e208]: 📱
              - heading "Khách đặt món" [level=3] [ref=e209]
              - paragraph [ref=e210]: Quét QR hoặc gọi nhân viên để đặt món từ thực đơn điện tử
            - img [ref=e212]
          - generic [ref=e214]:
            - generic [ref=e215]: "02"
            - generic [ref=e216]:
              - generic [ref=e217]: 🔔
              - heading "Bếp tiếp nhận" [level=3] [ref=e218]
              - paragraph [ref=e219]: Đầu bếp nhận order tự động và cập nhật trạng thái món ăn
            - img [ref=e221]
          - generic [ref=e223]:
            - generic [ref=e224]: "03"
            - generic [ref=e225]:
              - generic [ref=e226]: 🍜
              - heading "Phục vụ món" [level=3] [ref=e227]
              - paragraph [ref=e228]: Nhân viên mang món ra bàn khi bếp hoàn thành chế biến
            - img [ref=e230]
          - generic [ref=e232]:
            - generic [ref=e233]: "04"
            - generic [ref=e234]:
              - generic [ref=e235]: ✅
              - heading "Thanh toán" [level=3] [ref=e236]
              - paragraph [ref=e237]: Thu ngân xử lý bill, áp dụng giảm giá và in hóa đơn
      - generic [ref=e240]:
        - heading "Sẵn sàng nâng cấp nhà hàng của bạn?" [level=2] [ref=e241]:
          - text: Sẵn sàng nâng cấp
          - generic [ref=e242]: nhà hàng của bạn?
        - paragraph [ref=e243]: Hàng trăm nhà hàng đã tin tưởng và sử dụng hệ thống của chúng tôi. Bắt đầu ngay hôm nay!
        - generic [ref=e244]:
          - link "Trải nghiệm ngay" [ref=e245] [cursor=pointer]:
            - /url: /login
            - generic [ref=e246]: Trải nghiệm ngay
            - img [ref=e247]
          - link "Tìm hiểu thêm" [ref=e249] [cursor=pointer]:
            - /url: /menu
            - generic [ref=e250]: Tìm hiểu thêm
  - contentinfo [ref=e254]:
    - generic [ref=e257]:
      - generic [ref=e258]:
        - generic [ref=e259]:
          - generic [ref=e261]: 🍴
          - generic [ref=e262]:
            - heading "Restaurant" [level=3] [ref=e263]
            - paragraph [ref=e264]: Management System
        - paragraph [ref=e265]: Hệ thống quản lý nhà hàng chuyên nghiệp, giúp tối ưu hóa quy trình vận hành và nâng cao trải nghiệm khách hàng.
        - generic [ref=e266]:
          - link "Facebook" [ref=e267] [cursor=pointer]:
            - /url: "#"
          - link "Instagram" [ref=e268] [cursor=pointer]:
            - /url: "#"
          - link "Twitter" [ref=e269] [cursor=pointer]:
            - /url: "#"
          - link "YouTube" [ref=e270] [cursor=pointer]:
            - /url: "#"
      - generic [ref=e271]:
        - heading "Liên kết nhanh" [level=4] [ref=e272]
        - list [ref=e273]:
          - listitem [ref=e274]:
            - link "→ Trang chủ" [ref=e275] [cursor=pointer]:
              - /url: /
              - generic [ref=e276]: →
              - generic [ref=e277]: Trang chủ
          - listitem [ref=e278]:
            - link "→ Thực đơn" [ref=e279] [cursor=pointer]:
              - /url: /menu
              - generic [ref=e280]: →
              - generic [ref=e281]: Thực đơn
          - listitem [ref=e282]:
            - link "→ Đặt bàn" [ref=e283] [cursor=pointer]:
              - /url: /reservation
              - generic [ref=e284]: →
              - generic [ref=e285]: Đặt bàn
          - listitem [ref=e286]:
            - link "→ Về chúng tôi" [ref=e287] [cursor=pointer]:
              - /url: /about
              - generic [ref=e288]: →
              - generic [ref=e289]: Về chúng tôi
      - generic [ref=e290]:
        - heading "Quản lý" [level=4] [ref=e291]
        - list [ref=e292]:
          - listitem [ref=e293]:
            - link "→ Dashboard" [ref=e294] [cursor=pointer]:
              - /url: /admin/dashboard
              - generic [ref=e295]: →
              - generic [ref=e296]: Dashboard
          - listitem [ref=e297]:
            - link "→ Quản lý đơn hàng" [ref=e298] [cursor=pointer]:
              - /url: /admin/orders
              - generic [ref=e299]: →
              - generic [ref=e300]: Quản lý đơn hàng
          - listitem [ref=e301]:
            - link "→ Quản lý bàn" [ref=e302] [cursor=pointer]:
              - /url: /admin/tables
              - generic [ref=e303]: →
              - generic [ref=e304]: Quản lý bàn
          - listitem [ref=e305]:
            - link "→ Báo cáo" [ref=e306] [cursor=pointer]:
              - /url: /admin/reports
              - generic [ref=e307]: →
              - generic [ref=e308]: Báo cáo
      - generic [ref=e309]:
        - heading "Liên hệ" [level=4] [ref=e310]
        - generic [ref=e311]:
          - generic [ref=e312]:
            - generic [ref=e313]: 📍
            - generic [ref=e314]:
              - paragraph [ref=e315]: Địa chỉ
              - paragraph [ref=e316]: 123 Đường ABC, Quận 1, TP.HCM
          - generic [ref=e317]:
            - generic [ref=e318]: 📞
            - generic [ref=e319]:
              - paragraph [ref=e320]: Điện thoại
              - paragraph [ref=e321]:
                - link "+84 123 456 789" [ref=e322] [cursor=pointer]:
                  - /url: tel:+84123456789
          - generic [ref=e323]:
            - generic [ref=e324]: ✉️
            - generic [ref=e325]:
              - paragraph [ref=e326]: Email
              - paragraph [ref=e327]:
                - link "contact@restaurant.com" [ref=e328] [cursor=pointer]:
                  - /url: mailto:contact@restaurant.com
    - generic [ref=e331]:
      - paragraph [ref=e332]:
        - text: © 2026
        - strong [ref=e333]: Restaurant Management System
        - text: . All rights reserved.
      - generic [ref=e334]:
        - link "Chính sách bảo mật" [ref=e335] [cursor=pointer]:
          - /url: /privacy
        - generic [ref=e336]: "|"
        - link "Điều khoản sử dụng" [ref=e337] [cursor=pointer]:
          - /url: /terms
        - generic [ref=e338]: "|"
        - link "Sitemap" [ref=e339] [cursor=pointer]:
          - /url: /sitemap
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // Kịch bản test: Đăng nhập
  4  | test.describe('Đăng nhập', () => {
  5  |   test('Đăng nhập thành công với thông tin hợp lệ', async ({ page }) => {
  6  |     // Điều hướng đến trang đăng nhập
  7  |     await page.goto('/auth/login');
  8  | 
  9  |     // Điền thông tin đăng nhập
  10 |     await page.fill('input[name="email"]', 'admin@example.com');
  11 |     await page.fill('input[name="password"]', 'password123');
  12 | 
  13 |     // Click nút đăng nhập
  14 |     await page.click('button[type="submit"]');
  15 | 
  16 |     // Kiểm tra chuyển hướng đến dashboard
  17 |     await expect(page).toHaveURL(/.*admin/);
  18 | 
  19 |     // Kiểm tra hiển thị dashboard
  20 |     await expect(page.locator('text=Dashboard')).toBeVisible();
  21 |   });
  22 | 
  23 |   test('Đăng nhập thất bại với thông tin sai', async ({ page }) => {
  24 |     await page.goto('/auth/login');
  25 | 
  26 |     // Điền thông tin sai
  27 |     await page.fill('input[name="email"]', 'wrong@example.com');
  28 |     await page.fill('input[name="password"]', 'wrongpassword');
  29 | 
  30 |     // Click nút đăng nhập
  31 |     await page.click('button[type="submit"]');
  32 | 
  33 |     // Kiểm tra thông báo lỗi
  34 |     await expect(page.locator('text=Sai thông tin đăng nhập')).toBeVisible();
  35 | 
  36 |     // Kiểm tra vẫn ở trang đăng nhập
  37 |     await expect(page).toHaveURL(/.*login/);
  38 |   });
  39 | 
  40 |   test('Đăng ký tài khoản mới', async ({ page }) => {
  41 |     await page.goto('/auth/register');
  42 | 
  43 |     // Điền thông tin đăng ký
> 44 |     await page.fill('input[name="name"]', 'Nguyễn Văn A');
     |                ^ Error: page.fill: Test timeout of 30000ms exceeded.
  45 |     await page.fill('input[name="email"]', 'nguyenvana@example.com');
  46 |     await page.fill('input[name="password"]', 'password123');
  47 |     await page.fill('input[name="confirmPassword"]', 'password123');
  48 | 
  49 |     // Click nút đăng ký
  50 |     await page.click('button[type="submit"]');
  51 | 
  52 |     // Kiểm tra chuyển hướng hoặc thông báo thành công
  53 |     await expect(page.locator('text=Đăng ký thành công')).toBeVisible();
  54 |   });
  55 | });
```