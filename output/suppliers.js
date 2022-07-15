// jshint esversion:9

"use strict";

module.exports = {
  /**
   * Output the information about the user.
   */
  supplier(_supplier, print = false) {
    const supplierObj = _supplier.toJSON();

    const supplierVal = {
      id: supplierObj.id,
      name: supplierObj.name,
      email: supplierObj.email,
      phone: supplierObj.phone
    };

    if (print) {
      console.log(supplierVal);
    }

    return supplierVal;
  },

  supplierList(suppliers) {
    return suppliers.map(supplier => {
      return this.supplier(supplier, true);
    });
  }
};