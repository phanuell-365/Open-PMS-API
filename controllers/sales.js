// jshint esversion:9

"use strict";

const Sale = require("../models/sales");
const Drug = require("../models/drugs");
const Inventory = require("../models/inventory");
const Error400 = require("../errors/400");
const output = require("../output/sales");

module.exports = {

  getAllSales(req, res, next) {
    Sale.findAll({
      include: [
        {
          model: Drug
        }
      ]
    })
      .then(sales => {
        if (sales.length === 0) {
          throw new Error400("No sales found.");
        }

        const salesList = output.salesList(sales);

        res.status(200).json({
          success: true,
          message: "Retrieved all sales successfully.",
          sales: salesList
        });
      })
      .catch(next);
  },

  createSale(req, res, next) {

    console.log("Creating sales ...");

    if (!req.body.drug || !req.body.quantity || !req.body.price) {
      throw new Error400("Invalid request body.");
    }

    const {
      drug, // drugId
      quantity, // quantity
      price // price
    } = req.body;

    Drug.findByPk(drug)
      .then(drug => {
        if (!drug) {
          throw new Error400("Drug not found.");
        }
        return drug;
      })
      .then(drug => {
        return drug.createSale({
          quantity,
          price
        });
      })
      .then(sale => {
        res.status(201).json({
          success: true,
          sale: sale
        });
      })
      .catch(next);
  },

  // cancel sales
  deleteSales(req, res, next) {
  },

  // get sales by id
  getSalesById(req, res, next) {

    const { id } = req.params;

    Sale.findByPk(id, {
      include: [
        {
          model: Drug
        }
      ]
    })
      .then(sale => {
        if (!sale) {
          throw new Error400("Sales not found.");
        }

        res.status(200).json({
          success: true,
          sale: output.sale(sale)
        });
      })
      .catch(next);
  },

  // update sales
  updateSales(req, res, next) {
    const { id } = req.params;

    if (!req.body.drug || !req.body.quantity || !req.body.price) {
      throw new Error400("Invalid request body.");
    }

    const {
      drug, // drugId
      quantity, // quantity
      price // price
    } = req.body;

    Sale.findByPk(id)
      .then(sale => {
        if (!sale) {
          throw new Error400("Sales not found.");
        }
        return sale;
      })
      .then(sale => {
        return sale.update({
          quantity,
          price
        });
      })
      .then(sale => {
        res.status(200).json({
          success: true,
          sale: output.sale(sale)
        });
      })
      .catch(next);
  },

  // update sales attributes
  updateSalesAttributes(req, res, next) {
    const { id } = req.params;

    if (!req.body.drug || !req.body.quantity || !req.body.price) {
      throw new Error400("Invalid request body.");
    }

    const reqBody = req.body;

    Sale.findByPk(id)
      .then(sale => {
        if (!sale) {
          throw new Error400("Sales not found.");
        }
        return sale;
      })
      .then(sale => {
        return sale.update(reqBody);
      })
      .then(sale => {
        res.status(200).json({
          success: true,
          sale: output.sale(sale)
        });
      })
      .catch(next);
  },

  // delete sales
  deleteSalesById(req, res, next) {
    const { id } = req.params;

    Sale.findByPk(id)
      .then(sale => {
        if (!sale) {
          throw new Error400("Sales not found.");
        }
        return sale;
      })
      .then(sale => {
        return sale.destroy();
      })
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Sales deleted successfully."
        });
      })
      .catch(next);
  }

};
