const Usuario = require("../models/usuario");
const { response } = require("express");
const bcrypt = require("bcrypt");

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email");

  res.json({
    msje: "usuarios",
    usuarios,
    uid: req.uid,
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

    //Creando usuario en DB
    await usuario.save();

    //Generar Token JWT
    const token = await generarJWT(usuario._id);

    res.json({
      msje: "Usuario creado",
      usuario,
      token,
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

    //Separar password, google y email de campos y almacenar los valores por separado
    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      //El usuario esta cambiando su email
      //Verificar si el email que queremos ingresar no existe en la base de datos
      const existeEmail = await Usuario.findOne({ email: email });
      if (existeEmail) {
        return res.status(400).json({
          msje: "Ya existe un usuario con el email",
        });
      }
    }

    campos.email = email;
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

const borrarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        msje: "Usuario creado",
        msje: "No existe un usuario con la id proporcionada",
      });
    }

    await Usuario.findByIdAndDelete(uid);

    res.status(200).json({
      msje: "Usuario borrado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msje: "Error inesperado al borrar",
    });
  }
};

module.exports = {
  getUsuarios,
  createUsuario,
  actualizarUsuario,
  borrarUsuario,
};
