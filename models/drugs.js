// jshint esversion:9

"use strict";

const sequelize = require("../config/config.db");
const { Model, DataTypes } = require("sequelize");
const {
  validDrugForms,
  validDrugStrengthMeasurements,
  validIssueUnits
} = require("../data/drugs");

class Drug extends Model {
}

Drug.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    doseForm: {
      type: DataTypes.ENUM,
      values: validDrugForms,
      allowNull: false
    },
    strength: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Strength is required"
        }
      },
      isValidDrugStrength(value) {
        if (!value.includes(validDrugStrengthMeasurements)) {
          throw new Error("Invalid drug strength");
        }
      }
    },
    levelOfUse: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    therapeuticClass: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Drug"
  }
);


module.exports = Drug;
