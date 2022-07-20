// jshint esversion:9

"use strict";

const Supply = require("../models/supplies");
const Drug = require("../models/drugs");
const Order = require("../models/orders");
// const Inventory = require("../models/inventory");
const Error400 = require("../errors/400");

module.exports = {
  getAllSupplies: (req, res, next) => {
    Supply.findAll({
        include: [
          {
            model: Order,
            include: [
              {
                model: Drug
              }
            ]
          }
        ]
      }
    )
      .then((supplies) => {
        res.status(200).json({
          success: true,
          supplies: supplies
        });
      })
      .catch(next);
  },

  addSupply: (req, res, next) => {

    const {
      order, // orderId
      packSizeQuantity: supplyPackSizeQuantity, // the order's pack size quantity
      pricePerPackSize, // the order's pack size price
      totalPackSizePrice // the order's total price
    } = req.body;

    Order.findByPk(order)
      .then(order => {

        if (!order) {
          throw new Error400("Order not found.");
        }

        return order.createSupply({
          packSizeQuantity: supplyPackSizeQuantity,
          pricePerPackSize,
          totalPackSizePrice,
          UserId: req.user.id
        });

      })
      .then(supply => {

        res.status(200).json({
          success: true,
          message: "Supply added successfully.",
          supply: supply
        });

      })
      .catch(next);
  },

  delete: (req, res) => {
    res.json({
      message: "Hello World!"
    });
  }
};
