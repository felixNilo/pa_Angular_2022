const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar email
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        msje: "Email no encontrado",
      });
    }

    //Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        msje: "Contraseña no valida",
      });
    }

    //Generar Token JWT
    const token = await generarJWT(usuarioDB._id);

    res.status(200).json({
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msje: "Error en el auth login",
    });
  }
};

module.exports = {
  login,
};
