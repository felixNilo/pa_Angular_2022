const { response } = require("express");

const Usuario = require("../models/usuario");
const Hospital = require("../models/hospitales");
const Medico = require("../models/medicos");

const busqueda = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  /* const usuarios = await Usuario.find({ nombre: regex });
  const hospitales = await Hospital.find({ nombre: regex });
  const medicos = await Medico.find({ nombre: regex }); */

  const [usuarios, hospitales, medicos] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
  ]);

  res.status(200).json({
    msje: "busqueda",
    usuarios,
    hospitales,
    medicos,
  });
};

module.exports = {
  busqueda,
};
