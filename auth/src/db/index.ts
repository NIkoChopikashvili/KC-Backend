import { sequelize } from "./config/index";
import { User, Otp } from "./models";

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    await User.sync({});
    await Otp.sync({});

    console.log(
      "Connection has been established and models synced successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
