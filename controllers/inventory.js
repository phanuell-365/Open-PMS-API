// jshint esversion:9

"use strict";

const Inventory = require("../models/inventory");
const Drug = require("../models/drugs");
const Error400 = require("../errors/400");
const output = require("../output/inventory");

module.exports = {
  getAllInventories: (req, res, next) => {
    Inventory.findAll({
      include: [
        {
          model: Drug
        }
      ]
    })
      .then(inventory => {
        if (inventory.length === 0) {
          throw new Error400("No inventory found.");
        }

        res.status(200).json({
          success: true,
          inventory: output.inventoryList(inventory)
        });
      })
      .catch(next);
  },

  addInventory: (req, res, next) => {

    console.log("Creating inventory ...");

    if (!req.body.drug || !req.body.issueUnit || !req.body.issueUnitPrice || !req.body.issueUnitPerPackSize || !req.body.packSize || !req.body.packSizePrice || !req.body.expiryDate) {
      throw new Error400("Invalid request body.");
    }

    const {
      drug, // drugId
      issueUnit, // issueUnit
      issueUnitPrice, // issueUnitPrice
      issueUnitPerPackSize, // issueUnitPerPackSize
      packSize, // packSize
      packSizePrice, // packSizePrice
      expiryDate // expiryDate
    } = req.body;

    Drug.findByPk(drug)
      .then(drug => {
        if (!drug) {
          throw new Error400("Drug not found.");
        }
        return drug;
      })
      .then(async (drug) => {

        // before creating the inventory, check if the drug is already in the database
        const existingDrugInventory = await drug.getInventory();

        if (existingDrugInventory) {
          throw new Error400("The drug is already in the inventory.");
        } else {
          return drug;
        }
      })
      .then(drug => {
        return drug.createInventory({
          issueUnit: issueUnit,
          issueUnitPrice: issueUnitPrice,
          issueUnitPerPackSize: issueUnitPerPackSize,
          packSize: packSize,
          packSizePrice: packSizePrice,
          expiryDate: expiryDate,
          UserId: req.user.id
        });

      })
      .then(inventory => {
        // req.user.setInventories([inventory]);
        res.status(201).json({
          success: true,
          message: "Inventory created successfully.",
          inventory
        });
      }).catch(next);
  },

  deleteAllInventories: (req, res, next) => {
    Inventory.destroy({
      where: {}
    })
      .then(() => {
        res.status(200).json({
          success: true,
          message: "All inventories deleted successfully."
        });
      }).catch(next);
  },

  getInventoryById: (req, res, next) => {

    console.log("Getting inventory ...");

    if (!req.params.id) {
      throw new Error400("Invalid request body.");
    }

    const { id } = req.params;

    Inventory.findByPk(id)
      .then(inventory => {

        if (!inventory) {
          throw new Error400("Inventory not found.");
        }

        res.status(200).json({
          success: true,
          message: "Inventory retrieved successfully.",
          inventory
        });
      })
      .catch(next);
  },

  updateInventory: (req, res, next) => {

    console.log("Updating inventory ...");

    if (!req.params.id || !req.body.drug || !req.body.issueUnit || !req.body.issueUnitPrice || !req.body.issueUnitPerPackSize || !req.body.packSize || !req.body.packSizePrice) {
      throw new Error400("Invalid request body.");
    }

    const {
      drug, // drugId
      issueUnit, // issueUnit
      issueUnitPrice, // issueUnitPrice
      issueUnitPerPackSize, // issueUnitPerPackSize
      packSize, // packSize
      packSizePrice // packSizePrice
    } = req.body;

    const { id } = req.params;

    Inventory.findByPk(id)
      .then(inventory => {

        if (!inventory) {
          throw new Error400("Inventory not found.");
        }

        return inventory.update({
          DrugId: drug,
          issueUnit: issueUnit,
          issueUnitPrice: issueUnitPrice,
          issueUnitPerPackSize: issueUnitPerPackSize,
          packSize: packSize,
          packSizePrice: packSizePrice,
          UserId: req.user.id
        });
      }).then(inventory => {
      res.status(200).json({
        success: true,
        message: "Inventory updated successfully.",
        inventory
      });
    }).catch(next);
  },

  updateInventoryAttributes: (req, res, next) => {

    const { id } = req.params;

    const reqBody = req.body;

    // Update the inventory attributes
    // ...

    Inventory.findByPk(id)
      .then(inventory => {

        if (!inventory) {
          throw new Error400("Inventory not found.");
        }

        return inventory.update(reqBody);
      })
      .then(inventory => {
        return inventory.update({
          UserId: req.user.id
        });
      })
      .then(inventory => {
        res.status(200).json({
          success: true,
          message: "Inventory updated successfully.",
          inventory
        });
      })
      .catch(next);
  },

  deleteInventoryById: (req, res, next) => {

    const { id } = req.params;

    Inventory.findByPk(id)
      .then(inventory => {

        if (!inventory) {
          throw new Error400("Inventory not found.");
        }

        return inventory.destroy();
      }).then(() => {
      res.status(200).json({
        success: true,
        message: "Inventory deleted successfully."
      });
    }).catch(next);
  }
};
