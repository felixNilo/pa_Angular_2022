const { response } = require("express");

const getMedicos = (req, res = response) => {
  res.status(200).json({
    msje: "getMedicos",
  });
};

const createMedicos = (req, res = response) => {
  res.status(200).json({
    msje: "createMedico>",
  });
};

const updateMedico = (req, res = response) => {
  res.status(200).json({
    msje: "updateMedico",
  });
};

const deleteMedico = (req, res = response) => {
  res.status(200).json({
    msje: "deleteMedico",
  });
};

module.exports = {
  getMedicos,
  createMedicos,
  updateMedico,
  deleteMedico,
};
