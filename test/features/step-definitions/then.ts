import { Then } from "@cucumber/cucumber";
import { expect } from "chai";

Then(/^Inventory page should list (.*)$/, async (noOfProducts) => {
  if (!noOfProducts) throw new Error(`Invalid number provided${noOfProducts}`);
  await browser.pause(20000);
  let eleArr = await $$(".inventory_item_name ");
  await eleArr[0].waitForDisplayed({ timeout: 20000 });
  expect(eleArr.length).to.equal(parseInt(noOfProducts));
});

/**
 *Steps:
 *1.Get price list
 *2.Convert string to number
 *3.Assert if all prices is <=0
 */
Then(/^validate all products have valid price$/, async () => {
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
});
