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

  orderQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Order quantity is required"
      }
    },
    defaultValue: 0,
    comment: "The number of pack sizes of the supply ordered"
  },

  state: {
    type: DataTypes.ENUM,
    values: validOrderStates,
    defaultValue: "pending",
    allowNull: false
  }

}, {
  paranoid: true,
  sequelize,
  modelName: "Order"
});

module.exports = Order;
