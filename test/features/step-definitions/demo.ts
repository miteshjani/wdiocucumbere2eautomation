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
