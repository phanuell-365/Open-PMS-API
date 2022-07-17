// jshint esversion:9

"use strict";

const Order = require("../models/orders");
const Drug = require("../models/drugs");
const Supplier = require("../models/suppliers");
const Error400 = require("../errors/400");
const output = require("../output/orders");

module.exports = {
  getAllOrders: (req, res, next) => {
    Order.findAll({
      include: [
        {
          model: Drug
        },
        {
          model: Supplier
        }
      ]
    })
      .then(orders => {
        if (orders.length === 0) {
          throw new Error400("No orders found.");
        }

        const orderList = output.orderList(orders);

        res.status(200).json({
          success: true,
          orders: orderList
        });
      })
      .catch(next);
  },

  createOrder: (req, res, next) => {

    console.log("Creating order ...");

    if (!req.body.drug || !req.body.packSize || !req.body.packSizeQuantity || !req.body.supplier) {
      throw new Error400("Invalid request body.");
    }

    const {
      drug, // drugId
      packSize, // packSize
      packSizeQuantity, // packSizeQuantity
      date, // date
      supplier // supplierId
    } = req.body;

    Drug.findByPk(drug)
      .then(drug => {
        if (!drug) {
          throw new Error400("Drug not found.");
        }
        return drug;
      })
      .then(drug => {

        return drug.createOrder({
          packSize: packSize,
          packSizeQuantity: packSizeQuantity,
          SupplierId: supplier,
          date: date || new Date()
        });
      })
      .then(order => {
        res.status(200).json({
          success: true,
          message: "Order created successfully.",
          order: output.order(order)
        });
      })
      .catch(next);

  },

  cancelOrders: (req, res, next) => {

    // mark all deleted orders as cancelled
    Order.update({
      status: "cancelled"
    }, {
      where: {
        status: "active"
      }
    })
      .then(() => {
        res.status(200).json({
          success: true,
          message: "All active orders have been cancelled."
        });
      })
      .catch(next);

  },

  getOrderById: (req, res, next) => {

    console.log("Finding order ...");

    if (!req.params.id) {
      throw new Error400("Invalid request body.");
    }

    const { id } = req.params;

    Order.findByPk(id, {
      include: [
        {
          model: Drug
        },
        {
          model: Supplier
        }
      ]
    })
      .then(order => {
        if (!order) {
          throw new Error400("Order not found.");
        }

        console.log("The order is: ", order.toJSON());

        res.status(200).json({
          success: true,
          message: "Order retrieved successfully.",
          order: output.order(order)
        });
      })
      .catch(next);

  }
};
