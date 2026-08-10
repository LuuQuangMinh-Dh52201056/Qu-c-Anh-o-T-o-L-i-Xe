# Kết nối form đăng ký với Google Sheets

`Code.gs` là Web App nhận dữ liệu từ website Quốc Anh Driving. Mỗi lần gửi hợp lệ tạo đúng **một hàng ngang** trong Google Sheet. Mã đăng ký (`leadId`) được dùng để chống ghi trùng khi người dùng bấm lại hoặc trình duyệt gửi lại yêu cầu.

## Cấu trúc bảng

Script tự tạo sheet và dòng tiêu đề gồm 15 cột:

1. Mã đăng ký
2. Thời gian
3. Họ và tên
4. Số điện thoại
5. Năm sinh
6. Hạng đăng ký
7. Lịch học mong muốn
8. Khu vực
9. Kênh liên hệ
10. Ghi chú
11. Nguồn
12. Trang đăng ký
13. UTM
14. Referrer
15. Trạng thái

`Thời gian` và `Trạng thái = Mới` được tạo ở máy chủ. Website không thể tự thay đổi hai giá trị này. Cột số điện thoại được định dạng văn bản để không mất số `0` ở đầu.

## 1. Tạo và cấu hình Google Sheet

1. Tạo một Google Sheet bằng tài khoản sẽ sở hữu dữ liệu đăng ký.
2. Sao chép ID trong địa chỉ Sheet. Ví dụ:

   ```text
   https://docs.google.com/spreadsheets/d/1AbCdEf...XyZ/edit
                                          ^ ID ^
   ```

3. Trong Google Sheet, chọn **Tiện ích mở rộng → Apps Script**.
4. Xóa mã mẫu, dán toàn bộ nội dung của `Code.gs` và lưu lại.
5. Trong Apps Script, mở **Project Settings → Script Properties** và thêm:

   | Property | Giá trị | Bắt buộc |
   | --- | --- | --- |
   | `SPREADSHEET_ID` | ID vừa sao chép | Không bắt buộc nếu script được tạo từ chính Google Sheet; khuyến nghị vẫn cấu hình |
   | `SHEET_NAME` | `Đăng ký website` | Không; đây là tên mặc định |
   | `NOTIFY_EMAILS` | `quang09minh02@gmail.com,hoclaixequocanh@gmail.com` | Không; đây là danh sách mặc định nhận thông báo lead mới |
   | `INGEST_SECRET` | Một chuỗi ngẫu nhiên dài, khó đoán | Bắt buộc; phải giống `GOOGLE_SCRIPT_SECRET` trên Render |

6. Đặt múi giờ dự án là **(GMT+07:00) Asia/Ho_Chi_Minh**.

Không cần tạo sheet con hay tiêu đề thủ công. Lần đăng ký đầu tiên, script sẽ tự tạo sheet, tô màu tiêu đề, cố định dòng đầu và thiết lập độ rộng cột.

> Nếu `SHEET_NAME` đã tồn tại nhưng dòng đầu không đúng 15 cột trên, script sẽ không ghi đè dữ liệu cũ. Hãy đổi `SHEET_NAME` sang tên mới hoặc sửa dòng tiêu đề đúng cấu trúc.

## 2. Deploy Apps Script thành Web App

1. Chọn **Deploy → New deployment**.
2. Nhấn biểu tượng bánh răng và chọn **Web app**.
3. Cấu hình:
   - **Execute as:** `Me`.
   - **Who has access:** `Anyone`.
4. Chọn **Deploy**, cấp quyền truy cập Google Sheet khi Google yêu cầu.
5. Sao chép URL kết thúc bằng `/exec`, ví dụ:

   ```text
   https://script.google.com/macros/s/AKfycb.../exec
   ```

Không dùng URL `/dev`: URL đó chỉ dành cho tài khoản phát triển và không hoạt động cho học viên.

Mở URL `/exec` trong trình duyệt. Nếu triển khai đúng, trang trả JSON tương tự:

```json
{"success":true,"service":"Quoc Anh Driving registration receiver","time":"..."}
```

Sau mỗi lần sửa `Code.gs`, vào **Deploy → Manage deployments → Edit → New version → Deploy**. URL `/exec` hiện tại vẫn được giữ nguyên.

## 3. Cấu hình website trên Render

Website dùng một API cùng tên miền để xác nhận Google Sheet đã ghi thành công. Trong Render, giữ loại dịch vụ hiện tại là **Web Service** và cấu hình:

```text
Build command:  npm ci && npm run build
Start command:  npm start
```

Thêm Environment Variable chỉ ở máy chủ:

```text
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
GOOGLE_SCRIPT_SECRET=chuoi-ngau-nhien-giong-INGEST_SECRET
```

Không đặt URL Apps Script trong biến `VITE_*`: như vậy URL nhận dữ liệu không bị đóng gói công khai vào JavaScript của trình duyệt. `server.mjs` sẽ theo chuyển hướng của Apps Script, kiểm tra JSON rồi mới báo thành công cho học viên.

Sau đó chọn **Manual Deploy → Clear build cache & deploy**. Mở `/api/health`; kết quả phải có `"googleScriptConfigured": true` và `"googleScriptSecretConfigured": true`.

## 4. Hợp đồng dữ liệu từ website

Endpoint nhận `application/x-www-form-urlencoded` (khuyến nghị cho trình duyệt) hoặc `application/json` với các trường:

| Trường | Ý nghĩa | Yêu cầu |
| --- | --- | --- |
| `leadId` | UUID/mã duy nhất của lần đăng ký | Nên gửi; tối thiểu 8 ký tự |
| `fullName` | Họ tên học viên | Bắt buộc, tối thiểu 2 ký tự |
| `phone` | Số điện thoại Việt Nam | Bắt buộc |
| `birthYear` | Năm sinh | Không bắt buộc |
| `course` | Hạng bằng quan tâm | Bắt buộc |
| `preferredTime` | Lịch học mong muốn | Không bắt buộc |
| `area` | Khu vực sinh sống | Không bắt buộc |
| `contactMethod` | Điện thoại hoặc Zalo | Mặc định `Điện thoại` |
| `note` | Ghi chú của học viên | Không bắt buộc |
| `source` | Nguồn lead | Mặc định `Website Quốc Anh` |
| `pageUrl` | URL trang gửi form | Không bắt buộc |
| `website` | Tên/địa chỉ website dự phòng | Không bắt buộc |
| `referrer` | Trang giới thiệu người dùng | Không bắt buộc |
| `utmSource` | `utm_source` | Không bắt buộc |
| `utmMedium` | `utm_medium` | Không bắt buộc |
| `utmCampaign` | `utm_campaign` | Không bắt buộc |
| `utmTerm`, `utmContent` | Nội dung/từ khóa chiến dịch | Không bắt buộc |
| `ttclid`, `fbclid`, `gclid` | Mã click TikTok, Facebook, Google | Không bắt buộc |

Script cũng nhận tên dạng chuẩn URL như `utm_source`, `utm_medium`, `utm_campaign`, cùng `utmTerm`/`utm_term` và `utmContent`/`utm_content`.

Frontend lưu nguồn quảng cáo trong `sessionStorage`, nên UTM/click ID vẫn đi theo đăng ký khi học viên chuyển từ trang chủ sang trang đăng ký trong cùng phiên. Nếu xuất hiện một URL chiến dịch mới có tham số quảng cáo, nguồn mới nhất sẽ được ghi nhận.

Ví dụ kiểm tra bằng `curl`:

```bash
curl -L "https://script.google.com/macros/s/AKfycb.../exec" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "leadId=test-20260810-0001" \
  --data-urlencode "ingestSecret=chuoi-giong-GOOGLE_SCRIPT_SECRET" \
  --data-urlencode "fullName=Nguyễn Minh Anh" \
  --data-urlencode "phone=0879227614" \
  --data-urlencode "course=BTĐ" \
  --data-urlencode "preferredTime=Cuối tuần" \
  --data-urlencode "area=Dĩ An, Bình Dương" \
  --data-urlencode "contactMethod=Zalo" \
  --data-urlencode "source=Website Quốc Anh" \
  --data-urlencode "pageUrl=https://ten-mien-cua-ban.vn/dang-ky"
```

Kết quả thành công:

```json
{
  "success": true,
  "duplicate": false,
  "leadId": "test-20260810-0001",
  "row": 2,
  "message": "Đăng ký đã được ghi nhận thành công."
}
```

Gửi lại cùng `leadId` sẽ không tạo thêm hàng. Nếu thông tin thay đổi, script cập nhật chính hàng cũ; nếu không thay đổi, script chỉ xác nhận đã tiếp nhận. Cơ chế này giúp lần bấm gửi lại sau sự cố mạng không tạo lead trùng hoặc làm mất phần chỉnh sửa mới nhất.

## 5. Luồng xác nhận và bảo vệ URL Sheet

Trình duyệt gửi JSON tới `/api/registrations` cùng tên miền. API kiểm tra dữ liệu, giới hạn tần suất, chuyển tiếp tới Apps Script và chỉ trả `success: true` sau khi Apps Script xác nhận dòng đã được ghi. Cách này tránh lỗi CORS/redirect của Google Content Service và không làm lộ URL Apps Script trong mã frontend.

Hai địa chỉ email mặc định nhận thông báo sau khi dòng được ghi là `quang09minh02@gmail.com` và `hoclaixequocanh@gmail.com`. Lỗi hoặc hết hạn mức gửi email không làm mất dữ liệu đã lưu trong Sheet.

## Bảo vệ dữ liệu đã tích hợp

- Khóa đồng thời bằng `LockService`, tránh hai yêu cầu ghi đè nhau.
- Chống trùng theo `leadId`.
- Cập nhật đúng hàng cũ khi cùng `leadId` có thông tin mới.
- Kiểm tra họ tên, số điện thoại và năm sinh ở máy chủ.
- Cắt giới hạn độ dài cho mọi trường.
- Chống Spreadsheet Formula Injection với ký tự `=`, `+`, `-`, `@`.
- Thời gian và trạng thái do máy chủ quyết định.
- Không ghi đè sheet có cấu trúc tiêu đề khác.
- Gửi thông báo lead mới tới email nội bộ theo cơ chế không ảnh hưởng việc ghi Sheet.
- Có khóa bí mật bắt buộc giữa Render và Apps Script để chặn gọi trực tiếp trái phép.

URL Apps Script chỉ nằm trong biến môi trường phía máy chủ. API website có honeypot và giới hạn tần suất cơ bản; nếu lượng spam tăng mạnh, có thể bổ sung Turnstile/reCAPTCHA.
