export default class Page {
  constructor() {}

  /**All reusable web functions */
  async navigateTo(path: string) {
    await browser.url(path);
    await browser.maximizeWindow();
  }
  async click(ele: WebdriverIO.Element) {
    await ele.waitForClickable({ timeout: 5000 });
    if (!ele.elementId) {
      throw Error(ele.error.message);
      // throw new Error(ele.error?.message || "Element not found");
    }
    await ele.click();
  }
  async typeInto(ele: WebdriverIO.Element, text: string) {
    await ele.waitForDisplayed({ timeout: 5000 });
    if (!ele.elementId) {
      throw Error(ele.error.message);
      // throw new Error(ele.error?.message || "Element not found");
      // throw new Error("Element not found");
    }
    await ele.setValue(text);

    // try {
    //   await ele.waitForDisplayed({ timeout: 5000 });
    //   await ele.setValue(text);
    // } catch (error) {
    //   // throw Error(ele.error.message);
    //   throw new Error(error instanceof Error ? error.message : String(error));
    //   // throw error;
    // }
  }

  async typeIntoSlowly(ele: WebdriverIO.Element, text: string) {
    await ele.waitForDisplayed({ timeout: 5000 });
    if (!ele.elementId) {
      throw Error(ele.error.message);
      // throw new Error(ele.error?.message || "Element not found");
      // throw new Error("Element not found");
    }
    await ele.click();
    await browser.keys(["Control", "a"]);
    await browser.keys(["Control", "Backspace"]);

    for (const char of text) {
      await browser.keys(char);
      await browser.pause(100);
    }
  }
}
