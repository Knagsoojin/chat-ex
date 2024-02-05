const socket = io("http://3.95.33.19:3000");

const messageInput = document.getElementById("test");
const chatForm = document.getElementById("chat-form");
const chatBox = document.getElementById("chat");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message !== "") {
    socket.emit("chat message", message);
    messageInput.value = "";
  }
});

socket.on("chat message", (message) => {
  const trimmedMessage = message.message.trim();
  if (trimmedMessage !== "") {
    appendMessage(trimmedMessage, true);
  }
});

const appendMessage = (message, isOthers) => {
  if (message.trim() === "") {
    return;
  }

  const msgBox = document.createElement("div");
  const classname = isOthers ? "others-message-wrapper" : "my-message-wrapper";
  msgBox.className = classname;
  msgBox.innerText = message;

  // 최신 메시지를 표시하기 위해 하단으로 스크롤
  const chatBox = document.getElementById("chat");
  chatBox.appendChild(msgBox);
  chatBox.scrollTop = chatBox.scrollHeight;

  // .me 또는 .other 클래스가 추가된 경우에만 화면에 표시
  msgBox.style.display = "block";
};
