import Page from "./page.ts";
import reporter from "../helper/reporter.ts";

class CustList extends Page {
  constructor() {
    super();
  }
  /**Page Objects */
  get firstNameInputBox() {
    return $("#SearchFirstName");
  }
  get lastNameInputBox() {
    return $("#SearchLastName");
  }
  get passwordInputBox() {
    return $("#Password");
  }
  get searchBtn() {
    return $("#search-customers");
  }
  get noResultMessage() {
    return $("td=No data available in table");
  }

  async searchNameAndConfirm(
    testid: string,
    firstname: string,
    lastname: string,
  ): Promise<boolean> {
    if (!firstname || !lastname) {
      throw new Error(
        `Invalid firstaname: ${firstname} or lastname ${lastname} to search`,
      );
    }
    let nameNotExist = false;
    firstname = firstname.trim();
    lastname = lastname.trim();
    reporter.addStep(
      testid,
      "info",
      `Searching user ${firstname} or ${lastname}`,
    );
    try {
      await this.typeInto(await this.firstNameInputBox, firstname);
      await this.typeInto(await this.lastNameInputBox, lastname);
      await this.click(await this.searchBtn);
      await browser.pause(1000);
      let isNotDisplayed = (await this.noResultMessage).isDisplayed();
      if (isNotDisplayed) nameNotExist = true;
    } catch (error) {
      error.message = `Failed searching given firstname : ${firstname}, and lastname: ${lastname} on customer's page ,${error}`;
      throw error;
    }
    return nameNotExist;
  }
}
export default new CustList();
