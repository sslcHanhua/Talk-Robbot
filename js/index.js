(async function () {
  const resp = await API.profile();
  const user = resp.data;
  if (!user) {
    alert("未登录或登录已过期，请重新登录");
    location.href = "./login.html";
    return;
  }
  const doms = {
    asside: {
      nickname: $("#nickname"),
      loginId: $("#loginId"),
    },
    close: $(".close"),
    chatContainer: $(".chat-container"),
    txt: $("#txtMsg"),
    msgContainer: $(".msg-container"),
  };

  //退出登录按钮
  doms.close.addEventListener("click", API.loginOut);

  //显示账号和昵称
  function setUserInfo() {
    doms.asside.nickname.innerText = user.nickname;
    doms.asside.loginId.innerText = user.loginId;
  }
  setUserInfo();

  //聊天框添加消息
  function addMessage(chatInfo) {
    const div = $$$("div");
    div.classList.add("chat-item");
    if (chatInfo.from) {
      div.classList.add("me");
    }
    const img = $$$("img");
    img.className = "chat-avatar";
    img.src = chatInfo.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg";
    const content = $$$("div");
    content.className = "chat-content";
    content.innerText = chatInfo.content;
    const date = $$$("div");
    date.className = "chat-date";
    date.innerText = formDate(chatInfo.createdAt);
    div.appendChild(img);
    div.appendChild(content);
    div.appendChild(date);
    doms.chatContainer.appendChild(div);
  }

  //添加历史聊天记录
  async function loadHistory() {
    const resp = await API.getHistory();
    for (const message of resp.data) {
      addMessage(message);
    }
    scrollTop();
  }
  loadHistory();

  //时间戳转换
  function formDate(timeStamp) {
    const date = new Date(timeStamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day}  -${hour}-${minute}-${second}`;
  }

  //滚动至最底部
  function scrollTop() {
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
  }

  //发送消息
  async function sendMessage() {
    const content = doms.txt.value.trim();
    if (!content) {
      return;
    }
    addMessage({
      from: user.loginId,
      to: null,
      createdAt: Date.now(),
      content: content,
    });
    scrollTop();
    const response = await API.sendMessage(content);
    addMessage({
      from: null,
      to: user.loginId,
      ...response.data,
    });
    scrollTop();
  }

  doms.msgContainer.addEventListener("submit", function (e) {
    e.preventDefault();
    sendMessage();
    doms.txt.value = "";
  });
})();
