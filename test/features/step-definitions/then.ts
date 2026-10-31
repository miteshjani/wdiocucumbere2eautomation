import { Then } from "@cucumber/cucumber";
import { expect } from "chai";
import reporter from "../../helper/reporter.ts";
import fs from "fs";
import nopcommerceCustListPage from "../../page-objects/nopcommerce.custList.page.ts";
import dbHelper from "../../helper/dbHelper.ts";
import constants from "../../../data/constant.json" with { type: "json" };

// const sqlConfig = {
//   user: "admin",
//   password: "admin",
//   server: "127.0.0.1",
//   port: 56203,
//   database: "master",
//   options: {
//     encrypt: true, // for azure
//     trustServerCertificate: true, // change to true for local dev / self-signed certs
//     trustedConnection: true,
//   },
// };

Then(/^Inventory page should list (.*)$/, async function (noOfProducts) {
  if (!noOfProducts) throw new Error(`Invalid number provided${noOfProducts}`);
  await browser.pause(20000);
  let eleArr = await $$(".inventory_item_name ");
  await eleArr[0].waitForDisplayed({ timeout: 20000 });
  expect(eleArr.length).to.equal(parseInt(noOfProducts));
});

Then(
  /^Inventory page should (.*)\s?list (.*)$/,
  async function (negativeCheck, noOfProducts) {
    try {
      // console.log(wdio); // Refrence error
      console.log(`>> Starting the ${this.testid} ...`);
      console.log(`>> this appId: ${this.appId}`);
      console.log(`>> negativeCheck ${negativeCheck}`);
      if (!noOfProducts)
        throw new Error(`Invalid product count provided ${noOfProducts}`);
      await browser.pause(20000);
      let eleArr = await $$(".inventory_item_name ");
      await eleArr[0].waitForDisplayed({ timeout: 20000 });

      try {
        expect(eleArr.length).to.equal(parseInt(noOfProducts));
      } catch (error) {
        reporter.addStep(
          this.testid,
          "error",
          "Kinown issue- product count mismatch",
          true,
          "JIRA-123",
        );
      }
    } catch (error) {
      console.log(`>> The type of err: ${typeof error}`);
      console.log(`>> The name property: ${error.name}`);
      console.log(`>> The message property: ${error.message}`);
      error.message = `${this.testid} : Failed when comparing the product count. ${error.message}`;
      throw error;
      // logger.error(error.message);
    }
  },
);

/**
 *Steps:
 *1.Get price list
 *2.Convert string to number
 *3.Assert if all prices is <=0
 */
Then(/^validate all products have valid price$/, async function () {
  reporter.addStep(this.testid, "info", "Checking the price ...");
  /** 1.Get price list  */
  let eleArr = await $$(".inventory_item_price");
  let priceStrArr = [];
  for (let i = 0; i < eleArr.length; i++) {
    let ele = eleArr[i];
    let priceStr = await ele.getText();
    priceStrArr.push(priceStr);
  }
  console.log(`The list of prices are : ${priceStrArr.join(", ")}`);
  /**2.Convert string to number */
  const priceNumberArray = priceStrArr.map((priceStr) => {
    return +priceStr.replace("$", "");
  });
  console.log(`The list of prices are : ${priceNumberArray.join(", ")}`);

  /**3.Assert if all prices is <=0*/
  const invalidPrices = priceNumberArray.filter((price) => {
    return price <= 0;
  });
  expect(invalidPrices.length).to.equal(0);
  reporter.addStep(this.testid, "info", "Price Comparison", false, "500");
});

/**
 *Verify if the given user exists in customers lists
 * Sub-steps:
 *1.Navigate/select customer option from left menu
 *2.Read api response from data folder
 *3.For each user object in API response
    - Enter first name and last name
    - Search and confirm if user exists
  *4.In case user does not exist write it to error file

 */
Then(/^Verify if all users exists in customer list$/, async function () {
  /**1.Navigate/select customer option from left menu */
  try {
    await browser.url(
      // @ts-ignore
      `${browser.options.nopCommerceBaseURL}/Admin/Customer/List`,
    );
    reporter.addStep(
      this.testid,
      "info",
      "Navigated to customer list screen...",
    );
    /**2.Read api response from data folder */
    let fileName = `${process.cwd()}/data/api-res/reqresAPIUsers.json`;
    let data = fs.readFileSync(fileName, "utf-8");
    let dataObj = JSON.parse(data);
    console.log(`API data: ${JSON.stringify(dataObj)}`);

    /** 3.For each user object in API response*/
    let numObj = dataObj.data.length;
    let arr = [];
    for (let i = 0; i < numObj; i++) {
      let obj = {};
      let firstName = dataObj.data[i].first_name;
      let lastName = dataObj.data[i].last_name;
      let custNotFound = await nopcommerceCustListPage.searchNameAndConfirm(
        this.testid,
        firstName,
        lastName,
      );
      if (custNotFound) {
        obj["firstname"] = firstName;
        obj["lastname"] = lastName;
        arr.push(obj);
      }
    }
    /**4.In case user does not exist write it to error file */
    if (arr.length > 1) {
      let data = JSON.stringify(arr, undefined, 4);
      let filePath = `${process.cwd}/results/custNotFoundList.json`;
      fs.writeFileSync(filePath, data);
    }
  } catch (error) {
    error.message = `${this.testid}: failed at checking users in nopcommerce site, ${error.message}`;
    throw error;
  }
});

Then(/^Validate DB result$/, async function () {
  try {
    /**Execute DB Query */
    let testid = this.testid;

    let res: any;
    await browser.call(async function () {
      console.log(
        `Query Param: ${JSON.stringify(constants.DB_QUERIES.GET_EMP_DETAILS)}`,
      );
      // @ts-ignore
      console.log(`SQLConfig: ${JSON.stringify(browser.options.sqlConfig)}`);
      // console.log(`SQLConfig: ${JSON.stringify(sqlConfig)}`);

      res = await dbHelper.executeQuery(
        testid,
        // @ts-ignore
        browser.options.sqlConfig,
        constants.DB_QUERIES.GET_EMP_DETAILS,
      );
    });
    console.log(`res: ${JSON.stringify(res)}`);
    reporter.addStep(this.testid, "debug", `DB response received, data:${res}`);
    /**3.Store results */
    let data = JSON.stringify(res);
    let fileName = `${process.cwd()}/data/db-res/dbresults.json`;
    fs.writeFileSync(fileName, data);
    reporter.addStep(this.testid, "info", `DB response  stored in JSON file`);
  } catch (error) {
    error.message = `${this.testid}: failed at getting DB results, ${error.message}`;
    throw error;
  }
});
