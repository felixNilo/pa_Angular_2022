const Usuario = require("../models/usuario");

const getUsuarios = (req, res) => {
  res.json({
    msje: "Primera respuesta",
  });
};

const createUsuario = async (req, res) => {
  //console.log(req.body);
  const { email, password, nombre } = req.body;

  const usuario = new Usuario(req.body);
  await usuario.save();

  res.json({
    msje: "Usuario creado",
    usuario,
  });
};

module.exports = { getUsuarios, createUsuario };
