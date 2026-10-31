import { config as baseConfig } from "../wdio.conf.ts";
export const config = Object.assign(baseConfig, {
  // All test env specific key val pair
  environment: "TEST",
  sauceDemoURL: "https://www.saucedemo.com",
  reqresBaseURL: "https://reqres.in",
  nopCommerceBaseURL: "https://admin-demo.nopcommerce.com",
  sqlConfig: {
    user: "admin",
    password: "admin",
    server: "127.0.0.1",
    // server: "localhost",
    port: 56203,
    database: "master",
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
      trustedConnection: true,
    },
  },
});
