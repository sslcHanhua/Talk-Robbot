var API = (function () {
  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";

  //封装get请求
  async function get(path) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, { headers });
  }
  //封装post请求
  async function post(path, bodyObj) {
    const headers = {
      "content-type": "application/json",
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, {
      headers,
      method: "POST",
      body: JSON.stringify(bodyObj),
    });
  }
  //注册账号
  async function reg(UserInfo) {
    return await post("/api/user/reg", UserInfo).then((resp) => resp.json());
  }
  //登录
  async function login(loginInfo) {
    const resp = await post("/api/user/login", loginInfo);
    const result = await resp.json();
    if (result.code === 0) {
      const token = resp.headers.get("authorization");
      localStorage.setItem(TOKEN_KEY, token);
    }
    return result;
  }

  //验证账号
  async function checkUser(loginId) {
    const resp = await fetch(
      BASE_URL + "/api/user/exists" + "?loginId=" + loginId
    );
    const result = await resp.json();
    return result;
  }

  //当前登录的用户信息
  async function profile() {
    const resp = await get("/api/user/profile");
    return resp.json();
  }

  //发送消息
  async function sendMessage(content) {
    const resp = await post("/api/chat", {
      content,
    });
    return await resp.json();
  }

  //获取聊天记录
  async function getHistory() {
    const resp = await get("/api/chat/history");
    return await resp.json();
  }
  //退出登录
  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
    location.href = "../login.html";
  }
  return {
    login,
    reg,
    checkUser,
    profile,
    sendMessage,
    getHistory,
    loginOut,
  };
})();
