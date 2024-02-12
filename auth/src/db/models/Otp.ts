// @flow
import { sequelize } from "../config/index";

const DataTypes = require("sequelize");

const Otp = sequelize.define(
  "otp",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    otp: DataTypes.STRING,
    phone: DataTypes.STRING,
    expirationAt: DataTypes.DATE,
    userId: DataTypes.UUID,
  },
  {
    tableName: "otp",
  }
);

export { Otp };
