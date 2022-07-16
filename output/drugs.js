// jshint esversion:9

"use strict";

module.exports = {
  /**
   * Output the information about a drug.
   */
  drug(_drug, print = false) {

    let drugVal = {};

    if (_drug.toJSON) {
      const drugObj = _drug.toJSON();

      drugVal = {
        id: drugObj.id,
        name: drugObj.name,
        doseForm: drugObj.doseForm,
        strength: drugObj.strength,
        levelOfUse: drugObj.levelOfUse
      };

      return drugVal;
    } else {

      drugVal = {
        id: _drug.id,
        name: _drug.name,
        doseForm: _drug.doseForm,
        strength: _drug.strength,
        levelOfUse: _drug.levelOfUse
      };
    }

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