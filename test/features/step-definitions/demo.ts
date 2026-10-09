import { Given, When, Then } from "@wdio/cucumber-framework";

/*
 *Selectors
 *title
 *CURA Healthcare Service
 *
 * Make Appointment
 * Link text Make Appointment
 *
 *
 * Login page URL
 * https://katalon-demo-cura.herokuapp.com/profile.php#login
 */

Given(/^the user launches the CURE web app$/, async () => {
  await browser.url("https://katalon-demo-cura.herokuapp.com/");
  await expect(browser).toHaveTitle("CURA Healthcare Service");
});
When(/^the user clicks on Make Appointment button$/, async () => {
  await $("=Make Appointment").click();
});
Then(/^the login page is displayed$/, async () => {
  await expect(browser).toHaveUrl(/.*#login/);
});
/**
 * Web Interaction
 */
Given(/^A web page is opened$/, async () => {
  await browser.url("/inputs");
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();
});

When(/^Perform web interactions$/, async () => {
  /**
   *1.Input box
   *Actions:
   *1.Type into input box
   *2.Clear the field and type or just add value
   *3.Click and type
   *4.Slow typing
   */
  let num = 12345;
  let strNum = num.toString();

  let ele = await $("input[type='number']");
  // await ele.click();
  await ele.scrollIntoView();
  // await ele.setValue(strNum);
  // await ele.addValue(strNum);
  await ele.click();

  for (let i = 0; i < strNum.length; i++) {
    let charAtStr = strNum.charAt(i);
    await browser.pause(1000);
    await browser.keys(charAtStr);
  }
  await browser.debug();
});
