import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// const db_username: any = process.env.DB_USERNAME;

// const sequelize = new Sequelize("kc", db_username, "postgres", {
//   host: "localhost",
//   dialect: "postgres",
// });

// export { sequelize };

import { configs } from "./config";

const activeConfig = configs["production"];
export const sequelize = new Sequelize(activeConfig.uri, {
  logging: activeConfig.logging,
});
