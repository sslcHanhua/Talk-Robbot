class FieldValidator {
  constructor(txtId, validatorsFunc) {
    this.input = $("#" + txtId);
    this.p = this.input.nextElementSibling;
    this.validatorsFunc = validatorsFunc;
    this.input.onblur = () => {
      this.validate();
    };
  }
  async validate() {
    const err = await this.validatorsFunc(this.input.value);
    if (err) {
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }
  static async validate(...validators) {
    const proms = validators.map((v) => v.validate());
    const result = await Promise.all(proms);
    return result.every((r) => r);
  }
}
