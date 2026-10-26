import { Given } from "@wdio/cucumber-framework";
import reporter from "../../helper/reporter.ts";
import sauceHomePage from "../../page-objects/sauce.home.page.ts";
import constants from "../../../data/constant.json" with { type: "json" };
import apiHelper from "../../helper/apiHelper.ts";
import { expect } from "chai";
import fs from "fs";

// import { config } from "../../../config/wdi
// o.test.conf.ts";
// import { expect } from "chai";

Given(/^Login to inventory web app$/, async function () {
  reporter.addStep(this.testid, "info", "Login to suce demo");
  console.log(`Test username:${process.env.TEST_USERNAME}`);

  await browser.url("https://www.saucedemo.com");
  await browser.maximizeWindow();

  try {
    await $("#user-name").setValue(process.env.TEST_STD_USERNAME ?? "");
    await $("#password").setValue(process.env.TEST_STD_PASSWORD ?? "");
    await $("#login-button").click();
  } catch (err) {
    console.log(`Error in first login. Retrying..`);
    await browser.refresh();
    await browser.pause(10000);
    await $("#user-name").setValue(process.env.TEST_STD_USERNAME ?? "");
    await $("#password").setValue(process.env.TEST_STD_PASSWORD ?? "");
    await $("#login-button").click();
  }

  // ✅ Type-safe access to your custom property
  this.appId = "ABC123";
  reporter.addStep(this.testid, "warn", "login is successful...");
});

Given(
  /^As (a|an) (.*) user I login to inventory webapp$/,
  async function (prefixTxt, userType, dataTable) {
    console.log(`>> Given step test id: ${this.testid}`);

    let dt = dataTable.hashes();
    console.log(`>> The type of dt:${typeof dt}`);
    // console.log(`>> The type of dt:${dt.constructor}`);
    // console.log(`>> The value of dt:${JSON.stringify(dt)}`);
    console.log(`>> The userType ${userType}`);
    console.log(`>> The prefixTxt ${prefixTxt}`);
    // console.log(`Test username:${process.env.TEST_USERNAME}`);
    /**1.Launch browser */

    // console.log(`>> Test config values ${JSON.stringify(browser.options)}`);
    // await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
    // await browser.maximizeWindow();

    /**2.Login to inventory app  */

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
    // await browser.debug();

    try {
      reporter.addStep(this.testid, "info", "Login to suce demo");
      // @ts-ignore
      await sauceHomePage.navigateTo(browser.options.sauceDemoURL);
      await sauceHomePage.loginToSauceApp(
        this.testid,
        process.env.TEST_STD_USERNAME,
        process.env.TEST_STD_PASSWORD,
      );
    } catch (err) {
      err.message = `${this.testid} Failed at login step,${err.message}`;
      throw err;
    }
  },
);

/**
 *Get list of users from reqres api
 *Sub-Steps:
 *1. Get payload data
 *2.Make a get call by using apiHelper
 *3.Store results
 */

Given(/^Get list of (.*) from reqres.in$/, async function (endpointRef) {
  if (!endpointRef)
    throw Error(`Given endpoint ref: ${endpointRef} is not valid`);
  try {
    /**1. Get payload data */
    reporter.addStep(
      this.testid,
      "info",
      `Getting the payload data for endpoint: ${endpointRef}`,
    );
    let endPoint;
    if (endpointRef.trim().toUpperCase() === "USERS") {
      endPoint = constants.REQRES.GET_USERS;
    }
    if (!endPoint)
      throw Error(`Error getting endpointL ${endPoint} from the constant.json`);

    /**2.Make a get call by using apiHelper */
    let testid = this.testid;

    let res;
    await browser.call(async function () {
      console.log(
        `Query Param: ${JSON.stringify(constants.REQRES.QUERY_PARAM)}`,
      );
      // @ts-ignore
      console.log(`baseURL: ${browser.options.reqresBaseURL}`);
      console.log(`endpoint: ${endPoint}`);
      res = await apiHelper.GET(
        testid,
        // @ts-ignore
        browser.options.reqresBaseURL,
        endPoint,
        "",
        constants.REQRES.QUERY_PARAM,
      );
    });

    if (res.status !== 200)
      expect.fail(
        // @ts-ignore
        `Failed at getting users from: ${browser.options.reqresBaseURL}/${endPoint}`,
      );
    reporter.addStep(
      this.testid,
      "debug",
      `API response received, data:${JSON.stringify(res.body)}`,
    );
    /**3.Store results */
    let data = JSON.stringify(res.body);
    let fileName = `${process.cwd()}/data/api-res/reqresAPIUsers.json`;
    fs.writeFileSync(fileName, data);
    reporter.addStep(
      this.testid,
      "info",
      `API response from${endPoint} stored in JSON file`,
    );
  } catch (error) {
    error.message = `${this.testid} failed at getting API users from reqres,${error.message}`;
    throw error;
  }
});
