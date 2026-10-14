import { Given } from "@wdio/cucumber-framework";
// import { expect } from "chai";

Given(/^Login to inventorty web app$/, async () => {
  /**1.Launch browser */
  await browser.url("https://www.saucedemo.com");
  // await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();

  /**2.Login to inventory app  */
  try {
    await $("#user-nam").setValue("standard_user");
    await $("#password").setValue("secret_sauce");
    await $("#login-button").click();
  } catch (err) {
    console.log(`Error in first login. Retrying..`);
    await browser.refresh();
    await browser.pause(10000);
    await $("#user-name").setValue("standard_user");
    await $("#password").setValue("secret_sauce");
    await $("#login-button").click();
  }
  /**Login with another user */
  // await browser.pause(2000);
  // await browser.reloadSession();
  // await browser.url("https://www.saucedemo.com");
  // await $("#user-name").setValue("problem_user");
  // await $("#password").setValue("secret_sauce");
  // await $("#login-button").click();

  // await browser.pause(20000);
  // await browser.back();
  // await browser.pause(20000);
  // await browser.forward();
  // await browser.pause(20000);
  await browser.debug();
});
