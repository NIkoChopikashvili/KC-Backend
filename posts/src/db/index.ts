import { sequelize } from "./config/index";

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();

    console.log(
      "Connection has been established and models synced successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
