import { Model, DataTypes } from "../deps.ts";

class User extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
  };

  static defaults = {
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export { User };
