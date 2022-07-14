const Usuario = require("../models/usuario");

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email");

  res.json({
    msje: "usuarios",
    usuarios,
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
