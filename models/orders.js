// jshint esversion:9

"use strict";

const sequelize = require("../config/config.db");
const { DataTypes, Model } = require("sequelize");
const { validOrderStates } = require("../data/orders");

class Order extends Model {

}

Order.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false
  },

  packSize: {
    type: DataTypes.STRING,
    allowNull: false
  },

  packSizeQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Pack size cost is required"
      }
    }
  },

  state: {
    type: DataTypes.ENUM,
    values: validOrderStates,
    defaultValue: "pending",
    allowNull: false
  },

  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Date is required"
      }
    }
  }
}, {
  sequelize,
  modelName: "Order"
});

module.exports = Order;