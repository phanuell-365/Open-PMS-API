// jshint esversion:9

"use strict";

module.exports = {
  /**
   * Output the information about a sale.
   */
  sale(_sale, print = false) {
    const saleObj = _sale.toJSON();

    const dayOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"

    };

    let saleVal = {
      id: saleObj.id,
      patient: saleObj.Patient.name,
      drug: saleObj.Drug.name,
      issueUnitQuantity: saleObj.issueUnitQuantity,
      totalPrice: saleObj.totalPrice,
      date: saleObj.createdAt.toLocaleDateString("en-US", dayOptions)
    };

    if (print) {
      console.log(saleVal);
    }

    return saleVal;
  },

  saleList(sales) {
    return sales.map(sale => {
      return this.sale(sale);
    });
  }
};
