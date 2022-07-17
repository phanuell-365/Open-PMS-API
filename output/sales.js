// jshint esversion:9

"use strict";

module.exports = {
  /**
   * Output the information about a sale.
   */
  sale(_sale, print = false) {
    const saleObj = _sale.toJSON();

    let saleVal = {
      id: saleObj.id,
      patient: saleObj.patient,
      drug: saleObj.drug,
      quantity: saleObj.quantity,
      price: saleObj.price,
      date: saleObj.date
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
