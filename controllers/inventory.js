// jshint esversion:9

"use strict";

const Inventory = require("../models/inventory");
const Drug = require("../models/drugs");
const Error400 = require("../errors/400");
const output = require("../output/inventory");

module.exports = {
  getAllInventory: (req, res, next) => {
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

        const inventoryList = output.inventoryList(inventory);

        res.status(200).json({
          success: true,
          inventory: inventoryList
        });
      })
      .catch(next);
  },

  createInventory: (req, res, next) => {

    console.log("Creating inventory ...");

    if (!req.body.drug || !req.body.issueUnit || !req.body.issueUnitPrice || !req.body.issueUnitPerPackSize || !req.body.packSize || !req.body.packSizePrice) {
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

    Drug.findByPk(drug)
      .then(drug => {
        if (!drug) {
          throw new Error400("Drug not found.");
        }
        return drug;
      })
      .then(drug => {

        return drug.createInventory({
          issueUnit: issueUnit,
          issueUnitPrice: issueUnitPrice,
          issueUnitPerPackSize: issueUnitPerPackSize,
          packSize: packSize,
          packSizePrice: packSizePrice,
          blame: req.user.id
        });

      }).then(inventory => {
      res.status(201).json({
        success: true,
        message: "Inventory created successfully.",
        inventory: output.inventory(inventory)
      });
    }).catch(next);
  },

  deleteInventory: (req, res, next) => {

    res.status(200).json({
      success: true,
      message: "Inventory deleted successfully."
    });
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
          inventory: output.inventory(inventory)
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

        return inventory;
      }).then(inventory => {

      return inventory.update({
        drug: drug,
        issueUnit: issueUnit,
        issueUnitPrice: issueUnitPrice,
        issueUnitPerPackSize: issueUnitPerPackSize,
        packSize: packSize,
        packSizePrice: packSizePrice,
        blame: req.user.id
      });
    }).then(inventory => {
      res.status(200).json({
        success: true,
        message: "Inventory updated successfully.",
        inventory: output.inventory(inventory)
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
          blame: req.user.id
        });

      })
      .then(inventory => {
        res.status(200).json({
          success: true,
          message: "Inventory updated successfully.",
          inventory: output.inventory(inventory)
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
