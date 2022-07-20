// jshint esversion:9

"use strict";

const Sale = require("../models/sales");
const Drug = require("../models/drugs");
const Patient = require("../models/patients");
const Inventory = require("../models/inventory");
const Error400 = require("../errors/400");
const output = require("../output/sales");
const middleware = require("../middlewares/sales.middleware");

module.exports = {

  getAllSales(req, res, next) {
    Sale.findAll({
      include: [
        {
          model: Drug,
          include: [
            {
              model: Inventory
            }
          ]
        },
        {
          model: Patient
        }
      ]
    })
      .then(sales => {
        if (sales.length === 0) {
          throw new Error400("No sales found.");
        }

        res.status(200).json({
          success: true,
          message: "Retrieved all sales successfully.",
          sales
        });
      })
      .catch(next);
  },

  makeSale(req, res, next) {

    console.log("Creating sales ...");

    if (!req.body.drug || !req.body.issueUnitQuantity || !req.body.patient) {
      throw new Error400("Invalid request body.");
    }

    const { patient: PatientId } = req.body;

    Patient.findByPk(PatientId)
      .then((patient) => {

        if (!patient) {
          throw new Error400("Patient not found.");
        }

        const {
          drug: DrugId,
          issueUnitPrice: saleIssueUnitPrice,
          issueUnitQuantity: saleIssueUnitQuantity,
          totalPrice: totalSalePrice
        } = req.body;

        return patient.createSale({
          DrugId,
          issueUnitPrice: saleIssueUnitPrice,
          issueUnitQuantity: saleIssueUnitQuantity,
          totalPrice: totalSalePrice,
          UserId: req.user.id
        });
      })
      .then(sale => {

        console.log("Sale created successfully.", sale);

        res.status(201).json({
          success: true,
          message: "Sale created successfully.",
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
