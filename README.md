# Văn Phòng Học Lái Xe Linh Xuân

Website của Văn Phòng Học Lái Xe Linh Xuân, xây dựng bằng Vite, React và TypeScript, có máy chủ Node production để triển khai trên Render. Bộ nhận diện xanh dương–trắng dùng logo văn phòng được cung cấp tại `public/logo-linh-xuan.png`. Văn phòng hỗ trợ tư vấn khóa học, chuẩn bị hồ sơ và kết nối với Quốc Anh.

Giao diện giới thiệu các khóa A, A1, B số sàn, B tự động và C1, học phí tham khảo, lộ trình học, dịch vụ tư vấn, thư viện ảnh hoạt động đào tạo và thông tin văn phòng. Khung ảnh xe dùng `object-fit: contain` để giữ trọn phương tiện. Website không dùng form tư vấn; học viên kết nối trực tiếp qua điện thoại, Zalo hoặc Messenger. Các tài khoản Facebook và TikTok Quốc Anh đang sử dụng được giữ đúng.

Mỗi hạng có trang riêng với thông tin phương tiện, đối tượng phù hợp, nội dung học, lộ trình, hướng dẫn hồ sơ, học phí tham khảo và câu hỏi thường gặp. Nội dung riêng được quản lý tại [src/data/courseDetails.ts](./src/data/courseDetails.ts). Thông tin cần xác nhận theo đợt học được trao đổi trực tiếp với văn phòng; website không đưa ra cam kết về kết quả sát hạch.

Khung **Chat với admin** cho phép chọn kênh để trò chuyện 1:1 qua Zalo hoặc Messenger. Cuộc hội thoại diễn ra trên ứng dụng/nền tảng đã chọn; website không tạo tin nhắn giả, không tự báo admin đang online và không cần lưu thông tin cá nhân của học viên.

## Bố cục trang chủ

Trang chủ dùng bố cục xanh dương–trắng theo mẫu tham chiếu: header gọn với hotline, khu vực giới thiệu cùng ảnh giáo viên, 5 thẻ khóa học, khối học phí, lộ trình học & thi 6 bước, dịch vụ hỗ trợ, ảnh đào tạo thực tế, video TikTok, liên hệ kèm bản đồ, câu hỏi thường gặp và footer đầy đủ. Menu **Quy trình thi** và **Học phí** dẫn đến đúng mục trên trang; các trang chi tiết từng hạng vẫn được giữ.

Logo, toàn bộ ảnh/video hiện có và giá khóa học được giữ nguyên từ `public/logo-linh-xuan.png`, `src/anh` và [src/data/courses.ts](./src/data/courses.ts). Khu vực liên hệ dùng nút gọi điện, Zalo và Messenger thay cho form điền thông tin. Giao diện mới nằm tại [src/pages/HomePage.tsx](./src/pages/HomePage.tsx), [src/components/HomeCourseShowcase.tsx](./src/components/HomeCourseShowcase.tsx), [src/styles/reference-home.css](./src/styles/reference-home.css), [src/styles/reference-chrome.css](./src/styles/reference-chrome.css) và [src/styles/home-course-showcase.css](./src/styles/home-course-showcase.css).

## Cấu hình liên hệ

Thông tin liên hệ dùng chung được tập trung tại [src/data/contact.ts](./src/data/contact.ts). Khi đổi số điện thoại hoặc tài khoản mạng xã hội, sửa cấu hình này để đồng bộ các nút liên hệ, chân trang và khung chat.

- Điện thoại và Zalo: **0879 227 614**.
- Địa chỉ: **Đường Số 1, Khu Phố 4, Phường Linh Xuân, Thủ Đức, Thành Phố Hồ Chí Minh**.
- Vị trí và chỉ đường: [Đúng điểm văn phòng trên Google Maps](https://maps.app.goo.gl/bf62B1T8RFGcrDyYA). Bản đồ nhúng dùng tọa độ ghim `10.870442, 106.765795` từ liên kết này; địa chỉ hiển thị được lưu riêng để không thay đổi tên địa chỉ.
- Facebook: [Quốc Anh](https://www.facebook.com/quocanh.truong.790693).
- TikTok: [@quoc.anh.dtlx.binhduong](https://www.tiktok.com/@quoc.anh.dtlx.binhduong?is_from_webapp=1&sender_device=pc).
- Email: `hoclaixequocanh@gmail.com`.

Dữ liệu khóa học nằm tại [src/data/courses.ts](./src/data/courses.ts); hình ảnh và video hiện có nằm trong `src/anh`.

## Video TikTok tự cập nhật

[TikTokSocialSection.tsx](./src/components/TikTokSocialSection.tsx) dùng [Creator Profile Embed chính thức của TikTok](https://developers.tiktok.com/docs/en/embed-creator-profiles) để hiển thị các video gần đây từ tài khoản trung tâm. Liên kết mở kênh giữ nguyên URL người dùng cung cấp; mã nhúng dùng `tiktokProfileUrl` và `tiktokUsername` trong cấu hình chung.

Nguồn TikTok chỉ tải khi khu vực video đến gần màn hình, và được làm mới mỗi 5 phút khi khu vực này đang hiển thị, tab hoạt động và người xem không tương tác với iframe. Nút tải lại cho phép làm mới ngay. Nếu TikTok hoặc trình duyệt chặn nội dung nhúng, giao diện cung cấp liên kết mở kênh và thử lại. Website không cần token API, không thu thập hay sao chép video; nội dung hiển thị phụ thuộc TikTok.

Video hướng dẫn A/A1 sẵn có được giữ riêng và dùng `preload="none"` để tránh tải tệp lớn trước khi học viên phát video.

## Điều hướng và vị trí nội dung

Menu và các liên kết nội bộ cuộn một lần đến đúng mục, chừa khoảng cách theo chiều cao header thực tế. Bấm lại cùng mục vẫn đưa người xem về nội dung đó; menu đánh dấu đúng mục theo đường dẫn và hash. Nút Quay lại khôi phục vị trí cuộn và bộ lọc khóa học trong phiên sử dụng.

Khung TikTok giữ lại chiều cao đã hiển thị trong khi tải lại hoặc tải lỗi để tránh đẩy nội dung và làm trang đổi vị trí.

## Chạy trên máy cá nhân

Yêu cầu Node.js 20 trở lên.

Nếu đang mở thư mục `D:\WEBTUYENSINHQUOCANh`, có thể chạy ngay `npm install` và `npm run dev` tại đây. Các lệnh ở thư mục ngoài chuyển tiếp vào dự án `Qu-c-Anh-o-T-o-L-i-Xe`. Trong VS Code, nhấn **F5** để khởi động website và mở Chrome tại địa chỉ đúng.

Website development chạy tại `http://127.0.0.1:5173/`. Nếu bản development của website đang chạy, lệnh `npm run dev` dùng lại địa chỉ đó để tránh tạo một máy chủ thứ hai. Giữ terminal đang chạy máy chủ mở trong lúc dùng website.

```bash
npm ci
npm run dev
```

Vite hiển thị địa chỉ và cổng development trong terminal. Để chạy bản production:

```bash
npm run build
npm start
```

Máy chủ mặc định chạy tại `http://localhost:10000`, hoặc cổng được đặt trong biến `PORT`. Các đường dẫn React được máy chủ trả về qua SPA fallback, nên có thể mở trực tiếp hoặc tải lại trang khóa học và trang liên hệ.

Để kiểm tra máy chủ, SPA fallback, API cũ và phát video theo byte-range sau khi build:

```bash
npm run test:smoke
```

Bài kiểm tra dùng một upstream giả lập trên máy cá nhân, không gửi thông tin thử nghiệm tới Google Sheets thật.

Để kiểm tra giao diện bằng Playwright trên desktop và điện thoại:

```bash
npm run build
npm run test:ui
```

Trên Windows, bài kiểm tra dùng Microsoft Edge đã cài sẵn. Trên các hệ điều hành khác, cài Chromium cho Playwright trước lần chạy đầu tiên:

```bash
npx playwright install chromium
```

Playwright tự khởi động máy chủ production trên cổng `4186`, kiểm tra các trang, bộ lọc, menu điện thoại, khung chat, nhận diện Linh Xuân, địa chỉ, tỉ lệ ảnh xe và hoạt động của TikTok (tải, làm mới, quay lại trang, tải thất bại). Các kiểm tra trang chủ mới xác nhận menu quy trình/học phí đến đúng mục và nút duyệt khóa học chỉ cuộn danh sách ngang. Kiểm tra TikTok sử dụng mô phỏng mã nhúng để kết quả không phụ thuộc mạng bên ngoài. Ảnh xem trước giao diện mới nằm tại `artifacts/reference-home-desktop.png`, `artifacts/reference-home-mobile.png` và các bản toàn trang có hậu tố `-full`; khi kiểm tra thất bại, ảnh và trace lưu trong `test-results`.

## Triển khai Render Web Service

Cấu hình triển khai hiện có được giữ nguyên:

```text
Build Command: npm ci && npm run build
Start Command: npm start
Health Check:  /api/health
```

[render.yaml](./render.yaml) có sẵn để tạo Blueprint. Endpoint `GET /api/health` trả về trạng thái máy chủ; website giới thiệu khóa học và các kênh liên hệ trực tiếp hoạt động mà không phụ thuộc vào cấu hình Google Sheets.

## API Google Sheets cũ

Máy chủ vẫn giữ `POST /api/registrations` và bộ Apps Script để tương thích với hệ thống tiếp nhận đăng ký trước đây. Giao diện mới không hiển thị form và không gọi API này.

Nếu vẫn dùng API từ một luồng riêng, cấu hình các biến môi trường phía máy chủ:

```text
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
GOOGLE_SCRIPT_SECRET=chuoi-ngau-nhien-dai-va-kho-doan
```

Trên máy cá nhân, sao chép `.env.server.example` thành `.env.server` rồi điền cấu hình. `.env.server` được bỏ khỏi Git. Trong Apps Script, đặt Script Property `INGEST_SECRET` bằng `GOOGLE_SCRIPT_SECRET`, dùng URL `/exec` và giữ khóa bí mật ở phía máy chủ.

API kiểm tra dữ liệu, giới hạn tần suất gửi và chỉ xác nhận thành công khi Google Sheet trả lời thành công. Hướng dẫn hệ thống cũ nằm tại [google-apps-script/README.md](./google-apps-script/README.md), mã script tại [google-apps-script/Code.gs](./google-apps-script/Code.gs).
