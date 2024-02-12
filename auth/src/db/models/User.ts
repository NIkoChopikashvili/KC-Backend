// @flow
import { sequelize } from "../config/index";
import { DataTypes, Model, Optional } from "sequelize";

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).

interface UserAttributes {
  id: string;
  phone?: string | null;
  verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: string;
  public phone!: string;
  public verified!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true,
  }
);

export { User };
