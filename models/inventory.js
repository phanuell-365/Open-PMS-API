// jshint esversion:9

"use strict";

const sequelize = require("../config/config.db");
const { Model, DataTypes } = require("sequelize");
const { validIssueUnits } = require("../data/drugs");

class Inventory extends Model {

}

Inventory.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },

    issueUnit: {
      type: DataTypes.ENUM,
      values: validIssueUnits,
      allowNull: false,
      comment: "The unit of issue for the drug, e.g. TAB, CAP, etc."
    },

    issueUnitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: "The price per issue unit, e.g. ksh. 10.00"
    },

    issueUnitPerPackSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "The number of issue units per pack size, e.g. 1 Box = 100 TABs"
    },

    issueUnitQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "The number of issue units in the inventory, e.g. 100 Tabs",
      defaultValue: 0
    },

    packSize: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Pack size of the drug, e.g. Box, Bottle, etc."
    },

    packSizeQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "The number of pack sizes in the inventory, e.g. 100 Boxes",
      defaultValue: 0
    },

    packSizePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: "The price of one pack size, e.g. ksh. 1000.00"
    },

    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "The expiry date of the drug"
    }

  },
  {
    hooks: {
      beforeUpdate(instance, options) {
        // if (instance.changed("packSizeQuantity")) {
        //   instance.issueUnitQuantity = instance.packSizeQuantity * instance.issueUnitPerPackSize;
        // }

        instance.issueUnitQuantity = instance.packSizeQuantity * instance.issueUnitPerPackSize;
      }
    },
    paranoid: true,
    sequelize,
    modelName: "Inventory"
  });

// Inventory.sync({ force: true });

module.exports = Inventory;
