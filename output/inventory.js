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

    if (inventoryObj.Drug) {

      inventoryVal = {
        id: inventoryObj.id,
        // drug: inventoryObj.drug,
        issueUnit: inventoryObj.issueUnit,
        issueUnitPrice: inventoryObj.issueUnitPrice,
        issueUnitQuantity: inventoryObj.issueUnitQuantity,
        packSize: inventoryObj.packSize,
        packSizeQuantity: inventoryObj.packSizeQuantity,
        status: inventoryObj.status,
        drug: drugOutput.drug(inventoryObj.Drug),
        // supplier: orderObj.supplier
      };
    } else {
      inventoryVal = {
        id: inventoryObj.id,
        issueUnit: inventoryObj.issueUnit,
        issueUnitPrice: inventoryObj.issueUnitPrice,
        issueUnitQuantity: inventoryObj.issueUnitQuantity,
        packSize: inventoryObj.packSize,
        packSizeQuantity: inventoryObj.packSizeQuantity,
        status: inventoryObj.status,
        drug: inventoryObj.DrugId,
      };
    }

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
