// jshint esversion:9

"use strict";

const sequelize = require("../config/config.db");
const { Model, DataTypes } = require("sequelize");

class Patient extends Model {

  static calculateAge(birthDayDate) {
    const today = new Date();
    const birthDate = new Date(birthDayDate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  }

}

Patient.init({
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
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: {
          msg: "Email is required"
        }
      }
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Date of birth is required"
        }
      }
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false
      // validate: {
      //   notNull: {
      //     msg: "Age is required"
      //   }
      // }
    }

  },
  {
    hooks: {
      beforeCreate: (patient, options) => {
        patient.age = Patient.calculateAge(patient.dob);
      },
      beforeUpdate: (patient, options) => {
        patient.age = Patient.calculateAge(patient.dob);
      }
    },
    paranoid: true,
    sequelize,
    modelName: "Patient"
  });

module.exports = Patient;
