// jshint esversion:9

"use strict";

const Drug = require("../models/drugs");
const Error400 = require("../errors/400");

const calculateTotalPrice = (issueUnitPrice, quantityOfIssueUnitsSold) => {
  return quantityOfIssueUnitsSold * issueUnitPrice;
};

module.exports = {

  updateInventoryPackSizeQuantityAfterSale: (req, res, next) => {

    Promise.resolve()
      .then(
        () => {

          if (!req.body.drug || !req.body.issueUnitQuantity || !req.body.patient) {
            throw new Error400("Invalid request body.");
          }

          return Drug.findByPk(req.body.drug);
        }
      )
      .then(
        (drug) => {

          if (!drug) {
            throw new Error400("Drug not found.");
          }

          // return the drug's inventory
          return drug.getInventory();
        }
      )
      .then(
        (inventory) => {

          const { issueUnitQuantity } = req.body;
          const { issueUnitPrice } = inventory;

          // put the drug's inventory's issue unit price into the request body
          req.body.issueUnitPrice = issueUnitPrice;

          // calculate the total price of the sale
          req.body.totalPrice = calculateTotalPrice(issueUnitPrice, issueUnitQuantity);

          // update the drug's inventory's issue unit quantity
          return inventory.update({
            issueUnitQuantity: inventory.issueUnitQuantity - issueUnitQuantity
          });

        }
      )
      .then(
        () => {
          next();
        }
      )
      .catch(next);
  }

};
