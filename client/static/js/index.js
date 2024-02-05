const socket = io();

// 초기에 사용자 이름을 로컬 스토리지에서 가져오기
const storedName = localStorage.getItem("username");
let name = storedName || prompt("반갑습니다!", "");

// 이름이 빈칸이거나 취소된 경우 기본값 설정
if (!name) {
  name = "익명";
}

// 로컬 스토리지에 사용자 이름 저장
localStorage.setItem("username", name);

// 연결되었을 때 실행
socket.on("connect", function () {
  // 서버에 새로운 유저가 왔다고 알림
  socket.emit("newUser", name);
});

// 서버로부터 데이터 받은 경우
socket.on("update", function (data) {
  const chat = document.getElementById("chat");

  const message = document.createElement("div");
  const node = document.createTextNode(`${data.name}: ${data.message}`);
  let className = "";

  // 타입에 따라 적용할 클래스를 다르게 지정
  switch (data.type) {
    case "message":
      className = "other";
      break;

    case "connect":
      className = "connect";
      break;

    case "disconnect":
      className = "disconnect";
      break;
  }

  message.classList.add(className);
  message.appendChild(node);
  chat.appendChild(message);
});

function send() {
  const messageInput = document.getElementById("test");
  const message = messageInput.value.trim();

  // 내가 전송할 메시지 클라이언트에게 표시
  if (message !== "") {
    const chat = document.getElementById("chat");
    const msg = document.createElement("div");
    const node = document.createTextNode(`${message}`);
    msg.classList.add("me");
    msg.appendChild(node);
    chat.appendChild(msg);

    // 서버로 message 이벤트 전달 + 데이터와 함께
    socket.emit("message", {type: "message", name: name, message: message});

    // 메시지 입력창 초기화
    messageInput.value = "";
  }
}
