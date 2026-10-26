import { When } from "@wdio/cucumber-framework";
import reporter from "../../helper/reporter.ts";
import nopcommerceHomePage from "../../page-objects/nopcommerce.home.page.ts";

When(/^An as (.*) user login to nopcommerce site$/, async function (user) {
  if (!user) throw Error(`Given user: ${user} is not valid`);
  user = user.trim().toUpperCase();
  try {
    reporter.addStep(this.testid, "info", `Login to nopCommerce demo site...`);

    await nopcommerceHomePage.loginTonopCommerceWeb(
      this.testid,
      // @ts-ignore
      browser.options.nopCommerceBaseURL,
      process.env[`TEST_NOP_${user}_USERNAME`],
      process.env[`TEST_NOP_${user}_PASSWORD`],
    );
    await browser.pause(20000);
  } catch (error) {
    error.message = `${this.testid}: failed at nopcommerce login step, ${error.message}`;
    throw error;
  }
});

When(/^Search users in customer list$/, async function () {});
