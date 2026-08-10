# Quốc Anh Đào Tạo Lái Xe

Website Vite + React có máy chủ Node production dành cho Render và API trung gian ghi đăng ký vào Google Sheets.

## Chạy và kiểm tra

```bash
npm ci
npm run build
npm start
```

Mặc định máy chủ chạy tại `http://localhost:10000` hoặc cổng trong biến `PORT`.

Khi cần thử form với Apps Script trên máy cá nhân, sao chép `.env.server.example` thành `.env.server`, điền URL `/exec` và khóa bí mật. File `.env.server` đã được bỏ khỏi Git để không lộ cấu hình tiếp nhận đăng ký.

- `GET /api/health`: trạng thái máy chủ và cấu hình Google Apps Script.
- `POST /api/registrations`: kiểm tra dữ liệu, chuyển tiếp tới Apps Script và chỉ báo thành công khi Sheet xác nhận.
- Các đường dẫn SPA như `/dang-ky`, `/khoa-hoc/A1` được trả về đúng `index.html`.

## Deploy Render Web Service

Lỗi `error Command "start" not found` đã được xử lý bằng script `npm start` và `server.mjs`.

Với Web Service đang có trên Render, cấu hình:

```text
Build Command:  npm ci && npm run build
Start Command:  npm start
Health Check:   /api/health
```

Thêm biến môi trường bí mật:

```text
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
GOOGLE_SCRIPT_SECRET=chuoi-ngau-nhien-dai-va-kho-doan
```

Sau đó chọn **Manual Deploy → Clear build cache & deploy**. Dự án cũng có [render.yaml](./render.yaml) để tạo Blueprint mới nếu cần.

Trong Apps Script, đặt Script Property `INGEST_SECRET` đúng bằng `GOOGLE_SCRIPT_SECRET`. Không dùng URL Apps Script kết thúc bằng `/dev`. Không đặt URL này trong biến `VITE_*`, vì URL nhận dữ liệu phải nằm ở phía máy chủ.

## Google Sheets

Sao chép [google-apps-script/Code.gs](./google-apps-script/Code.gs) vào Apps Script của Google Sheet, deploy dưới dạng Web App (`Execute as: Me`, `Who has access: Anyone`) rồi dùng URL `/exec` cho biến `GOOGLE_SCRIPT_URL` trên Render.

Mỗi đăng ký tạo một hàng ngang gồm mã đăng ký, thời gian máy chủ, họ tên, số điện thoại, năm sinh, hạng học, lịch mong muốn, khu vực, kênh liên hệ, ghi chú, nguồn, trang gửi, UTM, referrer và trạng thái. Script giữ số `0` đầu SĐT, chống ghi trùng, chống công thức độc hại và gửi thông báo tới:

- `quang09minh02@gmail.com`
- `hoclaixequocanh@gmail.com`

Nguồn quảng cáo (`utm_*`, `ttclid`, `fbclid`, `gclid`) được giữ xuyên suốt khi học viên chuyển trang trong website.

Hướng dẫn từng bước nằm tại [google-apps-script/README.md](./google-apps-script/README.md).

## Biến môi trường tùy chọn

Frontend mặc định gọi API cùng tên miền `/api/registrations`. Chỉ dùng biến dưới đây khi có một API đăng ký khác:

```text
VITE_REGISTRATION_API_URL=https://api.example.com/api/registrations
```

Khi dùng API khác miền, API đó phải tự cấu hình CORS phù hợp.
