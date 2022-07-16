// jshint esversion:9

"use strict";

const Error400 = require("../errors/400");
const Drug = require("../models/drugs");

module.exports = {
  isDrugUnique: (req, res, next) => {

    Promise.resolve()
      .then(() => {
        // collect the request body
        const body = req.body;

        // check if the request body is empty
        if (Object.keys(body).length === 0) {

          // if the request body is empty, return a 400 error
          throw new Error400("Invalid request body.");
        }

        return Drug.findAll({
          where: {
            name: body.name,
            doseForm: body.doseForm,
            strength: body.strength,
            levelOfUse: body.levelOfUse
          }
        });
      })
      .then((drugs) => {
        if (drugs.length > 0) {
          throw new Error400("Drug already exists.");
        } else {
          next();
        }
      })
      .catch(next);

  },

  isDrugUniqueUpdate: (req, res, next) => {

    Promise.resolve()
      .then(() => {
        // collect the request body
        const body = req.body;

        return Drug.findAll({
          where: {
            name: body.name,
            doseForm: body.doseForm,
            strength: body.strength,
            levelOfUse: body.levelOfUse
          }
        });
      })
      .then(async (drugs) => {

        // collect the drug id
        const drugId = req.params.id;

        // find the drug by primary key
        const drug = await Drug.findByPk(drugId);

        if (!drug) {
          throw new Error400("Drug not found.");
        }

        // collect the drug ids
        const drugIds = drugs.map((drug) => drug.id);

        console.log("drugIds: ", drugIds);
        console.log("drugId: ", drugId);
        console.log("drugIds.includes(drugId): ", drugIds.includes(drugId));

        // check if the drug id is in the list of drug ids
        if (drugIds.includes(drugId)) {
          next();
        } else {
          throw new Error400("Drug already exists.");
        }

      })
      .catch(next);

  },

  isRequestBodyEmpty: (req, res, next) => {

    Promise.resolve()
      .then(() => {
        // collect the request body
        const body = req.body;

        // check if the request body is empty
        if (Object.keys(body).length === 0) {

          // if the request body is empty, return a 400 error
          throw new Error400("Invalid request body.");
        } else {
          next();
        }
      })
      .catch(next);

  }
};