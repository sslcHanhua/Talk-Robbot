const loginIdValidator = new FieldValidator("txtLoginId", async function (val) {
  if (!val) {
    return "请输入账号";
  }
});
const loginPsdValidator = new FieldValidator("txtLoginPwd", async function (
  val
) {
  if (!val) {
    return "请输入密码";
  }
});
const form = $(".user-form");
form.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FieldValidator.validate(
    loginIdValidator,
    loginPsdValidator
  );
  if (!result) {
    return;
  }
  const formData = new FormData(form);
  const Data = Object.fromEntries(formData.entries());
  const resp = await API.login(Data);
  if (resp.code === 0) {
    alert("登录成功");
    location.href = "./index.html";
  } else {
    return "请检查账号密码";
  }
};
