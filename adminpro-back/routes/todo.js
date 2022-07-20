/*
Ruta: api/todo:busqueda
*/
const { Router } = require("express");
const { busqueda } = require("../controllers/todo");

const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/:busqueda", validarJWT, busqueda);

module.exports = router;
