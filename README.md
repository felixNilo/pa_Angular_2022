# Programacion de aplicaciones 2022

## Crearemos la funcionalidad de buscar en alguna coleccion especifica

Al igual que al caso anterior, los parametros de busqueda vendran en la url, en este caso, la coleccion y lo que queremos buscar en la coleccion. Configuremos nuestra url como sigue: `/api/todo/collecion/<coleccion_donde_buscar>/<string_a_buscar>`

Entonces, creemos la ruta en nuestro enrutador de busqueda:

```
router.get("/coleccion/:coleccion/:busqueda", validarJWT, busquedaColeccion);
```

Y nuestro controlador que responda cierto mensaje por http.

```
const busquedaColeccion = async (req, res = response) => {
  res.status(200).json({
    msje: "busqueda en coleccions",
  });
};
```

Solo queda tomar los parametros y realizar las busquedas con mongoose. Debemos buscar en alguna coleccion en especifico de nuestra BD, asi es que, para filtrar que coleccion es la que estamos recibiendo, aplicaremos un bloque switch para filtrar por coleccion.

```
const busquedaColeccion = async (req, res = response) => {
  const coleccion = req.params.coleccion;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  let data = [];

  switch (coleccion) {
    case "medicos":
      data = await Medico.find({ nombre: regex });
      break;

    case "hospitales":
      data = await Hospital.find({ nombre: regex });
      break;

    case "usuarios":
      data = await Usuario.find({ nombre: regex });
      break;

    default:
      return res.status(400).json({
        msje: "La coleccion no se ha encontrado",
      });
  }

  res.status(200).json({
    msje: "busqueda en coleccions",
    data,
  });
};
```
