// jshint esversion:9

"use strict";

const Drug = require("../models/drugs");
const Error400 = require("../errors/400");
const output = require("../output/drugs");

module.exports = {

  /**
   * @description - This method is used to get all drugs from the database.
   * @api {get} /drugs/ Get all drugs
   * @param req
   * @param res
   * @param next
   */
  getAllDrugs: (req, res, next) => {
    Drug.findAll()
      .then(drugs => {

        if (drugs.length === 0) {
          throw new Error400("No drugs found.");
        }

        const drugList = output.drugList(drugs);

        res.status(200).json({
          success: true,
          drugs: drugList
        });
      })
      .catch(next);
  },

  addDrug: (req, res, next) => {

    console.log("Creating drug ...");

    if (!req.body.name || !req.body.doseForm || !req.body.strength || !req.body.levelOfUse || !req.body.therapeuticClass) {
      throw new Error400("Invalid request body.");
    }

    const {
      name,
      doseForm,
      strength,
      levelOfUse,
      therapeuticClass
    } = req.body;

    req.user.createDrug({
      name,
      doseForm,
      strength,
      levelOfUse,
      therapeuticClass
    })
      .then(drug => {
        res.status(200).json({
          success: true,
          message: "Drug created successfully.",
          drug: output.drug(drug)
        });
      })
      .catch(next);
  },

  deleteAllDrugs: (req, res) => {
    res.json({
      message: "Hello World!"
    });
  },

  /**
   * @description - This method is used to get a drug from the database.
   * @api {get} /drugs/:id Get drug
   * @param req - The request object
   * @param res - The response object
   * @param next - This is used to pass the control to the next middleware
   */
  getDrugById: (req, res, next) => {

    const { id } = req.params;

    Drug.findByPk(id)
      .then(drug => {

        if (!drug) {
          throw new Error400("Drug not found.");
        }
        res.status(200).json({
          success: true,
          message: "Drug retrieved successfully.",
          drug: output.drug(drug)
        });
      })
      .catch(next);

  },

  updateDrug: (req, res, next) => {
    const { id } = req.params;

    if (!req.body.name || !req.body.doseForm || !req.body.strength || !req.body.levelOfUse || !req.body.therapeuticClass || !req.body.expiryDate) {
      throw new Error400("Invalid request body.");
    }

    const {
      name,
      doseForm,
      strength,
      levelOfUse,
      therapeuticClass
    } = req.body;

    Drug.findByPk(id)
      .then(drug => {

        if (!drug) {
          throw new Error400("Drug not found.");
        }

        return drug.update({
          name: name,
          doseForm: doseForm,
          strength: strength,
          levelOfUse: levelOfUse,
          therapeuticClass: therapeuticClass,
          UserId: req.user.id
        });

      })
      .then(drug => {
        res.status(200).json({
          success: true,
          message: "Drug updated successfully.",
          drug: output.drug(drug)
        });
      })
      .catch(next);
  },

  updateDrugAttributes: (req, res, next) => {
    const { id } = req.params;

    const reqDrug = req.body;

    // Update the drug in the database
    // ...

    Drug.findByPk(id)
      .then((drug) => {
        if (!drug) {
          throw new Error400("Drug not found.");
        }

        return drug.update(reqDrug);
      })
      .then(drug => {
        return drug.update({
            UserId: req.user.id
          }
        );
      })
      .then((drug) => {
        res.status(200).json({
          message: `Drug ${drug.name} updated successfully.`
        });
      })
      .catch(next);
  },

  deleteDrug: (req, res, next) => {
    const { id } = req.params;

    Drug.findByPk(id)
      .then(drug => {

        if (!drug) {
          throw new Error400("Drug not found.");
        }

        return drug.destroy();
      })
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Drug deleted successfully."
        });
      })
      .catch(next);
  }
};
