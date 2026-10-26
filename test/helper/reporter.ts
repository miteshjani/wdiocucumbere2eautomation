import allure from "@wdio/allure-reporter";
import { logger } from "./logger.ts";

/**
 * Global reporter used for both logger and allure
 * Curretlt added message goes as a arg to .addStep() of allure, add more param as required
 * Allure can ignore certain steps such as retry steps
 * @param testid
 * @param loglevel
 * @param msg
 * @param toAllure
 * @param issueid
 * 1. Add more param of allure reporter like add issue (to add an JIRA issue .. etc)
 */

// function addStep(
//   testid: string,
//   loglevel: string,
//   msg: string,
//   toAllure = true,
//   issueid = undefined,
// ) {
//   enum Status {
//     PASSED = "passed",
//     BROKEN = "broken",
//     FAILED = "failed",
//     SKIPPED = "skipped",
//   }
//   enum ContentType {
//     TEXT = "text/plain",
//     HTML = "text/html",
//     JSON = "application/json",
//     XML = "application/xml",
//     PNG = "image/png",
//     JPEG = "image/jpeg",
//   }
//   let arr = ["info", "debug", "warn", "error"];
//   if (!testid) throw Error(`Invalid testid: ${testid} field to report step`);
//   if (!msg) logger.error(`Given message: ${msg} is not valid to report`);
//   if (!arr.includes(loglevel))
//     logger.error(
//       `Given loglevel: ${loglevel} is invalid and should be one of these values ${arr}`,
//     );
//   try {
//     if (loglevel === "info") logger.info(`|${testid}|: ${msg}`);
//     if (loglevel === "debug") logger.debug(`|${testid}|: ${msg}`);
//     if (loglevel === "warn") logger.warn(`|${testid}|: ${msg}`);
//     if (loglevel === "error") {
//       logger.error(`|${testid}|: ${msg}`);
//       allure.addStep(
//         msg,
//         {
//           content: msg,
//           name: "Error",
//           type: ContentType.TEXT,
//         },
//         Status.FAILED,
//       );
//     } else {
//       if (toAllure) allure.addStep(msg);
//     }
//     if (issueid) allure.addIssue(issueid);
//   } catch (error) {
//     throw Error(`Error reporting step, ${error}`);
//   }
// }

function addStep(
  testid: string,
  loglevel: string,
  msg: string,
  toAllure = true,
  issueid = undefined,
) {
  enum Status {
    PASSED = "passed",
    BROKEN = "broken",
    FAILED = "failed",
    SKIPPED = "skipped",
  }
  enum ContentType {
    TEXT = "text/plain",
    HTML = "text/html",
    JSON = "application/json",
    XML = "application/xml",
    PNG = "image/png",
    JPEG = "image/jpeg",
  }
  let arr = ["info", "debug", "warn", "error"];
  if (!testid) throw Error(`Invalid testid: ${testid} field to report step`);
  if (!msg) logger.error(`Given message: ${msg} is not valid to report`);
  if (!arr.includes(loglevel))
    logger.error(
      `Given loglevel: ${loglevel} is invalid and should be one of these values ${arr}`,
    );
  try {
    if (loglevel === "info") logger.info(`|${testid}|: ${msg}`);
    if (loglevel === "debug") logger.debug(`|${testid}|: ${msg}`);
    if (loglevel === "warn") logger.warn(`|${testid}|: ${msg}`);
    if (loglevel === "error") {
      logger.error(`|${testid}|: ${msg}`);
      allure.addStep(
        msg,
        {
          content: msg,
          name: "Error",
          type: ContentType.TEXT,
        },
        Status.FAILED,
      );
    } else {
      if (toAllure) allure.addStep(msg);
    }
    if (issueid) allure.addIssue(issueid);
  } catch (error) {
    throw Error(`Error reporting step, ${error}`);
  }
}
export default { addStep };
