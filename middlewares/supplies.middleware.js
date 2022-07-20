// jshint esversion:9

"use strict";

const Order = require("../models/orders");
const Error400 = require("../errors/400");

const calculateTotalPackSizePrice = (reqBody) => {
  const {
    packSizeQuantity,
    pricePerPackSize
  } = reqBody;

  return packSizeQuantity * pricePerPackSize;
};

module.exports = {

  /**
   * Update the quantity of drugs in the inventory after a supply has been made.
   * It is assumed that the supply is made in whole pack sizes.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function.
   */
  updateInventoryPackSizeQuantity: (req, res, next) => {

    Promise.resolve()
      .then(
        () => {

          if (!req.body.order || !req.body.packSizeQuantity || !req.body.pricePerPackSize) {
            throw new Error400("Invalid request body.");
          }

          // calculate the total price of the supply
          // put the total pack size price in the request body
          req.body.totalPackSizePrice = calculateTotalPackSizePrice(req.body);

          // get the order

          const { order: OrderId } = req.body;

          return Order.findByPk(OrderId);

        }
      )
      .then(
        (order) => {

          if (!order) {
            throw new Error400("Order not found.");
          }

          // update the order quantity and the state of the order

          const { orderQuantity } = order;

          const currOrderQuantity = Number.parseInt(orderQuantity);

          const { packSizeQuantity } = req.body;

          const currPackSizeQuantity = Number.parseInt(packSizeQuantity);

          const newOrderQuantity = currOrderQuantity - currPackSizeQuantity;

          if (newOrderQuantity < 0) {
            order.set({
              orderQuantity: newOrderQuantity,
              state: "delivered",
              UserId: req.user.id
            });
          } else if (newOrderQuantity === 0) {
            order.set({
              orderQuantity: newOrderQuantity,
              state: "delivered",
              UserId: req.user.id
            });
          } else if (newOrderQuantity > 0) {
            order.set({
              orderQuantity: newOrderQuantity,
              state: "active",
              UserId: req.user.id
            });
          }

          return order.save();

        }
      )
      .then(
        (order) => {

          // log the order update
          console.log(`Order ${order.id} updated.`);

          if (!order) {
            throw new Error400("Order not found.");
          }

          return order.getDrug(); // get the drug associated with the order

        }
      )
      .then(
        (drug) => {

          return drug.getInventory(); // get the inventory associated with the drug

        }
      )
      .then(
        (inventory) => {

          // update the issue unit quantity and the pack size quantity of the inventory

          if (!inventory) {
            throw new Error400("Inventory not found.");
          }

          const { packSizeQuantity: reqPackSQ } = req.body;

          const supplyPackSizeQuantity = Number.parseInt(reqPackSQ);

          const { packSizeQuantity: invPackSQ } = inventory;

          const currInvPackSizeQuantity = Number.parseInt(invPackSQ);

          const newPackSizeQuantity = currInvPackSizeQuantity + supplyPackSizeQuantity;

          // update the issue unit quantity of the drug in the inventory

          const { issueUnitQuantity } = inventory;

          const currIssueUnitQuantity = Number.parseInt(issueUnitQuantity);

          const { issueUnitPerPackSize } = inventory;

          const currIssueUnitPerPackSize = Number.parseInt(issueUnitPerPackSize);

          const newIssueUnitQuantity = currIssueUnitQuantity + (currIssueUnitPerPackSize * supplyPackSizeQuantity);

          return inventory.update({
            packSizeQuantity: newPackSizeQuantity,
            issueUnitQuantity: newIssueUnitQuantity,
            UserId: req.user.id
          });

        }
      )
      .then(
        (inventory) => {

          // update the order quantity of the drug in the inventory

          const { orderQuantity: currOrderQuantity } = inventory;

          const { packSizeQuantity: supplyPackSizeQuantity } = req.body;

          const newOrderQuantity = currOrderQuantity - supplyPackSizeQuantity;

          return inventory.update({
            orderQuantity: newOrderQuantity,
            UserId: req.user.id
          });
        }
      )
      .then(
        (_inventory) => {

          console.log("Inventory updated.");

          // call the next middleware
          next();
        }
      )
      .catch(next);
  }
};
