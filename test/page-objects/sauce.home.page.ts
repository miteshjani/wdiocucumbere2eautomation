import Page from "./page.ts";
import reporter from "../helper/reporter.ts";

class HomePage extends Page {
  constructor() {
    super();
  }

  /**
   *
   *  await $("#user-name").setValue(process.env.TEST_STD_USERNAME ?? "");
      await $("#password").setValue(process.env.TEST_STD_PASSWORD ?? "");
      await $("#login-button").click();
   */

  /**Page Objects */
  get usernameInputBox() {
    return $("#user-name");
  }
  get passwordInputBox() {
    return $("#password");
  }
  get loginBtn() {
    return $("#login-butt");
  }
  /**Page Actions */
  async enterUserName(testid: string, username: string) {
    if (!username) throw Error(`Given userbame ${username} is not valid`);

    try {
      username = username.trim();
      await this.typeInto(await this.usernameInputBox, username);
      reporter.addStep(
        testid,
        "info",
        `Username: ${username} entered successfully`,
      );
    } catch (error) {
      error.message = `Error entering the username: ${username}, ${error.message}`;
      throw error;
    }
  }

  async enterPassword(testid: string, password: string) {
    // if (!password) throw Error(`Given password  is not valid`);

    // try {
    //   password = password.trim();
    //   console.log(`enterPassword`);
    //   this.typeInto(await this.passwordInputBox, password);
    //   reporter.addStep(testid, "info", `Password entered successfully`);
    // } catch (error: any) {
    //   // error.message = `Error entering the password: , ${error.message}`;
    //   throw new Error(`Error entering the password: , ${error.message}`);
    // }
    if (!password) {
      throw new Error("Given password is not valid");
    }

    try {
      password = password.trim();

      await this.typeInto(await this.passwordInputBox, password);

      reporter.addStep(testid, "info", "Password entered successfully");
    } catch (error) {
      // throw new Error(
      //   `Error entering the password: ${
      //     error instanceof Error ? error.message : String(error)
      //   }`,
      // );
      error.message = `Error entering password, ${error.message}`;
      throw error;
    }
  }
  async clickLoginButton(testid: string) {
    try {
      await this.click(await this.loginBtn);
      reporter.addStep(testid, "info", `Login button clicked`);
    } catch (error) {
      error.message = `Error clicking login button: , ${error.message}`;
      throw error;
    }
  }

  async loginToSauceApp(testid: string, username: string, password: string) {
    try {
      await this.enterUserName(testid, username);
      await this.enterPassword(testid, password);
      await this.clickLoginButton(testid);
    } catch (error) {
      throw error;
    }
  }
}
export default new HomePage();
