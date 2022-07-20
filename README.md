# Programacion de aplicaciones 2022

## Dejemos lista la funcionalidad de crear hospital

Para crear un hospital, deberiamos tener un token de autenticacion, asi es que, agreguemos el middleware antes de entrar al controlador.
`router.post("/",[validarJWT], createHospital);`

Recuerden que el middleware `validarJWT` comparte el id del usuarios de manera que sea accesible en todo nuestro backend. Este id lo utilizaremos para crear el hospital.

Validamos que exista el nombre del hospital.

```
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
    validarCampos,
  ],
  createHospital
);
```

### Vamos al controlador de hospitales

Importemos el modelo de hospitales ya que lo vamos a utilizar para guardar el hospital.
`const Hospital = require("../models/hospitales")`

Para darle mas seguridad de nuestro backend, en el modelo de hospitales, podriamos agregar el atributo de requerido al usuario: `required: true,`

Ahora, creemos el codigo para guardar el hospital. Recordar que esto tomara tiempo y pueden generarse errores, asi es que, debemos declara el metodo como asincrono, y crear dentro del metodo un bloque try/catch.

```
const createHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital(req.body);
  try {
    //Aqui guardamos el hospital
    res.status(200).json({
      uid: uid,
      msje: "createHospital",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msje: "Error al crear el hospital",
    });
  }
};
```

Hasta aqui, al llamar al controlador con postman, entregandole un token de autenticacion valido, deberiamos ver el id del usuario que se ha autenticado y un mensaje. Con esto, solo queda guardar el hospital, pero antes, debemos configurar el id del usuario en el modelo. Luego de eso, podremos guardar el hospital.

```
const hospital = new Hospital({usuario:uid, ...req.body});
try {
    const hospitalDB = await hospital.save();

    res.status(200).json({
      msje: "createHospital",
      hospital: hospitalDB,
    });
  }
```

Con esto, ya deberiamos poder crear hospitales.
Verifique que lo que hemos hecho funciona correctamente.
