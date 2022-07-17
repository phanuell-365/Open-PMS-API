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

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Quantity is required"
      }
    }
  },

  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Price is required"
      }
    }
  },

  discount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Discount is required"
      }
    }
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
  },

  blame: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {}
    },
    comment: "Who is responsible for the supply"
  }
}, {
  sequelize,
  modelName: "Supply"
});

module.exports = Supply;
