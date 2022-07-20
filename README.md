# Programacion de aplicaciones 2022

## Pasaremos a trabajar con hospitales y medicos en nuestra BD

### Partamos con los hospitales

Ya hemos trabajado con los modelos de usuarios, asi es que ahora crearemos el modelo de hospital.
El hospital tendra un nombre, una imagen y el usuario que creo el hospital.

```
const { Schema, model } = require("mongoose");

const HospitalesSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

module.exports = model("Hospital", HospitalesSchema);
```

Si nos fijamos, la llave usuario del modelo hospital es de tipo ObjectId y es que, usuario guardara el id del usuario que creara el hospital.  
Tal cual como esta nuestro modelo, al crearse un documento en la BD de hospital, se guardara dentro de una coleccion llamada hospitals. Para evitar esto, y forzar que la coleccion se llame hospitales agregaremos lo siguiente a la creacion del modelo:

```
const HospitalesSchema = Schema({
  ...
}, {collection: "hospitales"});
```

### Configuremos la ruta para acceder a los controladores de hospitales

Primero, en nuestro index.js declaremos la ruta que hara uso del archivo de rutas (que aun no creamos) que enrutara a lo controladores de hospitales.
De esta forma, en index agregamos `app.use("/api/hospitales", require("./routes/hospitales"));` y creamos el archivo de rutas de hospitales.
Dentro del archivo de rutas de hospitales, queremos configurar rutas para crear los hospitales, obtenerlos, actualizarlos y borrarlos.

```
/*
Ruta: api/hospitales
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/");

router.post("/");

router.put("/:id");

router.delete("/:id");

module.exports = router;

```

### Controlador de hospitales

Primero, creemos el archivo hospitales.js dentro de la carpeta controllers.
Sabemos que para el get, deberiamos tener un controlador que devuelva los hospitales, para el post, un controlador que cree el hospital, para el put, un controlador que actualice un hospital, y para el delete un controlador que borre un hospital.

```
const { response } = require("express");

const getHospitales = (req, res = response) => {
  res.status(200).json({
    msje: "getHospitales",
  });
};

const createHospital = (req, res = response) => {
  res.status(200).json({
    msje: "createHospital",
  });
};

const updateHospital = (req, res = response) => {
  res.status(200).json({
    msje: "updateHospital",
  });
};

const deleteHospital = (req, res = response) => {
  res.status(200).json({
    msje: "deleteHospital",
  });
};

module.exports = {
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospital,
};
```

Con esto, ya podemos llamar a nuestros controladores desde nuestro archivo de rutas de hospitales.

```
router.get("/", getHospitales);

router.post("/", createHospital);

router.put("/:id", updateHospital);

router.delete("/:id", deleteHospital);
```

### Realicemos lo mismo pero esta vez con los medicos

La unica diferencia que tiene un medico con hospital es que un medico tendra asociado un hospital. De esta forma, el modelo queda:

```
const { Schema, model } = require("mongoose");

const MedicoSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
    hospita: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
  },
  { collection: "medicos" }
);

module.exports = model("Medico", MedicoSchema);

```

### Repeat to learn

Cree el archivo de rutas para medicos y controladores para medicos. Luego pruebe que todo este respondiendo okey con postman.
