/*
Ruta: api/hospitales
*/
const { Router } = require("express");
const { check } = require("express-validator");
const {
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitales");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", getHospitales);

router.post("/", createHospital);

router.put("/:id", updateHospital);

router.delete("/:id", deleteHospital);

module.exports = router;
