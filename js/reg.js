const loginIdValidator = new FieldValidator("txtLoginId", async function (val) {
  if (!val) {
    return "请输入账号";
  }
  const resp = await API.checkUser(val);
  if (resp.data) {
    return "账号已存在";
  }
});
const nicknameValidator = new FieldValidator("txtNickname", async function (
  val
) {
  if (!val) {
    return "请填写昵称";
  }
});

const loginPsdValidator = new FieldValidator("txtLoginPwd", async function (
  val
) {
  if (!val) {
    return "请输入密码";
  }
});
const loginPsdConfirmValidator = new FieldValidator(
  "txtLoginPwdConfirm",
  async function (val) {
    if (!val) {
      return "请再次输入密码";
    }
    if (val !== loginPsdValidator.input.value) {
      return "两次密码不一致";
    }
  }
);

const form = $(".user-form");
form.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FieldValidator.validate(
    loginIdValidator,
    nicknameValidator,
    loginPsdValidator,
    loginPsdConfirmValidator
  );
  if (!result) {
    return;
  }
  const formData = new FormData(form);
  const Data = Object.fromEntries(formData.entries());
  const resp = await API.reg(Data);
  if (resp.code === 0) {
    alert("注册成功");
    location.href = "./login.html";
  }
};
