import sql from "mssql";
import report from "./reporter.ts";
// import constants from "../../data/constant.json" with { type: "json" };

// const sqlConfig = {
//   user: "admin",
//   password: "admin",
//   // database: "admin",
//   // server: "R_P_JANI\\SQLEXPRESS",
//   server: "127.0.0.1",
//   port: 56203,
//   database: "master",
//   options: {
//     // instanceName: "SQLEXPRESS",
//     encrypt: true, // for azure
//     trustServerCertificate: true, // change to true for local dev / self-signed certs
//     trustedConnection: true,
//   },
// };

// let query = `select top 1 * from [sample].[dbo].[Employees] where [CreatedDate] = '2026-10-29 09:11:34.697'`;

// (async () => {
//   try {
//     const result = await sql.connect(sqlConfig).then((pool) => {
//       return pool.query(query);
//     });
//     console.log(result);
//   } catch (error) {
//     console.error(`SQL Error: ${error}`);
//   }
// })();

// (async () => {
//   try {
//     // make sure that any items are correctly URL encoded in the connection string
//     await sql.connect(sqlConfig);
//     const result =
//       await sql.query`select top 1 * from [sample].[dbo].[Employees] where [CreatedDate] = '2026-10-29 09:11:34.697'`;
//     console.log(result);
//   } catch (err) {
//     console.error(`SQL Error: ${err}`);
//   } finally {
//     process.exit(0);
//   }
// })();

// async function test() {
//   const pool = await sql.connect(sqlConfig);

//   const result = await pool.request().query(query);

//   console.log(result);

//   await pool.close();
// }

// test().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });

/**
 * Executes given query
 * @param testid
 * @param config
 * @param query
 * @returns db result object
 */
async function executeQuery(testid: string, config: any, query: string) {
  // Truthy value check
  if (!query) throw Error(`Given query: ${query} is not valid`);
  console.log(testid);
  report.addStep(testid, "info", "Executing the db query...");
  const pool1 = new sql.ConnectionPool(config);
  const pool1Connect = pool1.connect();
  pool1.on("error", (err) => {
    throw err;
  });
  await pool1Connect;
  try {
    const request = pool1.request();
    const result = await request.query(query);
    console.log(result.recordset[0]);
    return result;
  } catch (err) {
    throw err;
  }
}

// async function executeQuery(testid: string, config: any, query: string) {
//   // Truthy value check
//   if (!query) throw Error(`Given query: ${query} is not valid`);
//   console.log(testid);
//   // report.addStep(testid, "info", "Executing the db query...");
//   const pool = await sql.connect(config);

//   const result = await pool.request().query(query);

//   console.log(result);

//   await pool.close();

//   return result;
// }

export default { executeQuery };
