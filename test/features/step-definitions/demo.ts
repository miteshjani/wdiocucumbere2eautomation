import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "expect-webdriverio";
import * as chai from "chai";

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
  console.log(`>> browser object ${JSON.stringify(browser.options)}`);
});
When(/^the user clicks on Make Appointment button$/, async () => {
  const ele = await $("=Make Appointment");
  await ele.click();
  console.log(`>> element object ${JSON.stringify(ele)}`);
});
Then(/^the login page is displayed$/, async () => {
  await expect(browser).toHaveUrl(/.*#login/);
});

Given(/^Google page is opened$/, async () => {
  await browser.url("https://www.google.com");
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();
});

When(/^Search with (.*)$/, async (searchItem) => {
  (await $("#ti6dpd")).setValue(searchItem);
  // await browser.debug();
  // await $("(//input[@name='btnK'])[1]").waitForDisplayed({ timeout: 20000 });
  // (await $("(//input[@name='btnK'])[1]")).click();
  await browser.keys("Enter");
  await browser.pause(5000);
  await browser.keys("Enter");
  // await browser.debug();

  // const input = await $("#ti6dpd");

  // for (const char of searchItem) {
  //   await input.addValue(char); // types one character
  //   await browser.pause(500); // waits 300ms before next character
  // }

  // await browser.keys("Enter");
  // await browser.pause(5000);
  // await browser.keys("Enter");
});

Then(/^Click on the first search result$/, async () => {
  (await $("(//h3[contains(text(),'WebdriverIO')])[1]")).click();
});

When(/^URL should match (.*)$/, async (expectedURL) => {
  console.log(`>> expectedURL: ${expectedURL}`);
  await browser.waitUntil(
    async function () {
      return (
        (await browser.getTitle()) ===
        "Open source test automation for web, mobile and desktop apps | WebdriverIO"
      );
    },
    {
      timeout: 20000,
      interval: 500,
      timeoutMsg: `Failed loading WDIO web page: ${await browser.getTitle()} `,
    },
  );
  let url = await browser.getUrl();
  chai.expect(url).to.equal(expectedURL);
});
/**
 * Web Interaction
 */
Given(/^A web page is opened$/, async () => {
  await browser.url("https://www.amazon.com.au/");
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
  // let num = 12345;
  // let strNum = num.toString();
  // let ele = await $("input[type='number']");
  // // await ele.click();
  // await ele.scrollIntoView();
  // // await ele.setValue(strNum);
  // // await ele.addValue(strNum);
  // await ele.click();
  // for (let i = 0; i < strNum.length; i++) {
  //   let charAtStr = strNum.charAt(i);
  //   await browser.pause(1000);
  //   await browser.keys(charAtStr);
  // }
  /**
   * 2.Dropdown
   * Actions:
   * 1.Assert the default option is selected
   * 2.selct by attribute text and index
   * 3.Get a list of options
   */
  // let ele = await $("//select/option[@selected='selected']");
  // let val = await ele.getText();
  // expect(val).to.equal("Please select an option");
  // let ddEle = await $("#dropdown");
  // await ddEle.selectByVisibleText("Option 2");
  // await ddEle.selectByAttribute("value", "1");
  // await ddEle.selectByIndex(2);
  // let eleArr = await $$("select > option");
  // let arr = [];
  // for (let i = 0; i < eleArr.length; i++) {
  //   let ele = eleArr[i];
  //   let val = await ele.getText();
  //   arr.push(val);
  //   console.log(val);
  // }
  // console.log(`The list of options are : ${arr}`);
  /**
   * 3.Checkbox
   *Actions:
   *1.select an option
   *2.Unselect an option (if selected)
   *3.Assert if option is selected
   *4.Select all options
   */
  // let ele = await $("//form[@id='checkboxes']/input[1]");
  // if (!(await ele.isSelected())) {
  //   await ele.click();
  // }
  // let ele2 = await $("//form[@id='checkboxes']/input[2]");
  // let isChecked = await ele2.isSelected();
  // if (!isChecked) {
  //   await ele2.click();
  // }
  // expect(isChecked).to.be.true;
  // let eleArr = await $$("//form[@id='checkboxes']/input");
  // for (let i = 0; i < eleArr.length; i++) {
  //   let ele = eleArr[i];
  //   if (!(await ele.isSelected())) {
  //     await ele.click();
  //   }
  // }
  /**
   *4.Window Handling
   *Actions:
   *1.Launch the browser
   *2.Open another windiow
   *3.Switch to the window based on title
   *4.Switch back to the main window
   */
  /**
   * Methods used
   *1.getTitle()
   *2.getWindowHandle()
   *3.getWindowHandles()
   *4.switchToWindow()
   */
  // (await $("=Click Here")).click();
  // (await $("=Elemental Selenium")).click();
  // let currentWindowTitle = await browser.getTitle();
  // let parentWindowHandle = await browser.getWindowHandle();
  // console.log(`The current window title is : ${currentWindowTitle}`);
  // // Switch to specific window
  // let windowHandles = await browser.getWindowHandles();
  // for (let i = 0; i < windowHandles.length; i++) {
  //   let windowHandle = windowHandles[i];
  //   currentWindowTitle = await browser.getTitle();
  //   if (currentWindowTitle === "Home | Elemental Selenium") {
  //     await browser.switchToWindow(windowHandle);
  //     let headerTextEleSel = (await $("<h3>")).getText();
  //     console.log(`>> headerTextEleSel ${headerTextEleSel}`);
  //     break;
  //   } else if (currentWindowTitle === "The Internet") {
  //     await browser.switchToWindow(windowHandle);
  //     let headerTextEleSel = (await $("<h3>")).getText();
  //     console.log(`>> headerTextEleSel ${headerTextEleSel}`);
  //     break;
  //   } else if (currentWindowTitle === "New Window") {
  //     await browser.switchToWindow(windowHandle);
  //     let headerTextEleSel = (await $("<h3>")).getText();
  //     console.log(`>> headerTextEleSel ${headerTextEleSel}`);
  //     break;
  //   }
  // }
  // await browser.switchToWindow(parentWindowHandle);
  // let parentWindowTitle = await $("<h3>").getText();
  // console.log(`>> parentWindowTitle ${parentWindowTitle}`);
  /**
   *5. Handling Alert
   * Method Used:
   *1.isAlertOpen()
   *2.acceptAlert()
   *3.dismissAlert()
   *4.getAlertText()
   *5.sendAlertText()
   */
  // await $("button=Click for JS Alert").click();
  // if (await browser.isAlertOpen()) {
  //   await browser.acceptAlert();
  // }

  // await $("button=Click for JS Confirm").click();
  // if (await browser.isAlertOpen()) {
  //   await browser.dismissAlert();
  //   await browser.pause(10000);
  // }

  // await $("//button[text()='Click for JS Prompt']").click();

  // if (await browser.isAlertOpen()) {
  //   const alertText = await browser.getAlertText();
  //   console.log(`The alert text is: ${alertText}`);

  //   // Send text to the prompt
  //   await browser.sendAlertText("Hello JS Prompt...");

  //   // Accept the prompt
  //   await browser.acceptAlert();

  //   await browser.pause(10000);
  // }

  /**
   * 6.File Upload
   *
   */
  // (await $("#file-upload")).addValue(
  //   `${process.cwd()}/data/fileUpload/dummy.txt`,
  // );
  // await $("#file-submit").click();

  /**
   * 7. Iframes
   *Methods used:
   *1.switchToFrame()
   *2.switchToParentFrame()
   */
  // (await $("=iFrame")).click();
  // let iframeEle = await $("#mce_0_ifr");
  // await browser.switchFrame(iframeEle);
  // await $("#tinymce").setValue("Typing intio frame...");
  // await browser.switchToParentFrame();
  // await browser.debug();

  // Navigate to a page
  // const context = await browser.url(
  //   "https://the-internet.herokuapp.com/iframe",
  // );

  // // Find the iframe element
  // const iframe = await browser.$("iframe#mce_0_ifr");

  // // Switch into the iframe by calling `frame()` on the browsing context
  // const frameContext = await context.frame(iframe);
  // await frameContext.$("#tinymce").click();
  // await browser.keys(["Meta", "a"]);
  // await browser.pause(1000);
  // await browser.keys(["Meta", "c"]);
  // // await browser.keys("Delete");
  // // Now you can interact inside the iframe
  // // await frameContext.$("#tinymce").setValue("Typing into frame...");

  // // To go back to the parent context
  // const parentContext = frameContext.parent;
  // const parentFrameText = await parentContext.$("h3").getText();
  // console.log("Parent Frame Text:" + parentFrameText);
  // await browser.pause(10000);
  // await browser.debug();
  // await browser.debug();
  // const elems = await $$("//span[text()='Home harmony']");
  // await browser.debug();
  // const elem = await $("//div[contains(text(),'Powered by ')]");
  // const elem = await $(
  //   "//span[contains(text(),'Home harmony')][@class='a-truncate-full a-offscreen']",
  // );
  // const elem = await $(
  //   "//span[contains(text(),'Discover devices by Amazon')][@class='a-truncate-cut']",
  // );

  // const elem1 = await $$("span=Discover devices by Amazon");
  // await elem1[1].waitForDisplayed({ timeout: 20000 });
  // await elem1[1].scrollIntoView(false);
  // const elem = await $("//*[contains(text(),'Mouse Hover Example')]");
  // await elem.waitForDisplayed({ timeout: 20000 });
  // await elem.scrollIntoView();

  /**
   * Web Table
   *What are going to cover
   *1.Check numbers of rows and columns
   *2.Get whole table data
   *3.Get single row [based on condition]
   *4.Get single column
   *5. Get single cell value [based on another cell]
   */
  /**1.Check numbers of rows and columns */
  // let rowCount = await $$("//table[@id='table1']/tbody/tr").length;
  // expect(rowCount).to.equal(4);
  // console.log(`>> Number of rows: ${rowCount}`);
  // let colCount = await $$("//table[@id='table1']/thead/tr/th").length;
  // console.log(`>> Number of columns: ${colCount}`);
  // expect(colCount).to.equal(6);

  /** 2.Get whole table data*/
  // let arr = [];
  // for (let i = 0; i < rowCount; i++) {
  //   let personObj = {
  //     lastname: "",
  //     firstname: "",
  //     email: "",
  //     due: "",
  //     web: "",
  //   };
  //   for (let j = 0; j < colCount; j++) {
  //     let cellValue = await $(
  //       `//table[@id='table1']/tbody/tr[${i + 1}]/td[${j + 1}]`,
  //     ).getText();
  //     // console.log(`>> Cell value: ${cellValue}`);
  //     if (j === 0) personObj.lastname = cellValue;
  //     if (j === 1) personObj.firstname = cellValue;
  //     if (j === 2) personObj.email = cellValue;
  //     if (j === 3) personObj.due = cellValue;
  //     if (j === 4) personObj.web = cellValue;
  //   }
  //   arr.push(personObj);
  // }
  // console.log(`Whole table: ${JSON.stringify(arr)}`);

  /**3.Get single row [based on condition]  */
  // let arr = [];
  // for (let i = 0; i < rowCount; i++) {
  //   let personObj = {
  //     lastname: "",
  //     firstname: "",
  //     email: "",
  //     due: "",
  //     web: "",
  //   };
  //   for (let j = 0; j < colCount; j++) {
  //     let cellValue = await $(
  //       `//table[@id='table1']/tbody/tr[${i + 1}]/td[${j + 1}]`,
  //     ).getText();
  //     let firstName = await $(
  //       `//table[@id='table1']/tbody/tr[${i + 1}]/td[${2}]`,
  //     ).getText();
  //     // console.log(`>> Cell value: ${cellValue}`);
  //     if (firstName === "Jason") {
  //       if (j === 0) personObj.lastname = cellValue;
  //       if (j === 1) personObj.firstname = cellValue;
  //       if (j === 2) personObj.email = cellValue;
  //       if (j === 3) personObj.due = cellValue;
  //       if (j === 4) personObj.web = cellValue;
  //     }
  //   }
  //   if (personObj.firstname) {
  //     arr.push(personObj);
  //   }
  // }
  // console.log(`Whole table: ${JSON.stringify(arr)}`);

  /**4.Get single column */
  // let arr = [];
  // for (let i = 0; i < rowCount; i++) {
  //   let cellValue = await $(
  //     `//table[@id='table1']/tbody/tr[${i + 1}]/td[4]`,
  //   ).getText();
  //   arr.push(cellValue);
  // }
  // console.log(`>> Single col values ${arr}`);

  /**5. Get single cell value [based on another cell] */

  // let arr = [];
  // for (let i = 0; i < rowCount; i++) {

  //   let price = await $(
  //     `//table[@id='table1']/tbody/tr[${i + 1}]/td[4]`,
  //   ).getText();
  //   let firstName = await $(
  //     `//table[@id='table1']/tbody/tr[${i + 1}]/td[2]`,
  //   ).getText();
  //   if (+price.replace("$", "") > 50) {
  //     arr.push(firstName);
  //   }

  // }
  // console.log(`>> Single col values ${arr}`);

  /**
   *Scrolling
   *VISIBLE PORTION
   *windows object:
   *1.scrollBy
   * y -> [-] window.innerHeight
   */
  // scroll down
  await browser.pause(20000);
  await browser.execute(() => {
    window.scrollBy(0, window.innerHeight);
  });
  //scroll up
  await browser.pause(10000);
  await browser.execute(() => {
    window.scrollBy(0, -window.innerHeight);
  });
  /**
   *INVISIBLE PORTION
   *windows object:
   *1.scrollTo
   * y-> document.body.scrollTop[scrollHeight]
   */
  await browser.pause(10000);
  await browser.execute(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await browser.pause(10000);
  await browser.execute(() => {
    window.scrollTo(0, document.body.scrollTop);
  });
  await browser.debug();
});
