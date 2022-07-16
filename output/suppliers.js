// jshint esversion:9

"use strict";

module.exports = {
  /**
   * Output the information about the user.
   */
  supplier(_supplier, print = false) {

    let supplierVal = {};

    if (_supplier.toJSON) {
      const supplierObj = _supplier.toJSON();

      supplierVal = {
        id: supplierObj.id,
        name: supplierObj.name,
        email: supplierObj.email,
        phone: supplierObj.phone
      };
    } else {
      supplierVal = {
        id: _supplier.id,
        name: _supplier.name,
        email: _supplier.email,
        phone: _supplier.phone
      };
    }

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