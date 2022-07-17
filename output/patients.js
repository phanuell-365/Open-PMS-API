// jshint esversion:9

"use strict";

module.exports = {
  /**
   * Output the information about a patient.
   */
  patient(_patient, print = false) {

    const patientObj = _patient.toJSON();

    let patientVal = {
      id: patientObj.id,
      name: patientObj.name,
      dob: patientObj.dob,
      age: patientObj.age,
      phone: patientObj.phone,
      email: patientObj.email
    };

    if (print) {
      console.log(patientVal);
    }

    return patientVal;
  },

  patientList(patients) {
    return patients.map(patient => {
      return this.patient(patient);
    });
  }
};
