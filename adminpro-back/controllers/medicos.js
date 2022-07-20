const { response } = require("express");
const Medico = require("../models/medicos");

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre")
    .populate("hospital", "nombre");
  res.status(200).json({
    msje: "getMedicos",
    medicos,
  });
};

const createMedicos = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({ usuario: uid, ...req.body });

  try {
    const medicoDB = await medico.save();

    res.status(200).json({
      msje: "createMedico",
      medico: medicoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msje: "Error al crear el medico",
    });
  }
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
