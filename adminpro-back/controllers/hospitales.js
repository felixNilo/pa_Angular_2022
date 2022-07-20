const { response } = require("express");

const getHospitales = (req, res = response) => {
  res.status(200).json({
    msje: "getHospitales",
  });
};

const createHospital = (req, res = response) => {
  res.status(200).json({
    msje: "createHospital",
  });
};

const updateHospital = (req, res = response) => {
  res.status(200).json({
    msje: "updateHospital",
  });
};

const deleteHospital = (req, res = response) => {
  res.status(200).json({
    msje: "deleteHospital",
  });
};

module.exports = {
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospital,
};
