const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next) => {
  const errores = validationResult(req);
  if (errores) {
    return res.status(400).json({
      msje: "Se detectaron errores",
      errors: errores.mapped(),
    });
  }

  next();
};

module.exports = { validarCampos };
