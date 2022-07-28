// jshint esversion:9

"use strict";

const drugOutput = require("../output/drugs");
const supplierOutput = require("../output/suppliers");

module.exports = {
  /**
   * Output the information about an order.
   */

  order(_order, print = false) {
    const orderObj = _order.toJSON();
    let orderVal = {};

    if (orderObj.Drug && orderObj.Supplier) {

      orderVal = {
        id: orderObj.id,
        // drug: orderObj.drug,
        quantity: orderObj.quantity,
        packSize: orderObj.packSize,
        packSizeQuantity: orderObj.packSizeQuantity,
        date: orderObj.date,
        status: orderObj.status,
        drug: drugOutput.drug(orderObj.Drug),
        supplier: supplierOutput.supplier(orderObj.Supplier)
        // supplier: orderObj.supplier
      };
    } else {
      orderVal = {
        id: orderObj.id,
        quantity: orderObj.quantity,
        date: orderObj.createdAt,
        state: orderObj.state,
        drug: orderObj.DrugId,
        supplier: orderObj.SupplierId
      };
    }

    if (print) {
      console.log(orderVal);
    }

    return orderVal;
  },

  fewOrderDetails(_order, print = false) {

    const orderObj = _order.toJSON();
    let orderVal = {};

    const dayOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    };

    orderVal = {
      id: orderObj.id,
      orderQuantity: orderObj.orderQuantity,
      state: orderObj.state,
      drug: orderObj.Drug.name,
      supplier: orderObj.Supplier.name,
      date: orderObj.createdAt.toLocaleDateString("en-US", dayOptions)
    };

    if (print) {
      console.log(orderVal);
    }

    return orderVal;
  },

  orderList(orders) {
    return orders.map(order => {
      return this.fewOrderDetails(order);
    });
  }
};
