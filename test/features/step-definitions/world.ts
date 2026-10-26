import { setWorldConstructor } from "@wdio/cucumber-framework";
// import { chai } from "chai";

class CustomWorld {
  testid: string;
  appId: string;
  constructor() {
    this.appId = "";
    this.testid = "";
  }
}

setWorldConstructor(CustomWorld);
