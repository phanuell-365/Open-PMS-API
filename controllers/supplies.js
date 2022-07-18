// jshint esversion:9

"use strict";

const Supply = require("../models/supplies");
const Drug = require("../models/drugs");
const Order = require("../models/orders");
const Inventory = require("../models/inventory");
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

    if (!req.body.order || !req.body.quantity || !req.body.discount || !req.body.price) {
      throw new Error400("Invalid request body.");
    }

    const {
      order, // orderId
      quantity, // the order's pack size quantity
      price, // the order's pack size price
      discount // the order's discount
    } = req.body;

    Order.findByPk(order)
      .then(order => {
        if (!order) {
          throw new Error400("Order not found.");
        }
        return order.getDrug(); // get the drug associated with the order
      })
      .then((drug) => {
        return drug.getInventory(); // get the inventory associated with the drug
      })
      .then((inventory) => {
        if (!inventory) {
          throw new Error400("Inventory not found.");
        }

        // (async () => {
        //   console.log("The drug in the inventory  ->", await inventory.getDrug());
        // })();
        return inventory.update({
          packSizeQuantity: inventory.packSizeQuantity + quantity
        });
      })
      .then((inventory) => {

        return inventory.getDrug();
      })
      .then((drug) => {
        return drug.getOrders({
          where: {
            DrugId: drug.id
          }
        });
      })
      .then((orders) => {

        console.log("The order ->", orders);
        return orders[0].createSupply({
          quantity,
          price,
          discount,
          UserId: req.user.id
        });
      })
      .then(supply => {
        console.log("The supply is: ", supply);
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
