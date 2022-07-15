const Usuario = require("../models/usuario");
const { response } = require("express");
const bcrypt = require("bcrypt");

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

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        msje: "El correo ya esta registrado",
      });
    }

    const usuario = new Usuario(req.body);

    //Encriptando contrasena
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

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

const actualizarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        msje: "Usuario creado",
        msje: "No existe un usuario con la id proporcionada",
      });
    }

    const campos = req.body;

    if (usuarioDB.email === req.body.email) {
      //El usuario no esta cambiando su email, asi es que, para no sobreescribir el email, lo borramos
      delete campos.email;
    } else {
      //El usuario esta cambiando su email
      //Verificar si el email que queremos ingresar no existe en la base de datos
      const existeEmail = await Usuario.findOne({ email: req.body.email });
      if (existeEmail) {
        return res.status(400).json({
          msje: "Ya existe un usuario con el email",
        });
      }
    }

    delete campos.password;
    delete campos.google;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      msje: "Usuario actualizado",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msje: "Error inesperado",
    });
  }
};

module.exports = { getUsuarios, createUsuario, actualizarUsuario };
