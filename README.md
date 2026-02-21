YÊU CẦU ĐỀ BÀI
Làm 1 ứng dụng todo list đơn giản với các yêu cầu dưới đây.
Yêu cầu:
Tạo ra collection todo trên mongo db - bao gồm 2 collection user + task - có quản lý được trạng thái của công việc là đã done hay chưa và thời gian done.
Level 1: viết các api : Yêu cầu mã hóa (băm) password của user. username sẽ không trùng lại, 1 user có nhiều task nhưng khi user đó tạo task thì 1 task chỉ liên quan đến 1 user đó thôi.
Lấy hết tất cả các task đang có (getAllTasks)
Lấy task theo tên user
Xuát các task trong ngày hiện tại 
Xuất các task chưa hoàn thành
Xuất các task với những user có họ là 'nguyễn'
Level 2: hiển thị ra trên giao diện web - sử dụng ejs trong nodeJS
 Tạo một trang bằng ejs có ô nhập liệu (input), nút thêm công việc (button) và danh sách (ul) hiển thị các công việc.
 Khi người dùng nhập công việc và nhấn nút, công việc sẽ được thêm vào danh sách. Mỗi công việc trong danh sách sẽ có thêm một nút "Xóa" để cho phép xóa công việc đó khỏi danh sách. - Nếu có thể thì tích hợp phần process bar trong bootrap hoặc material để hiển thị thanh process bar hoàn thành.
Level 3: Làm thêm chức năng phân quyền task cho 1 user khác, như vậy thì 1 user có role cao hơn có thể phân task đến cho 1 user khác. Các role sẽ bao gồm: admin và normal. admin thì có thể phân quyền task cho normal, và 1 task có thể có 2 người cùng hoàn thành nó - khi cả 2 người hoặc nhiều người được phân trong task đó click hết hoàn thành hết thì task đó mới hoàn thành.

Các phần phải nộp. 
- Link git về code,
- 1 file document - trình bày hết các kết quả - đối với level các level thì cách 1 luồng hoạt động, và snip phần kết quả dán vào. 
- Trong level 2  + 3 thì có màn hình quay lại các chức năng chính của trang web - nộp file gif. 
