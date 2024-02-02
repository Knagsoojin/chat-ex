const socket = io("http://172.31.87.171:8080");

const messageInput = document.getElementById("test");
const chatForm = document.getElementById("chat-form");
const chatBox = document.getElementById("chat");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("chat message", message);
  messageInput.value = "";
  appendMessage(message, false);
});

socket.on("chat message", (message) => {
  appendMessage(message, true);
});

const appendMessage = (message, isOthers) => {
  const msgBox = document.createElement("div");
  const classname = isOthers ? "others-message-wrapper" : "my-message-wrapper";
  msgBox.className = classname;
  msgBox.innerText = message;
  chatBox.appendChild(msgBox);

  // 최신 메시지를 표시하기 위해 하단으로 스크롤
  chatBox.scrollTop = chatBox.scrollHeight;
};
