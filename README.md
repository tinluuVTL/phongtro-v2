#Phong TRo v2


# Hướng dẫn cài đặt chạy web trên máy tính Local

Để chạy được web phải cần 3 yếu tố:

- 1 postgres server - database chạy local _(Cái này lên mạng tải postgressql về máy và cài đặt như bình thường.)_
- 1 server _(xử lý logic phía sau trang web)_
- 1 client _(hiển thị giao diện UI)_



### 2. Cài và chạy server nodejs



Mở source code lên, **mở terminal đứng tại forder server**.

Trước tiên chạy lệnh `npm i` hoặc `npm install` để tại thư viện cần thiết. Nếu lỗi thì có thể thử `npm i -- force`.



Tiếp theo, mở terminal forder server chạy server lên bằng lệnh: `npm run dev`.

Sau khi server chạy lên thành công thì tới bước khởi tạo bảng cho database, và insert dữ liệu.



Kết thúc chạy thàng công server

### 3. Chạy client Reactjs

Mở source code lên, **mở terminal đứng tại forder client**.

Trước tiên chạy lệnh `npm i` hoặc `npm install` để tại thư viện cần thiết. Nếu lỗi thì có thể thử `npm i -- force`.

Tiếp theo, mở terminal forder client chạy server lên bằng lệnh: `npm run dev`.



Truy cập `http://localhost:5173` để mở website.

