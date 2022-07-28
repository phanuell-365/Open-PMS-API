// jshint esversion:9

"use strict";

const Order = require("../models/orders");
const Drug = require("../models/drugs");
const Supplier = require("../models/suppliers");
// const Inventory = require("../models/inventory");
const Error400 = require("../errors/400");
const output = require("../output/orders");
const { Op } = require("sequelize");

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

        output.fewOrderDetails(orders[0], true);
        //
        // const orderList = output.orderList(orders);

        console.log(Order);
        res.status(200).json({
          success: true,
          orders: output.orderList(orders)
        });
      })
      .catch(next);
  },

  makeAnOrder: (req, res, next) => {

    console.log("Creating order ...");

    if (!req.body.drug || !req.body.orderQuantity || !req.body.supplier) {
      throw new Error400("Invalid request body.");
    }

    const {
      drug, // drugId
      supplier, // supplierId
      orderQuantity // orderQuantity
    } = req.body;

    Drug.findByPk(drug)
      .then(_drug => {
        if (!_drug) {
          throw new Error400("Drug not found.");
        }

        return _drug.createOrder({
          orderQuantity,
          SupplierId: supplier,
          UserId: req.user.id
        });
      })
      .then(order => {

        res.status(200).json({
          success: true,
          message: "Order created successfully.",
          order
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
        [Op.or]: [
          { status: "pending" },
          { status: "active" }
        ]
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

        res.status(200).json({
          success: true,
          message: "Order retrieved successfully.",
          order: output.fewOrderDetails(order)
        });
      })
      .catch(next);

  }
};
