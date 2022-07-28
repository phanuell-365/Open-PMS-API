// jshint esversion:9

"use strict";

const drugOutput = require("../output/drugs");


module.exports = {
  /**
   * Output the information about an inventory.
   */

  inventory(_inventory, print = false) {
    const inventoryObj = _inventory.toJSON();
    let inventoryVal = {};

    const dayOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };

    inventoryVal = {
      id: inventoryObj.id,
      drug: inventoryObj.Drug.name,
      issueUnit: inventoryObj.issueUnit,
      issueUnitPrice: inventoryObj.issueUnitPrice,
      issueUnitPerPackSize: inventoryObj.issueUnitPerPackSize,
      packSize: inventoryObj.packSize,
      packSizePrice: inventoryObj.packSizePrice,
      expiryDate: inventoryObj.expiryDate.toLocaleDateString("en-US", dayOptions)
    };

    if (print) {
      console.log(inventoryVal);
    }

    return inventoryVal;
  },

  inventoryList(inventories) {
    return inventories.map(inventory => {
      return this.inventory(inventory);
    });
  }
};
