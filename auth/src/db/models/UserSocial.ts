// @flow
import { sequelize } from "../config/index";

const DataTypes = require("sequelize");

const UserSocial = sequelize.define(
  "UserSocials",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    socialId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: DataTypes.STRING,
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    source: {
      type: DataTypes.ENUM("facebook", "google", "apple"),
      allowNull: false,
    },
  },
  {
    tableName: "UserSocials",
  }
);

export { UserSocial };
