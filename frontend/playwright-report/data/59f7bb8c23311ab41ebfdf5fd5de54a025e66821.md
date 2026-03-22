# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.js >> Đăng nhập >> Đăng nhập thành công với thông tin hợp lệ
- Location: tests\auth.spec.js:5:3

# Error details

```
Test timeout of 30000ms exceeded.
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
      - link "🍴 Restaurant Management" [ref=e7] [cursor=pointer]:
        - /url: /
        - generic [ref=e9]: 🍴
        - generic [ref=e10]:
          - generic [ref=e11]: Restaurant
          - generic [ref=e12]: Management
      - navigation [ref=e13]:
        - list [ref=e14]:
          - listitem [ref=e15]:
            - link "🏠 Trang chủ" [ref=e16] [cursor=pointer]:
              - /url: /
              - generic [ref=e17]: 🏠
              - generic [ref=e18]: Trang chủ
          - listitem [ref=e19]:
            - link "📋 Thực đơn ▼" [ref=e20] [cursor=pointer]:
              - /url: /menu
              - generic [ref=e21]: 📋
              - generic [ref=e22]: Thực đơn
              - generic [ref=e23]: ▼
          - listitem [ref=e24]:
            - link "📅 Đặt bàn" [ref=e25] [cursor=pointer]:
              - /url: /reservation
              - generic [ref=e26]: 📅
              - generic [ref=e27]: Đặt bàn
          - listitem [ref=e28]:
            - link "🍽️ Gọi món" [ref=e29] [cursor=pointer]:
              - /url: /tablet
              - generic [ref=e30]: 🍽️
              - generic [ref=e31]: Gọi món
      - link "Đăng nhập" [ref=e34] [cursor=pointer]:
        - /url: /login
    - list [ref=e36]:
      - listitem [ref=e37]:
        - link "🏠 Trang chủ" [ref=e39] [cursor=pointer]:
          - /url: /
          - generic [ref=e40]: 🏠
          - generic [ref=e41]: Trang chủ
      - listitem [ref=e42]:
        - generic [ref=e43]:
          - link "📋 Thực đơn" [ref=e44] [cursor=pointer]:
            - /url: /menu
            - generic [ref=e45]: 📋
            - generic [ref=e46]: Thực đơn
          - button "▼" [ref=e47] [cursor=pointer]:
            - generic [ref=e48]: ▼
        - list [ref=e49]:
          - listitem [ref=e50]:
            - link "Khai vị" [ref=e51] [cursor=pointer]:
              - /url: /menu/appetizers
          - listitem [ref=e52]:
            - link "Món chính" [ref=e53] [cursor=pointer]:
              - /url: /menu/main-dishes
          - listitem [ref=e54]:
            - link "Đồ uống" [ref=e55] [cursor=pointer]:
              - /url: /menu/beverages
          - listitem [ref=e56]:
            - link "Tráng miệng" [ref=e57] [cursor=pointer]:
              - /url: /menu/desserts
      - listitem [ref=e58]:
        - link "📅 Đặt bàn" [ref=e60] [cursor=pointer]:
          - /url: /reservation
          - generic [ref=e61]: 📅
          - generic [ref=e62]: Đặt bàn
      - listitem [ref=e63]:
        - link "🍽️ Gọi món" [ref=e65] [cursor=pointer]:
          - /url: /tablet
          - generic [ref=e66]: 🍽️
          - generic [ref=e67]: Gọi món
  - main [ref=e68]:
    - generic [ref=e69]:
      - generic [ref=e74]:
        - generic [ref=e75]:
          - generic [ref=e76]:
            - generic [ref=e77]: ✨
            - generic [ref=e78]: "Giải pháp quản lý #1 Việt Nam"
          - heading "Hệ thống quản lý nhà hàng thông minh & hiện đại" [level=1] [ref=e79]:
            - text: Hệ thống quản lý
            - generic [ref=e80]: nhà hàng
            - text: thông minh & hiện đại
          - paragraph [ref=e81]: Tối ưu hóa quy trình vận hành, từ đặt món đến thanh toán. Nâng cao trải nghiệm khách hàng và tăng doanh thu cho nhà hàng của bạn.
          - generic [ref=e82]:
            - button "Bắt đầu gọi món (Cần PIN)" [ref=e83]:
              - generic [ref=e84]: Bắt đầu gọi món (Cần PIN)
              - img [ref=e85]
            - link "Xem thực đơn" [ref=e87] [cursor=pointer]:
              - /url: /menu
              - generic [ref=e88]: Xem thực đơn
          - generic [ref=e89]:
            - generic [ref=e90]:
              - generic [ref=e91]: ⭐
              - generic [ref=e92]: 4.9/5 rating
            - generic [ref=e94]:
              - generic [ref=e95]: 👥
              - generic [ref=e96]: 500+ nhà hàng
        - generic [ref=e97]:
          - generic [ref=e103]:
            - generic [ref=e104]:
              - generic [ref=e105]: 🍜
              - generic [ref=e106]:
                - paragraph [ref=e107]: Phở bò đặc biệt
                - paragraph [ref=e108]: Đang nấu...
              - generic [ref=e109]: New
            - generic [ref=e110]:
              - generic [ref=e111]: 🥗
              - generic [ref=e112]:
                - paragraph [ref=e113]: Salad rau củ
                - paragraph [ref=e114]: Hoàn thành
              - generic [ref=e115]: ✓
          - generic [ref=e116]:
            - generic [ref=e117]: 🔔
            - paragraph [ref=e118]: "Bàn #5 gọi thêm món"
      - generic [ref=e120]:
        - generic [ref=e121]:
          - generic [ref=e122]: 📦
          - heading "1000+" [level=3] [ref=e123]
          - paragraph [ref=e124]: Đơn hàng
        - generic [ref=e125]:
          - generic [ref=e126]: 🏪
          - heading "500+" [level=3] [ref=e127]
          - paragraph [ref=e128]: Khách hàng
        - generic [ref=e129]:
          - generic [ref=e130]: ⭐
          - heading "4.9/5" [level=3] [ref=e131]
          - paragraph [ref=e132]: Đánh giá
        - generic [ref=e133]:
          - generic [ref=e134]: 💬
          - heading "24/7" [level=3] [ref=e135]
          - paragraph [ref=e136]: Hỗ trợ
      - generic [ref=e138]:
        - generic [ref=e139]:
          - generic [ref=e140]: Tính năng
          - heading "Mọi thứ bạn cần để quản lý nhà hàng" [level=2] [ref=e141]:
            - text: Mọi thứ bạn cần để
            - generic [ref=e142]: quản lý nhà hàng
          - paragraph [ref=e143]: Giải pháp toàn diện từ A-Z, giúp bạn tập trung vào việc phục vụ khách hàng
        - generic [ref=e144]:
          - link "🍽️ Quản lý thực đơn Dễ dàng cập nhật món ăn, giá cả và hình ảnh với giao diện trực quan" [ref=e145] [cursor=pointer]:
            - /url: /menu
            - generic [ref=e146]: 🍽️
            - heading "Quản lý thực đơn" [level=3] [ref=e147]
            - paragraph [ref=e148]: Dễ dàng cập nhật món ăn, giá cả và hình ảnh với giao diện trực quan
            - img [ref=e150]
          - link "📋 Đặt bàn trực tuyến Khách hàng đặt bàn nhanh chóng, quản lý reservation hiệu quả" [ref=e152] [cursor=pointer]:
            - /url: /reservation
            - generic [ref=e153]: 📋
            - heading "Đặt bàn trực tuyến" [level=3] [ref=e154]
            - paragraph [ref=e155]: Khách hàng đặt bàn nhanh chóng, quản lý reservation hiệu quả
            - img [ref=e157]
          - link "👨‍🍳 Kết nối bếp Đồng bộ đơn hàng realtime từ bàn ăn đến khu vực bếp" [ref=e159] [cursor=pointer]:
            - /url: /admin/dashboard
            - generic [ref=e160]: 👨‍🍳
            - heading "Kết nối bếp" [level=3] [ref=e161]
            - paragraph [ref=e162]: Đồng bộ đơn hàng realtime từ bàn ăn đến khu vực bếp
            - img [ref=e164]
          - link "💳 Thanh toán nhanh Xử lý bill, áp dụng khuyến mãi và in hóa đơn tự động" [ref=e166] [cursor=pointer]:
            - /url: /admin/dashboard
            - generic [ref=e167]: 💳
            - heading "Thanh toán nhanh" [level=3] [ref=e168]
            - paragraph [ref=e169]: Xử lý bill, áp dụng khuyến mãi và in hóa đơn tự động
            - img [ref=e171]
          - link "📊 Báo cáo chi tiết Thống kê doanh thu, món bán chạy theo ngày/tháng/năm" [ref=e173] [cursor=pointer]:
            - /url: /admin/dashboard
            - generic [ref=e174]: 📊
            - heading "Báo cáo chi tiết" [level=3] [ref=e175]
            - paragraph [ref=e176]: Thống kê doanh thu, món bán chạy theo ngày/tháng/năm
            - img [ref=e178]
          - link "👥 Quản lý nhân sự Phân quyền, theo dõi hiệu suất làm việc của từng nhân viên" [ref=e180] [cursor=pointer]:
            - /url: /admin/dashboard
            - generic [ref=e181]: 👥
            - heading "Quản lý nhân sự" [level=3] [ref=e182]
            - paragraph [ref=e183]: Phân quyền, theo dõi hiệu suất làm việc của từng nhân viên
            - img [ref=e185]
      - generic [ref=e188]:
        - generic [ref=e189]:
          - generic [ref=e190]: Quy trình
          - heading "Từ đặt món đến thanh toán" [level=2] [ref=e191]:
            - text: Từ đặt món đến
            - generic [ref=e192]: thanh toán
          - paragraph [ref=e193]: 4 bước đơn giản, tối ưu hóa trải nghiệm cho cả khách hàng và nhân viên
        - generic [ref=e194]:
          - generic [ref=e195]:
            - generic [ref=e196]: "01"
            - generic [ref=e197]:
              - generic [ref=e198]: 📱
              - heading "Khách đặt món" [level=3] [ref=e199]
              - paragraph [ref=e200]: Quét QR hoặc gọi nhân viên để đặt món từ thực đơn điện tử
            - img [ref=e202]
          - generic [ref=e204]:
            - generic [ref=e205]: "02"
            - generic [ref=e206]:
              - generic [ref=e207]: 🔔
              - heading "Bếp tiếp nhận" [level=3] [ref=e208]
              - paragraph [ref=e209]: Đầu bếp nhận order tự động và cập nhật trạng thái món ăn
            - img [ref=e211]
          - generic [ref=e213]:
            - generic [ref=e214]: "03"
            - generic [ref=e215]:
              - generic [ref=e216]: 🍜
              - heading "Phục vụ món" [level=3] [ref=e217]
              - paragraph [ref=e218]: Nhân viên mang món ra bàn khi bếp hoàn thành chế biến
            - img [ref=e220]
          - generic [ref=e222]:
            - generic [ref=e223]: "04"
            - generic [ref=e224]:
              - generic [ref=e225]: ✅
              - heading "Thanh toán" [level=3] [ref=e226]
              - paragraph [ref=e227]: Thu ngân xử lý bill, áp dụng giảm giá và in hóa đơn
      - generic [ref=e230]:
        - heading "Sẵn sàng nâng cấp nhà hàng của bạn?" [level=2] [ref=e231]:
          - text: Sẵn sàng nâng cấp
          - generic [ref=e232]: nhà hàng của bạn?
        - paragraph [ref=e233]: Hàng trăm nhà hàng đã tin tưởng và sử dụng hệ thống của chúng tôi. Bắt đầu ngay hôm nay!
        - generic [ref=e234]:
          - link "Trải nghiệm ngay" [ref=e235] [cursor=pointer]:
            - /url: /login
            - generic [ref=e236]: Trải nghiệm ngay
            - img [ref=e237]
          - link "Tìm hiểu thêm" [ref=e239] [cursor=pointer]:
            - /url: /menu
            - generic [ref=e240]: Tìm hiểu thêm
  - contentinfo [ref=e244]:
    - generic [ref=e247]:
      - generic [ref=e248]:
        - generic [ref=e249]:
          - generic [ref=e251]: 🍴
          - generic [ref=e252]:
            - heading "Restaurant" [level=3] [ref=e253]
            - paragraph [ref=e254]: Management System
        - paragraph [ref=e255]: Hệ thống quản lý nhà hàng chuyên nghiệp, giúp tối ưu hóa quy trình vận hành và nâng cao trải nghiệm khách hàng.
        - generic [ref=e256]:
          - link "Facebook" [ref=e257] [cursor=pointer]:
            - /url: "#"
          - link "Instagram" [ref=e258] [cursor=pointer]:
            - /url: "#"
          - link "Twitter" [ref=e259] [cursor=pointer]:
            - /url: "#"
          - link "YouTube" [ref=e260] [cursor=pointer]:
            - /url: "#"
      - generic [ref=e261]:
        - heading "Liên kết nhanh" [level=4] [ref=e262]
        - list [ref=e263]:
          - listitem [ref=e264]:
            - link "→ Trang chủ" [ref=e265] [cursor=pointer]:
              - /url: /
              - generic [ref=e266]: →
              - generic [ref=e267]: Trang chủ
          - listitem [ref=e268]:
            - link "→ Thực đơn" [ref=e269] [cursor=pointer]:
              - /url: /menu
              - generic [ref=e270]: →
              - generic [ref=e271]: Thực đơn
          - listitem [ref=e272]:
            - link "→ Đặt bàn" [ref=e273] [cursor=pointer]:
              - /url: /reservation
              - generic [ref=e274]: →
              - generic [ref=e275]: Đặt bàn
          - listitem [ref=e276]:
            - link "→ Về chúng tôi" [ref=e277] [cursor=pointer]:
              - /url: /about
              - generic [ref=e278]: →
              - generic [ref=e279]: Về chúng tôi
      - generic [ref=e280]:
        - heading "Quản lý" [level=4] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - link "→ Dashboard" [ref=e284] [cursor=pointer]:
              - /url: /admin/dashboard
              - generic [ref=e285]: →
              - generic [ref=e286]: Dashboard
          - listitem [ref=e287]:
            - link "→ Quản lý đơn hàng" [ref=e288] [cursor=pointer]:
              - /url: /admin/orders
              - generic [ref=e289]: →
              - generic [ref=e290]: Quản lý đơn hàng
          - listitem [ref=e291]:
            - link "→ Quản lý bàn" [ref=e292] [cursor=pointer]:
              - /url: /admin/tables
              - generic [ref=e293]: →
              - generic [ref=e294]: Quản lý bàn
          - listitem [ref=e295]:
            - link "→ Báo cáo" [ref=e296] [cursor=pointer]:
              - /url: /admin/reports
              - generic [ref=e297]: →
              - generic [ref=e298]: Báo cáo
      - generic [ref=e299]:
        - heading "Liên hệ" [level=4] [ref=e300]
        - generic [ref=e301]:
          - generic [ref=e302]:
            - generic [ref=e303]: 📍
            - generic [ref=e304]:
              - paragraph [ref=e305]: Địa chỉ
              - paragraph [ref=e306]: 123 Đường ABC, Quận 1, TP.HCM
          - generic [ref=e307]:
            - generic [ref=e308]: 📞
            - generic [ref=e309]:
              - paragraph [ref=e310]: Điện thoại
              - paragraph [ref=e311]:
                - link "+84 123 456 789" [ref=e312] [cursor=pointer]:
                  - /url: tel:+84123456789
          - generic [ref=e313]:
            - generic [ref=e314]: ✉️
            - generic [ref=e315]:
              - paragraph [ref=e316]: Email
              - paragraph [ref=e317]:
                - link "contact@restaurant.com" [ref=e318] [cursor=pointer]:
                  - /url: mailto:contact@restaurant.com
    - generic [ref=e321]:
      - paragraph [ref=e322]:
        - text: © 2026
        - strong [ref=e323]: Restaurant Management System
        - text: . All rights reserved.
      - generic [ref=e324]:
        - link "Chính sách bảo mật" [ref=e325] [cursor=pointer]:
          - /url: /privacy
        - generic [ref=e326]: "|"
        - link "Điều khoản sử dụng" [ref=e327] [cursor=pointer]:
          - /url: /terms
        - generic [ref=e328]: "|"
        - link "Sitemap" [ref=e329] [cursor=pointer]:
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
> 10 |     await page.fill('input[name="email"]', 'admin@example.com');
     |                ^ Error: page.fill: Test timeout of 30000ms exceeded.
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
  44 |     await page.fill('input[name="name"]', 'Nguyễn Văn A');
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