// jshint esversion:9

"use strict";

const sequelize = require("../config/config.db");
const { Model, DataTypes } = require("sequelize");

class Sale extends Model {

}

Sale.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true

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

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Quantity is required"
      }
    }
  },

  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Total is required"
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

  totalAfterDiscount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Total after discount is required"
      }
    }
  }

}, {
  sequelize,
  modelName: "Sale"
});

module.exports = Sale;
