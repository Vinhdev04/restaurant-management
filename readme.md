🍽️ Restaurant Management System (RMS)

Hệ thống số hóa quy trình vận hành nhà hàng toàn diện, kết nối trực tiếp trải nghiệm đặt món của Khách hàng với khu vực Bếp và quầy Thu ngân.



📌 Tổng quan dự án

Dự án được xây dựng nhằm tối ưu hóa việc quản lý không gian bàn ăn, giảm thiểu sai sót trong quá trình order và tăng tốc độ phục vụ thông qua hệ thống thông báo thời gian thực (Real-time).



🛠 Công nghệ sử dụng

Frontend: ReactJS, Tailwind CSS, Redux Toolkit (hoặc Zustand), Socket.io-client.



Backend: NodeJS (Express), Socket.io, JWT Authentication.



Database: MongoDB (Mongoose) hoặc PostgreSQL.



Công cụ hỗ trợ: Postman, Docker (tùy chọn), Git.

👥 Phân tích Actor \& Chức năng chính

1\. Admin (Quản trị viên)

Quản lý Thực đơn: Thêm/Sửa/Xóa món ăn, phân loại (Khai vị, Món chính, Đồ uống).



Quản lý Nhân sự: Cấp phát tài khoản và phân quyền cho Đầu bếp, Nhân viên.



Sơ đồ Nhà hàng: Khởi tạo danh sách bàn, khu vực (VIP, Tầng 1, Tầng 2).



Báo cáo: Thống kê doanh thu và món ăn bán chạy theo thời gian.



2\. Đầu bếp (Chef)

Tiếp nhận Order: Nhận danh sách món ăn thời gian thực từ khách hàng.



Quản lý trạng thái: Cập nhật món (Đang nấu -> Hoàn thành).



Sold Out: Đánh dấu món ăn đã hết hàng để hệ thống tự động khóa phía Khách hàng.



3\. Nhân viên quản lý (Staff)

Điều phối bàn: Mở bàn, Chuyển bàn, Ghép bàn khi khách có nhu cầu.



Đặt bàn (Reservation): Ghi nhận thông tin khách và khóa trạng thái bàn.



Thanh toán: Áp dụng mã giảm giá, chốt bill và in hóa đơn.



4\. Khách hàng (Customer)

Đặt món (E-Menu): Xem thực đơn qua QR Code, ghi chú món ăn.



Theo dõi Real-time: Xem trạng thái món ăn của mình (Đang chờ -> Đang nấu -> Hoàn thành).



🔄 Luồng quy trình nghiệp vụ (Business Flow)

Khởi tạo: Nhân viên mở bàn hoặc Khách quét QR Code tại bàn.



Order: Khách chọn món (Hệ thống chặn các món đã Sold Out).



Chế biến: Order đẩy xuống Bếp qua Socket.io. Đầu bếp tiếp nhận và cập nhật trạng thái.



Phục vụ: Nhân viên nhận thông báo món "Hoàn thành" để mang ra bàn.



Kết thúc: Nhân viên thực hiện thanh toán, hệ thống giải phóng bàn về trạng thái "Trống".



🚀 Hướng dẫn cài đặt

Yêu cầu hệ thống

Node.js >= 16.x



MongoDB hoặc SQL Server tương ứng



Các bước thực hiện

Clone project:



Bash

git clone https://github.com/your-username/restaurant-management.git

Cài đặt Backend:



Bash

cd backend

npm install

npm start

Cài đặt Frontend:



Bash

cd frontend

npm install

npm start

📝 Liên hệ

Project Manager: \[Tên của bạn]



Email: \[Email của bạn]



Tài liệu: Xem chi tiết tại TÀI LIỆU NGHIỆP VỤ.docx kèm theo.

