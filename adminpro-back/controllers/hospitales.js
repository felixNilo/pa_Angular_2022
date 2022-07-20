const { response } = require("express");
const Hospital = require("../models/hospitales");

const getHospitales = async (req, res = response) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre email");
  res.status(200).json({
    msje: "getHospitales",
    hospitales,
  });
};

const createHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({ usuario: uid, ...req.body });

  try {
    const hospitalDB = await hospital.save();

    res.status(200).json({
      msje: "createHospital",
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msje: "Error al crear el hospital",
    });
  }
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
