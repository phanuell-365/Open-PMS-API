const sequelize = require("config.db");
const bcrypt = require("bcrypt");
const { Model, DataTypes } = require("sequelize");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "pharmacist", "salesperson"],
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    hooks: {
      beforeCreate(attributes, options) {
        attributes.id = attributes.id || DataTypes.UUIDV4();

        attributes.password = (async () => {
          const salt = await bcrypt.genSalt(10);
          return await bcrypt.hash(attributes.password, salt);
        })();
      },
    },
    instanceMethods: {
      comparePassword(password) {
        return bcrypt.compare(password, this.password);
      },
    },
    sequelize,
    modelName: "User",
  }
);
