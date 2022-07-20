// jshint esversion:9

"use strict";

const sequelize = require("../config/config.db");
const { Model, DataTypes } = require("sequelize");

class Supply extends Model {

}

Supply.init({

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true
  },

  packSizeQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Quantity is required"
      }
    }
  },

  pricePerPackSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Price is required"
      }
    }
  },

  totalPackSizePrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }

}, {
  // hooks: {
  //   beforeCreate(attributes, options) {
  //     attributes.totalPackSizePrice = attributes.pricePerPackSize * attributes.packSizeQuantity;
  //   }
  // },
  sequelize,
  modelName: "Supply"
});

module.exports = Supply;
