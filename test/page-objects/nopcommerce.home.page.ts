import Page from "./page.ts";
import reporter from "../helper/reporter.ts";

class HomePage extends Page {
  constructor() {
    super();
  }
  /**Page Objects */
  get usernameInputBox() {
    return $("#Email");
  }
  get passwordInputBox() {
    return $("#Password");
  }
  get loginBtn() {
    return $("button=Log in");
  }

  async loginTonopCommerceWeb(
    testid: string,
    url: string,
    username: string,
    password: string,
  ) {
    if (!url || !username || !password) {
      throw new Error(
        `Given data, url${url}, username ${username} or password is not valid`,
      );
    }
    url = url.trim();
    username = username.trim();
    try {
      reporter.addStep(testid, "info", `Login to ${url} with ${username}`);
      await this.navigateTo(url);
      await browser.pause(20000);
      await this.typeInto(await this.usernameInputBox, username);
      await this.typeInto(await this.passwordInputBox, password);
      await this.click(await this.loginBtn);
      reporter.addStep(
        testid,
        "info",
        `Login to ${url} with ${username} is successful`,
      );
    } catch (error) {
      error.message = `Failed login to nopCommerce web: ${url}, with username: ${username}`;
      throw error;
    }
  }
}
export default new HomePage();
