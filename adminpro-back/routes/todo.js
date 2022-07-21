/*
Ruta: api/todo:busqueda
*/
const { Router } = require("express");
const { busqueda, busquedaColeccion } = require("../controllers/todo");

const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/:busqueda", validarJWT, busqueda);
router.get("/coleccion/:coleccion/:busqueda", validarJWT, busquedaColeccion);

module.exports = router;
