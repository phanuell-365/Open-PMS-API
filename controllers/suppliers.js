// jshint esversion:9

"use strict";

const Supplier = require("../models/suppliers");
const output = require("../output/suppliers");
const Error401 = require("../errors/401");
const Error400 = require("../errors/400");

module.exports = {

  /**
   * @api {post} /api/suppliers/create Create
   * @param req
   * @param res
   * @param next
   */
  getAllSuppliers: (req, res, next) => {

    Supplier.findAll()
      .then((suppliers) => {
        res.status(200).json({
          success: true,
          message: "Suppliers retrieved successfully.",
          suppliers: output.supplierList(suppliers)
        });
      })
      .catch(next);
  },

  addNewSupplier: (req, res, next) => {

    console.log("Creating supplier ...");

    if (!req.body.name || !req.body.email || !req.body.phone) {
      throw new Error400("Invalid request body.");
    }

    const {
      name,
      email,
      phone
    } = req.body;

    return req.user.createSupplier({
      name,
      email,
      phone
    })
      .then((supplier) => {
        res.status(200).json({
          success: true,
          message: "Supplier created successfully.",
          supplier: output.supplier(supplier)
        });
      })
      .catch(next);
  },

  deleteSuppliers: (req, res, next) => {

    res.status(200).json({
      success: true,
      message: "Supplier deleted successfully."
    });
  },

  getSupplier: (req, res, next) => {

    console.log("Finding supplier ...");

    if (!req.params.id) {
      throw new Error400("Invalid request body.");
    }

    const { id } = req.params;

    Supplier.findByPk(id)
      .then((supplier) => {

        if (!supplier) {
          throw new Error400("Supplier not found.");
        }
        res.status(200).json({
          success: true,
          message: "Supplier retrieved successfully.",
          supplier: output.supplier(supplier)
        });
      })
      .catch(next);

  },

  updateSupplier: (req, res, next) => {

    console.log("Updating supplier ...");

    if (!req.params.id) {
      throw new Error400("Invalid supplier id.");
    }

    const { id } = req.params;

    if (!req.body.name || !req.body.email || !req.body.phone) {
      throw new Error400("Invalid request body.");
    }

    const {
      name,
      email,
      phone
    } = req.body;

    Supplier.findByPk(id)
      .then((supplier) => {

        if (!supplier) {
          throw new Error400("Supplier not found.");
        }

        return supplier.update({
          name: name,
          email: email,
          phone: phone
        });

      })
      .then((supplier) => {
        res.status(200).json({
          success: true,
          message: "Supplier updated successfully.",
          supplier: output.supplier(supplier)
        });
      })
      .catch(next);

  },

  updateSupplierAttributes: (req, res, next) => {

    const { id } = req.params;

    const reqBody = req.body;

    // Update the supplier in the database
    // ...

    Supplier.findByPk(id)
      .then((supplier) => {

        if (!supplier) {
          throw new Error400("Supplier not found.");
        }

        return supplier.update(reqBody);

      })
      .then((supplier) => {
        res.status(200).json({
          success: true,
          message: "Supplier updated successfully.",
          supplier: output.supplier(supplier)
        });
      })
      .catch(next);
  },

  deleteSupplier: (req, res, next) => {

    const { id } = req.params;

    // Delete the supplier from the database
    // ...

    Supplier.findByPk(id)
      .then((supplier) => {

        if (!supplier) {
          throw new Error400("Supplier not found.");
        }

        return supplier.destroy();

      })
      .then((supplier) => {
        res.status(200).json({
          success: true,
          message: "Supplier deleted successfully.",
          supplier: output.supplier(supplier)
        });
      })
      .catch(next);
  }
};
