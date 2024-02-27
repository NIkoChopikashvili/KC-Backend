// @flow
import { sequelize } from "../config/index";

const DataTypes = require("sequelize");

const Post = sequelize.define(
  "post",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    likeCount: DataTypes.number,
    title: DataTypes.string,
    description: DataTypes.string,
    commentCount: DataTypes.number,
    imageUrl: DataTypes.string,
  },
  {
    tableName: "post",
  }
);

export { Post };
