const Usuario = require("../models/usuario");
const { response } = require("express");
const { validationResult } = require("express-validator");

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email");

  res.json({
    msje: "usuarios",
    usuarios,
  });
};

const createUsuario = async (req, res = response) => {
  //console.log(req.body);
  const { email, password, nombre } = req.body;
  const errores = validationResult(req);
  if (errores) {
    return res.status(400).json({
      msje: "Se detectaron errores",
      errors: errores.mapped(),
    });
  }
  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        msje: "El correo ya esta registrado",
      });
    }

    const usuario = new Usuario(req.body);
    await usuario.save();

    res.json({
      msje: "Usuario creado",
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msje: "Error inesperado... revisar logs",
    });
  }
};

module.exports = { getUsuarios, createUsuario };
