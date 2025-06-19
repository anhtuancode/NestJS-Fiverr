# NestJs Fiverr

> Tác giả: **Nguyễn Anh Tuấn**
> 
> 🛠️ Dự án: NestJs Fiverr - Nền tảng thuê dịch vụ trực tuyến

---

## 🚀 Giới thiệu
NestJs Fiverr là một dự án backend mô phỏng nền tảng thuê dịch vụ trực tuyến tương tự Fiverr, được xây dựng bằng NestJS. Dự án tập trung vào việc quản lý người dùng, công việc, phân loại, thuê dịch vụ, đánh giá, và phân quyền truy cập API theo vai trò (admin/user).

---

## 🧩 Tính năng cơ bản

✅ Đăng ký / Đăng nhập / Xác thực JWT
✅ Quản lý người dùng (Admin hoặc Người dùng)
✅ CRUD công việc (thêm, sửa, xoá, tìm kiếm, phân trang)
✅ Phân loại công việc theo Loại và Chi tiết loại
✅ Thuê công việc và quản lý lịch sử thuê
✅ Bình luận và đánh giá công việc
✅ Tìm kiếm công việc theo từ khoá, loại công việc
✅ Phân quyền API theo vai trò (Admin/User)
✅ Swagger UI cho API docs

---

## ⚙️ Kiến trúc hệ thống
Dự án được xây dựng theo mô hình monolithic NestJS gồm các module:

| Thành phần             | Vai trò                                                     |
|------------------------|-------------------------------------------------------------|
| Auth                   | Xác thực, phân quyền người dùng, xử lý JWT                  |
| binhLuan               | Quản lý thông tin người dùng, phân quyền (admin / user)     |
| ChiTietLoaiCongViec    | CRUD công việc, upload ảnh mô tả công việc                  |
| CongViec               | Quản lý loại công việc chính                                |
| LoaiCongViec           | Quản lý chi tiết loại công việc, liên kết với LoaiCongViec  |
| ThueCongViec           | Xử lý việc thuê công việc, theo dõi lịch sử thuê            |
| Token                  | Quản lý bình luận, đánh giá của người dùng cho công việc    |
| Users                  | Tái tạo, kiểm tra và thu hồi JWT token|
| Skill                  | Quản lý kỹ năng người dùng, gợi ý kỹ năng khi tạo công việc |

---

## 🛠️ Các kỹ năng rèn luyện

### 📌 Backend & DevOps
- Thiết kế RESTful API với NestJS
- Authentication & Authorization với JWT
- Phân quyền middleware với decorator và guard
- Sử dụng Prisma ORM để truy vấn cơ sở dữ liệu
- Upload hình ảnh với Cloudinary
- Bảo vệ API bằng validation, exception filter

## 🧩 Cơ sở dữ liệu
Thiết kế quan hệ dữ liệu:
- NguoiDung - người dùng
- CongViec - dịch vụ
- LoaiCongViec, ChiTietLoaiCongViec - phân loại
- ThueCongViec - lịch sử thuê dịch vụ
- BinhLuan - đánh giá, phản hồi

🧪 Dev Tools
Tài liệu API với Swagger


---

## 🧪 Hướng dẫn cài đặt & chạy dự án

---

### 1. Clone dự án & cài đặt yêu cầu

Yêu cầu:
- Node.js >= 16
- Docker (Cài image Mysql)

```
git clone https://github.com/anhtuancode/nestjs-fiverr.git
cd nestjs-fiverr
npm install
```

---

### 2. Cấu hình môi trường .env
Tạo file .env:

```
PORT=""
DATABASE_URL=""
ACCESS_TOKEN_SECRET=""
ACCESS_TOKEN_EXPIRES=""
REFRESH_TOKEN_SECRET=""
REFRESH_TOKEN_EXPIRES="7d"
CLOUD_NAME=""
CLOUD_API_KEY=""
CLOUD_API_SECRET=""
```

---

### 3. Chạy server NestJS

```bash
npm run start:dev
```

- Server sẽ chạy ở `http://localhost:3069`

```

### 4. Swagger API Docs

http://localhost:3069/swagger

Tại đây bạn có thể thử:
- Đăng ký tài khoản
- Đăng nhập và lấy token
- Thêm công việc (qua token Admin)
- Thuê công việc
- Thêm bình luận, đánh giá...

```
### 📌 5. Hướng phát triển tiếp theo trong tương lai
- Xây dựng frontend với Reactjs
- Xây dựng crobJob để server đỡ nặng 
- Hệ thống thanh toán (mô phỏng)
- Realtime notification (socket.io)
- Quản lý giao dịch giữa client và freelancer

---

###  📞 Liên hệ
Github: anhtuancode
Email: nguyenanhtuan.forwork@gmail.com


✅ Sau khi hoàn tất, bạn đã có thể sử dụng một nền tảng backend hoàn chỉnh cho ứng dụng Fiverr clone, dễ dàng tích hợp với frontend và sẵn sàng mở rộng để triển khai thực tế!

