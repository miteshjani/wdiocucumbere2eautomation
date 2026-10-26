import request from "supertest";
import reporter from "./reporter.ts";

// console.log(`> The typeof request ${typeof request}`);
// console.log(`>> Number of args ${request.length}`);
// console.log(`>> What is the definition of the function ${request.toString()}`);

// let payloadData = {
//   email: "eve.holt@reqres.in",
//   password: "pistol",
// };
async function GET(
  testid: string,
  baseURL: string,
  endpoint: string,
  authToken: string,
  queryparam: object,
) {
  if (!baseURL || !endpoint) {
    throw Error(
      `One of the given values baseURL:${baseURL}, endpoint:${endpoint} is not valid`,
    );
  }
  baseURL = baseURL.trim();
  endpoint = endpoint.trim();
  reporter.addStep(testid, "info", `Making a GET to ${endpoint}`);
  try {
    return await request(baseURL)
      .get(endpoint)
      .query(queryparam)
      .auth(authToken, { type: "bearer" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
  } catch (error) {
    error.message = `Error making a GET call to ${endpoint}, ${error}`;
    throw error;
  }
}

async function POST(
  testid: string,
  baseURL: string,
  endpoint: string,
  authToken: string,
  payload: object,
) {
  if (!baseURL || !endpoint) {
    throw Error(
      `One of the given values baseURL:${baseURL}, endpoint:${endpoint} is not valid`,
    );
  }
  baseURL = baseURL.trim();
  endpoint = endpoint.trim();
  reporter.addStep(testid, "info", `Making a POST to ${endpoint}`);
  try {
    return await request(baseURL)
      .post(endpoint)
      .auth(authToken, { type: "bearer" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(payload);
  } catch (error) {
    error.message = `Error making a POST call to ${endpoint}, ${error}`;
    throw error;
  }
}

export default { GET, POST };
/**
 *https://reqres.in
 * /api/users?page=2
 *{ page: 2 }
 */
