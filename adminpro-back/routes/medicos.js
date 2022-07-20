/*
Ruta: api/medicos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const {
  getMedicos,
  createMedicos,
  updateMedico,
  deleteMedico,
} = require("../controllers/medicos");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", getMedicos);

router.post("/", createMedicos);

router.put("/:id", updateMedico);

router.delete("/:id", deleteMedico);

module.exports = router;
