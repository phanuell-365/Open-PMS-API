// jshint esversion:9

"use strict";

module.exports = {
  /**
   * Output the information about a drug.
   */
  drug(_drug, print = false) {
    const drugObj = _drug.toJSON();

    const drugVal = {
      id: drugObj.id,
      name: drugObj.name,
      doseForm: drugObj.doseForm,
      strength: drugObj.strength,
      levelOfUse: drugObj.levelOfUse
    };

    if (print) {
      console.log(drugVal);
    }

    return drugVal;
  },

  drugList(drugs) {
    return drugs.map(drug => {
      return this.drug(drug, true);
    });
  }
};