# Programacion de aplicaciones 2022

## Dejemos lista la funcionalidad de crear medicos

Para crear un medico, al igual que el hospital, deberiamos tener un token de autenticacion, asi es que, agreguemos el middleware antes de entrar al controlador.
`router.post("/",[validarJWT], createMedico);`

Ya sabemos que el middleware `validarJWT` comparte el id del usuario. Este id lo utilizaremos para crear el medico.

Validamos que exista el nombre del medico. Ademas, en nuestro body, deberia ir incluido el id del hospital al que pertenece el medico, asi es que tambien deberiamos agregarlo como una validacion.

```
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
    check("hospital", "El id del hospital es necesario").not().isEmpty(),
    validarCampos,
  ],
  createMedicos
);

```

### Vamos al controlador de medicos

Importemos el modelo de medicos ya que lo vamos a utilizar para guardar el hospital.
`const Hospital = require("../models/medicos")`

Para darle mas seguridad a nuestro backend, en el modelo de medicos, podriamos agregar el atributo de requerido al usuario y al hospital: `required: true,`

Ahora, creemos el codigo para guardar el medico. Recordar que esto tomara tiempo y pueden generarse errores, asi es que, debemos declara el metodo como asincrono, y crear dentro del metodo un bloque try/catch.

```
const createMedicos = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({ usuario: uid, ...req.body });

  try {
    const medicoDB = await Medico.save();

    res.status(200).json({
      msje: "createMedico",
      medico: medicoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msje: "Error al crear el medico",
    });
  }
};
```

Con esto, ya deberiamos poder crear medicos.
Verifique que lo que hemos hecho funciona correctamente.

### Id hospital testing

Actualmente estamos verificando que la id del hospital se envie en el body, aunque, id puede no ser una id valida de mongo. De hecho, si se intenta enviar una id que no corresponde, el sistema se caera.  
Para ello, utilizaremos un nuevo validador de check que justamente valida si lo que estamos leyendo es una id de mongo: `check("hospital", "El id del hospital es necesario").isMongoId(),`

Actualizando esta linea de codigo, nuestro sistema se mantendra vivo!
